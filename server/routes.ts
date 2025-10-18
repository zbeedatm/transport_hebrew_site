import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnnouncementSchema, insertRouteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all announcements
  app.get("/api/announcements", async (_req, res) => {
    try {
      const announcements = await storage.getAnnouncements();
      res.json(announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      res.status(500).json({ error: "Failed to fetch announcements" });
    }
  });

  // Create announcement
  app.post("/api/announcements", async (req, res) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(validatedData);
      res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error creating announcement:", error);
        res.status(500).json({ error: "Failed to create announcement" });
      }
    }
  });

  // Search routes
  app.get("/api/routes/search", async (req, res) => {
    try {
      const { origin, destination, lineNumber } = req.query;

      const searchParams: {
        origin?: string;
        destination?: string;
        lineNumber?: number;
      } = {};

      if (origin && typeof origin === "string") {
        searchParams.origin = origin;
      }
      if (destination && typeof destination === "string") {
        searchParams.destination = destination;
      }
      if (lineNumber) {
        const num = parseInt(lineNumber as string, 10);
        if (!isNaN(num)) {
          searchParams.lineNumber = num;
        }
      }

      const routes = await storage.searchRoutes(searchParams);
      res.json(routes);
    } catch (error) {
      console.error("Error searching routes:", error);
      res.status(500).json({ error: "Failed to search routes" });
    }
  });

  // Get route by line number
  app.get("/api/routes/line/:lineNumber", async (req, res) => {
    try {
      const lineNumber = parseInt(req.params.lineNumber, 10);
      if (isNaN(lineNumber)) {
        return res.status(400).json({ error: "Invalid line number" });
      }

      const route = await storage.getRouteByLine(lineNumber);
      if (!route) {
        return res.status(404).json({ error: "Route not found" });
      }

      res.json(route);
    } catch (error) {
      console.error("Error fetching route:", error);
      res.status(500).json({ error: "Failed to fetch route" });
    }
  });

  // Create route
  app.post("/api/routes", async (req, res) => {
    try {
      const validatedData = insertRouteSchema.parse(req.body);
      const route = await storage.createRoute(validatedData);
      res.status(201).json(route);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error creating route:", error);
        res.status(500).json({ error: "Failed to create route" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
