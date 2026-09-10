import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../database/db";

export interface Dog extends RowDataPacket {
  id: number;
  name: string;
  image_url: string | null;
  details: string | null;
  price: number;
  currency_code: string;
  is_active: number;
  created_at: Date;
  updated_at: Date | null;
}

export interface CreateDogData {
  name: string;
  imageUrl?: string;
  details?: string;
  price: number;
  currencyCode?: string;
}

export interface UpdateDogData {
  name?: string;
  imageUrl?: string;
  details?: string;
  price?: number;
  currencyCode?: string;
  isActive?: boolean;
}

export async function findAll(): Promise<Dog[]> {
  const [rows] = await pool.query<Dog[]>(`
    SELECT *
    FROM dogs
    WHERE is_active = 1
    ORDER BY id DESC
  `);

  return rows;
}

export async function findById(id: number): Promise<Dog | null> {
  const [rows] = await pool.execute<Dog[]>(
    `SELECT *
     FROM dogs
     WHERE id = ? AND is_active = 1`,
    [id]
  );

  return rows[0] || null;
}

export async function create(data: CreateDogData): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO dogs
      (name, image_url, details, price, currency_code)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.name,
      data.imageUrl ?? null,
      data.details ?? null,
      data.price,
      data.currencyCode ?? "TZS"
    ]
  );

  return result.insertId;
}

export async function update(
  id: number,
  data: UpdateDogData
): Promise<boolean> {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    values.push(data.name);
  }

  if (data.imageUrl !== undefined) {
    fields.push("image_url = ?");
    values.push(data.imageUrl);
  }

  if (data.details !== undefined) {
    fields.push("details = ?");
    values.push(data.details);
  }

  if (data.price !== undefined) {
    fields.push("price = ?");
    values.push(data.price);
  }

  if (data.currencyCode !== undefined) {
    fields.push("currency_code = ?");
    values.push(data.currencyCode);
  }

  if (data.isActive !== undefined) {
    fields.push("is_active = ?");
    values.push(data.isActive ? 1 : 0);
  }

  if (fields.length === 0) {
    return false;
  }

  values.push(id);

  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE dogs
     SET ${fields.join(", ")}
     WHERE id = ?`,
    values
  );

  return result.affectedRows > 0;
}

export async function remove(id: number): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE dogs
     SET is_active = 0
     WHERE id = ?`,
    [id]
  );

  return result.affectedRows > 0;
}
