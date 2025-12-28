import pool from './db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
}

interface UserRow extends RowDataPacket, User {}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.execute<UserRow[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0] || null;
}

export async function createUser(
  email: string,
  password: string,
  name?: string
): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const [result] = await pool.execute(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, hashedPassword, name || null]
  );
  
  const insertResult = result as { insertId: number };
  
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Failed to create user');
  }
  
  return user;
}

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}
