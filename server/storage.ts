import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  classes, type Class, type InsertClass
} from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private classes: Map<number, Class>;
  private userId: number;
  private submissionId: number;
  private classId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.classes = new Map();
    this.userId = 1;
    this.submissionId = 1;
    this.classId = 1;
    
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
      category: "Technology",
      location: "Tech Hub, University District",
      date: "Oct 15, 2023",
      time: "9:00 AM - 4:00 PM",
      seats: 12,
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
    });
    
    // Acrylic Painting for Beginners
    this.addClass({
      title: "Acrylic Painting for Beginners",
      description: "Explore basic acrylic painting techniques and complete your own canvas artwork.",
      price: 45,
      category: "Art & Design",
      location: "Creative Commons Studio",
      date: "Oct 20, 2023",
      time: "6:00 PM - 9:00 PM",
      seats: 3,
      imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b"
    });
    
    // Yoga for Stress Relief
    this.addClass({
      title: "Yoga for Stress Relief",
      description: "A gentle yoga class focused on techniques to release tension and manage stress.",
      price: 20,
      category: "Fitness",
      location: "Mindful Studio, Downtown",
      date: "Oct 18, 2023",
      time: "5:30 PM - 6:45 PM",
      seats: 2,
      imageUrl: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0"
    });
  }
  
  private addClass(classData: InsertClass): void {
    const id = this.classId++;
    const classItem: Class = { ...classData, id };
    this.classes.set(id, classItem);
  }
}

export const storage = new MemStorage();
