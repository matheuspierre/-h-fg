import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/piada", (req, res) => {
    const piada = storage.getRandomPiada();
    res.json(piada);
  });

  const httpServer = createServer(app);

  return httpServer;
}
