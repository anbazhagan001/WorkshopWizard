import { describe, it, expect } from 'vitest';
import { storage } from '../server/storage';

// Simple API tests for CI/CD pipeline
describe('API Tests', () => {
  // Test for featured classes API
  it('should return featured classes', async () => {
    const featuredClasses = await storage.getFeaturedClasses();
    expect(featuredClasses).toBeDefined();
    expect(Array.isArray(featuredClasses)).toBe(true);
    expect(featuredClasses.length).toBeGreaterThan(0);
  });

  // Test for getting all classes
  it('should return all classes', async () => {
    const allClasses = await storage.getClasses();
    expect(allClasses).toBeDefined();
    expect(Array.isArray(allClasses)).toBe(true);
    expect(allClasses.length).toBeGreaterThan(0);
  });

  // Test for getting classes by category
  it('should return classes by category', async () => {
    const category = 'Technology'; // Assuming this category exists
    const classesByCategory = await storage.getClassesByCategory(category);
    expect(classesByCategory).toBeDefined();
    expect(Array.isArray(classesByCategory)).toBe(true);
  });
});