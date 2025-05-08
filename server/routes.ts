import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint for CI/CD monitoring
  app.get('/health', async (_req: Request, res: Response) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || 'unknown'
    });
  });

  // API routes
  const apiRouter = app.route('/api');
  
  // Get featured classes
  app.get('/api/classes/featured', async (_req: Request, res: Response) => {
    try {
      const classes = await storage.getFeaturedClasses();
      res.json(classes);
    } catch (error) {
      console.error('Error fetching featured classes:', error);
      res.status(500).json({ message: 'Failed to fetch featured classes' });
    }
  });
  
  // Get all classes
  app.get('/api/classes', async (_req: Request, res: Response) => {
    try {
      const classes = await storage.getClasses();
      res.json(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ message: 'Failed to fetch classes' });
    }
  });
  
  // Get classes by category
  app.get('/api/classes/category/:category', async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const classes = await storage.getClassesByCategory(category);
      res.json(classes);
    } catch (error) {
      console.error('Error fetching classes by category:', error);
      res.status(500).json({ message: 'Failed to fetch classes by category' });
    }
  });
  
  // Get class by ID
  app.get('/api/classes/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid class ID' });
      }
      
      const classItem = await storage.getClassById(id);
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
      
      res.json(classItem);
    } catch (error) {
      console.error('Error fetching class by ID:', error);
      res.status(500).json({ message: 'Failed to fetch class' });
    }
  });
  
  // Submit contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const validationResult = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const submission = await storage.createContactSubmission(validationResult.data);
      res.status(201).json({ 
        message: 'Contact form submitted successfully',
        submission 
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ message: 'Failed to submit contact form' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
