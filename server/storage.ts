import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  classes, type Class, type InsertClass
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Classes operations
  getClasses(): Promise<Class[]>;
  getClassById(id: number): Promise<Class | undefined>;
  getFeaturedClasses(limit?: number): Promise<Class[]>;
  getClassesByCategory(category: string): Promise<Class[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private classes: Map<number, Class>;
  private userId: number;
  private submissionId: number;
  private classId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.classes = new Map();
    this.userId = 1;
    this.submissionId = 1;
    this.classId = 1;
    
    // Initialize the session store
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Initialize with some sample classes
    this.initializeClasses();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.submissionId++;
    const now = new Date();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: now 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  // Classes operations
  async getClasses(): Promise<Class[]> {
    return Array.from(this.classes.values());
  }
  
  async getClassById(id: number): Promise<Class | undefined> {
    return this.classes.get(id);
  }
  
  async getFeaturedClasses(limit: number = 6): Promise<Class[]> {
    const allClasses = Array.from(this.classes.values());
    return allClasses.slice(0, limit);
  }
  
  async getClassesByCategory(category: string): Promise<Class[]> {
    return Array.from(this.classes.values()).filter(
      (classItem) => classItem.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  private initializeClasses() {
    // Web Development Bootcamp
    this.addClass({
      title: "Web Development Bootcamp",
      description: "Learn HTML, CSS, and JavaScript fundamentals in this intensive workshop for beginners.",
      price: 75,
      category: "tech",
      location: "Tech Hub, University District",
      date: "Oct 15, 2023",
      time: "9:00 AM - 4:00 PM",
      seats: 12,
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
      format: "in-person",
      startDate: new Date("2023-10-15T09:00:00Z"),
      rating: 5
    });
    
    // Acrylic Painting for Beginners
    this.addClass({
      title: "Acrylic Painting for Beginners",
      description: "Explore basic acrylic painting techniques and complete your own canvas artwork.",
      price: 45,
      category: "art",
      location: "Creative Commons Studio",
      date: "Oct 20, 2023",
      time: "6:00 PM - 9:00 PM",
      seats: 3,
      imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b",
      format: "in-person",
      startDate: new Date("2023-10-20T18:00:00Z"),
      rating: 4
    });
    
    // Yoga for Stress Relief
    this.addClass({
      title: "Yoga for Stress Relief",
      description: "A gentle yoga class focused on techniques to release tension and manage stress.",
      price: 20,
      category: "fitness",
      location: "Mindful Studio, Downtown",
      date: "Oct 18, 2023",
      time: "5:30 PM - 6:45 PM",
      seats: 2,
      imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0",
      format: "in-person",
      startDate: new Date("2023-10-18T17:30:00Z"),
      rating: 5
    });
    
    // Introduction to Digital Marketing
    this.addClass({
      title: "Introduction to Digital Marketing",
      description: "Learn the fundamentals of digital marketing including SEO, social media, and content strategy.",
      price: 60,
      category: "business",
      location: "Online",
      date: "Oct 25, 2023",
      time: "6:00 PM - 8:00 PM",
      seats: 15,
      imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec",
      format: "online",
      startDate: new Date("2023-10-25T18:00:00Z"),
      rating: 4
    });
    
    // Italian Cooking Basics
    this.addClass({
      title: "Italian Cooking Basics",
      description: "Learn to prepare authentic Italian pasta, sauces, and appetizers in this hands-on cooking class.",
      price: 55,
      category: "cooking",
      location: "Culinary Institute, West Campus",
      date: "Oct 22, 2023",
      time: "2:00 PM - 5:00 PM",
      seats: 8,
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      format: "in-person",
      startDate: new Date("2023-10-22T14:00:00Z"),
      rating: 5
    });
    
    // Beginner's Spanish
    this.addClass({
      title: "Beginner's Spanish",
      description: "An introduction to Spanish language for absolute beginners, focusing on conversation skills.",
      price: 40,
      category: "language",
      location: "Online",
      date: "Oct 30, 2023",
      time: "7:00 PM - 8:30 PM",
      seats: 10,
      imageUrl: "https://images.unsplash.com/photo-1513363884914-2ff10bf7d9f8",
      format: "online",
      startDate: new Date("2023-10-30T19:00:00Z"),
      rating: 4
    });
    
    // Guitar for Beginners
    this.addClass({
      title: "Guitar for Beginners",
      description: "Learn basic guitar chords and techniques to play your favorite songs.",
      price: 35,
      category: "music",
      location: "Sound Studio, Downtown",
      date: "Nov 5, 2023",
      time: "1:00 PM - 3:00 PM",
      seats: 5,
      imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
      format: "in-person",
      startDate: new Date("2023-11-05T13:00:00Z"),
      rating: 5
    });
  }
  
  private addClass(classData: InsertClass): void {
    const id = this.classId++;
    
    // Ensure all required fields have values
    const defaultedData = {
      ...classData,
      format: classData.format || 'in-person',
      rating: classData.rating !== undefined ? classData.rating : 5,
      startDate: classData.startDate || new Date()
    };
    
    const classItem: Class = { ...defaultedData, id };
    this.classes.set(id, classItem);
  }
}

export const storage = new MemStorage();
