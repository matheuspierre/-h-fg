import { db } from "./db";
import { events } from "@shared/schema";

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

async function seed() {
  console.log("🌱 Seeding database with sample events...");
  
  try {
    // Check if events already exist
    const existingEvents = await db.select().from(events);
    
    if (existingEvents.length > 0) {
      console.log(`✅ Database already has ${existingEvents.length} events. Skipping seed.`);
      return;
    }

    // Insert sample events
    const result = await db.insert(events).values(sampleEvents).returning();
    
    console.log(`✅ Successfully inserted ${result.length} sample events!`);
    console.log("Events:");
    result.forEach((event, i) => {
      console.log(`  ${i + 1}. ${event.title}`);
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("✨ Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  });
