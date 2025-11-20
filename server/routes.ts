import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { events } from "@shared/schema";
import { 
  generateToken, 
  hashPassword, 
  comparePassword, 
  requireAuth, 
  type AuthRequest 
} from "./auth";
import { insertUserSchema, insertEventSchema, insertRegistrationSchema } from "@shared/schema";

// Seed database with sample events if empty
async function seedDatabase() {
  try {
    const existingEvents = await db.select().from(events);
    
    if (existingEvents.length === 0) {
      console.log("📝 No events found. Seeding database with sample events...");
      
      const sampleEvents = [
        {
          title: "Workshop: Desenvolvimento Web Moderno",
          description: "Aprenda as melhores práticas de desenvolvimento com React, TypeScript e Next.js",
          date: new Date("2025-01-15T14:00:00"),
          location: "Lisboa Tech Hub",
          category: "Workshop",
          image: "/attached_assets/generated_images/workshop_web_moderno.png",
          availableSpots: 25,
        },
        {
          title: "Conferência: O Futuro da IA",
          description: "Descubra as últimas tendências em Inteligência Artificial e Machine Learning",
          date: new Date("2025-01-20T09:00:00"),
          location: "Centro de Congressos Porto",
          category: "Conferência",
          image: "/attached_assets/generated_images/conference_keynote_thumbnail.png",
          availableSpots: 150,
        },
        {
          title: "Networking Tech Professionals",
          description: "Conecte-se com profissionais de tecnologia e expanda sua rede de contactos",
          date: new Date("2025-01-18T18:30:00"),
          location: "Coimbra Innovation Center",
          category: "Networking",
          image: "/attached_assets/generated_images/networking_event_thumbnail.png",
          availableSpots: 50,
        },
        {
          title: "Workshop Intensivo: Python Avançado",
          description: "Domine conceitos avançados de Python para ciência de dados e automação",
          date: new Date("2025-01-22T10:00:00"),
          location: "Braga Tech Park",
          category: "Workshop",
          image: "/attached_assets/generated_images/coding_workshop_thumbnail.png",
          availableSpots: 30,
        },
        {
          title: "Summit: Cloud Computing e DevOps",
          description: "Explore as melhores práticas de infraestrutura moderna e deployment contínuo",
          date: new Date("2025-01-25T09:00:00"),
          location: "Faro Convention Center",
          category: "Conferência",
          image: "/attached_assets/generated_images/conference_keynote_thumbnail.png",
          availableSpots: 200,
        },
        {
          title: "Meetup: Startups e Empreendedorismo Tech",
          description: "Networking informal com fundadores e investidores do ecossistema tech",
          date: new Date("2025-01-28T19:00:00"),
          location: "Aveiro Startup Hub",
          category: "Networking",
          image: "/attached_assets/generated_images/networking_event_thumbnail.png",
          availableSpots: 40,
        },
      ];
      
      await db.insert(events).values(sampleEvents);
      console.log("✅ Successfully seeded database with sample events!");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed database synchronously before registering routes
  // This ensures events are available before serving any requests
  await seedDatabase();
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Nome de utilizador já existe" });
      }

      const hashedPassword = await hashPassword(password);
      const user = await storage.createUser({ username, password: hashedPassword });

      const token = generateToken(user.id);
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ 
        user: { id: user.id, username: user.username },
        message: "Conta criada com sucesso" 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao criar conta" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = insertUserSchema.parse(req.body);

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      const token = generateToken(user.id);
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ 
        user: { id: user.id, username: user.username },
        message: "Login bem-sucedido" 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao fazer login" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("auth_token");
    res.json({ message: "Logout bem-sucedido" });
  });

  app.get("/api/auth/me", requireAuth, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "Utilizador não encontrado" });
      }
      res.json({ id: user.id, username: user.username });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao obter utilizador" });
    }
  });

  // Event routes (protected)
  app.get("/api/events", requireAuth, async (req: AuthRequest, res) => {
    try {
      const events = await storage.getAllEvents();
      
      // Check which events the user is registered for
      const eventsWithRegistration = await Promise.all(
        events.map(async (event) => {
          const isRegistered = await storage.isUserRegistered(req.userId!, event.id);
          return { ...event, isRegistered };
        })
      );
      
      res.json(eventsWithRegistration);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao obter eventos" });
    }
  });

  app.get("/api/events/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      
      const isRegistered = await storage.isUserRegistered(req.userId!, event.id);
      res.json({ ...event, isRegistered });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao obter evento" });
    }
  });

  // Registration routes (protected)
  app.post("/api/registrations", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { eventId } = insertRegistrationSchema.parse({
        userId: req.userId,
        eventId: req.body.eventId,
      });

      const event = await storage.getEvent(eventId);
      if (!event) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }

      const isAlreadyRegistered = await storage.isUserRegistered(req.userId!, eventId);
      if (isAlreadyRegistered) {
        return res.status(400).json({ message: "Já está inscrito neste evento" });
      }

      const registration = await storage.createRegistration({
        userId: req.userId!,
        eventId,
      });

      res.json({ 
        registration,
        message: "Inscrição realizada com sucesso" 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Erro ao criar inscrição" });
    }
  });

  app.delete("/api/registrations/:eventId", requireAuth, async (req: AuthRequest, res) => {
    try {
      const deleted = await storage.deleteRegistration(req.userId!, req.params.eventId);
      if (!deleted) {
        return res.status(404).json({ message: "Inscrição não encontrada" });
      }
      res.json({ message: "Inscrição cancelada com sucesso" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao cancelar inscrição" });
    }
  });

  app.get("/api/registrations/my", requireAuth, async (req: AuthRequest, res) => {
    try {
      const registrations = await storage.getUserRegistrations(req.userId!);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao obter inscrições" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
