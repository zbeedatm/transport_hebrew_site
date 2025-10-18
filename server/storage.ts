import {
  type Announcement,
  type InsertAnnouncement,
  type Route,
  type InsertRoute,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;

  // Routes
  searchRoutes(params: {
    origin?: string;
    destination?: string;
    lineNumber?: number;
  }): Promise<Route[]>;
  getRouteByLine(lineNumber: number): Promise<Route | undefined>;
  createRoute(route: InsertRoute): Promise<Route>;
}

export class MemStorage implements IStorage {
  private announcements: Map<string, Announcement>;
  private routes: Map<string, Route>;

  constructor() {
    this.announcements = new Map();
    this.routes = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed announcements with Hebrew content
    const announcementsData: InsertAnnouncement[] = [
      {
        title: "לוח זמנים",
        content:
          "עבודות תשתית ברחוב גלעד יום ב' 20.10.2025 מהכיכר עד הכניסה לשכונה",
        icon: "schedule",
      },
      {
        title: "לוח זמנים",
        content: "עבודות תשתית ברחוב מעלה יצחק תיחסם התנועה לכיוון מזרח",
        icon: "schedule",
      },
      {
        title: "הודעה חשובה",
        content: "שינויים בלוחות הזמנים של קווים 5 ו-12 החל מיום ראשון",
        icon: "alert",
      },
    ];

    announcementsData.forEach((announcement) => {
      const id = randomUUID();
      const fullAnnouncement: Announcement = {
        id,
        ...announcement,
        timestamp: new Date(),
      };
      this.announcements.set(id, fullAnnouncement);
    });

    // Seed routes with Hebrew locations
    const routesData: InsertRoute[] = [
      {
        lineNumber: 1,
        origin: "נצרת עילית",
        destination: "נצרת תחתית",
        schedule: "כל 15 דקות",
      },
      {
        lineNumber: 3,
        origin: "שכונת דהר אל-אסד",
        destination: "מרכז העיר",
        schedule: "כל 20 דקות",
      },
      {
        lineNumber: 5,
        origin: "נוף הגליל",
        destination: "נצרת",
        schedule: "כל 30 דקות",
      },
      {
        lineNumber: 12,
        origin: "עין מאהל",
        destination: "נצרת",
        schedule: "כל 25 דקות",
      },
      {
        lineNumber: 16,
        origin: "יפיע",
        destination: "נצרת",
        schedule: "כל 40 דקות",
      },
      {
        lineNumber: 34,
        origin: "כפר כנא",
        destination: "נצרת",
        schedule: "כל 35 דקות",
      },
      {
        lineNumber: 36,
        origin: "ראיינה",
        destination: "נצרת",
        schedule: "כל 45 דקות",
      },
      {
        lineNumber: 39,
        origin: "טורעאן",
        destination: "נצרת",
        schedule: "כל 50 דקות",
      },
      {
        lineNumber: 57,
        origin: "מגד אל-כרום",
        destination: "נצרת",
        schedule: "כל שעה",
      },
      {
        lineNumber: 68,
        origin: "שפרעם",
        destination: "נצרת",
        schedule: "כל 30 דקות",
      },
    ];

    routesData.forEach((route) => {
      const id = randomUUID();
      const fullRoute: Route = {
        id,
        ...route,
      };
      this.routes.set(id, fullRoute);
    });
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async createAnnouncement(
    insertAnnouncement: InsertAnnouncement
  ): Promise<Announcement> {
    const id = randomUUID();
    const announcement: Announcement = {
      ...insertAnnouncement,
      id,
      timestamp: new Date(),
    };
    this.announcements.set(id, announcement);
    return announcement;
  }

  async searchRoutes(params: {
    origin?: string;
    destination?: string;
    lineNumber?: number;
  }): Promise<Route[]> {
    let routes = Array.from(this.routes.values());

    if (params.lineNumber !== undefined) {
      routes = routes.filter((r) => r.lineNumber === params.lineNumber);
    }

    if (params.origin) {
      const searchOrigin = params.origin.toLowerCase();
      routes = routes.filter((r) =>
        r.origin.toLowerCase().includes(searchOrigin)
      );
    }

    if (params.destination) {
      const searchDest = params.destination.toLowerCase();
      routes = routes.filter((r) =>
        r.destination.toLowerCase().includes(searchDest)
      );
    }

    return routes;
  }

  async getRouteByLine(lineNumber: number): Promise<Route | undefined> {
    return Array.from(this.routes.values()).find(
      (r) => r.lineNumber === lineNumber
    );
  }

  async createRoute(insertRoute: InsertRoute): Promise<Route> {
    const id = randomUUID();
    const route: Route = { ...insertRoute, id };
    this.routes.set(id, route);
    return route;
  }
}

export const storage = new MemStorage();
