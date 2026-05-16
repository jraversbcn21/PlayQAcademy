/**
 * In-memory store for the PlayQ Playground REST API.
 * Resets on server restart (intended behaviour for a sandbox).
 */

export interface PlaygroundUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface PlaygroundProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

let nextUserId = 4;
let nextProductId = 7;

export const USERS: PlaygroundUser[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "QA Engineer", createdAt: "2024-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Automation Lead", createdAt: "2024-03-22" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Manual Tester", createdAt: "2024-06-10" },
];

export const PRODUCTS: PlaygroundProduct[] = [
  { id: 1, name: "Test Automation Guide", price: 29.99, category: "Books", inStock: true },
  { id: 2, name: "CI/CD Pipeline Tool", price: 49.99, category: "Software", inStock: true },
  { id: 3, name: "Debugging Headphones", price: 79.99, category: "Hardware", inStock: false },
  { id: 4, name: "QA Best Practices eBook", price: 14.99, category: "Books", inStock: true },
  { id: 5, name: "Playwright Poster", price: 9.99, category: "Merch", inStock: true },
  { id: 6, name: "Test Data Generator", price: 39.99, category: "Software", inStock: true },
];

export function getNextUserId(): number {
  return nextUserId++;
}

export function getNextProductId(): number {
  return nextProductId++;
}
