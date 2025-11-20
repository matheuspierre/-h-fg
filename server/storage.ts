import { eq, and } from "drizzle-orm";
import { db } from "./db";
import { 
  users, 
  events, 
  registrations,
  type User, 
  type InsertUser,
  type Event,
  type InsertEvent,
  type Registration,
  type InsertRegistration
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Event methods
  getAllEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<boolean>;

  // Registration methods
  getUserRegistrations(userId: string): Promise<Array<Event & { registrationId: string }>>;
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  deleteRegistration(userId: string, eventId: string): Promise<boolean>;
  isUserRegistered(userId: string, eventId: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return db.select().from(events);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(event).returning();
    return result[0];
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const result = await db.update(events).set(event).where(eq(events.id, id)).returning();
    return result[0];
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }

  // Registration methods
  async getUserRegistrations(userId: string): Promise<Array<Event & { registrationId: string }>> {
    const result = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        date: events.date,
        location: events.location,
        category: events.category,
        image: events.image,
        availableSpots: events.availableSpots,
        registrationId: registrations.id,
      })
      .from(registrations)
      .innerJoin(events, eq(registrations.eventId, events.id))
      .where(eq(registrations.userId, userId));
    
    return result;
  }

  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const result = await db.insert(registrations).values(registration).returning();
    return result[0];
  }

  async deleteRegistration(userId: string, eventId: string): Promise<boolean> {
    const result = await db
      .delete(registrations)
      .where(and(eq(registrations.userId, userId), eq(registrations.eventId, eventId)))
      .returning();
    return result.length > 0;
  }

  async isUserRegistered(userId: string, eventId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(registrations)
      .where(and(eq(registrations.userId, userId), eq(registrations.eventId, eventId)))
      .limit(1);
    return result.length > 0;
  }
}

export const storage = new DbStorage();
