
import { type User, type InsertUser } from "@shared/schema";
import Airtable from "airtable";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class AirtableStorage implements IStorage {
  private base: any;
  private table: any;

  constructor() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
      throw new Error("AIRTABLE_API_KEY e AIRTABLE_BASE_ID devem estar configurados nos Secrets");
    }

    Airtable.configure({
      apiKey: apiKey,
    });

    this.base = Airtable.base(baseId);
    this.table = this.base('Users'); // Nome da tabela no Airtable
  }

  async getUser(id: string): Promise<User | undefined> {
    try {
      const record = await this.table.find(id);
      return {
        id: record.id,
        username: record.fields.username,
        password: record.fields.password,
      };
    } catch (error) {
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const records = await this.table
        .select({
          filterByFormula: `{username} = '${username}'`,
          maxRecords: 1,
        })
        .firstPage();

      if (records.length === 0) {
        return undefined;
      }

      const record = records[0];
      return {
        id: record.id,
        username: record.fields.username,
        password: record.fields.password,
      };
    } catch (error) {
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const record = await this.table.create({
      username: insertUser.username,
      password: insertUser.password,
    });

    return {
      id: record.id,
      username: record.fields.username,
      password: record.fields.password,
    };
  }
}

export const storage = new AirtableStorage();
