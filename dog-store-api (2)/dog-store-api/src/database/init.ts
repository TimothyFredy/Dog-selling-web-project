import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || ""
  });

  try {
    await connection.query(`
      CREATE DATABASE IF NOT EXISTS dog_store
      CHARACTER SET utf8mb4
      COLLATE utf8mb4_unicode_ci
    `);

    await connection.changeUser({
      database: process.env.DB_NAME || "dog_store"
    });

    await connection.query(`
      CREATE TABLE IF NOT EXISTS dogs (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(150) NOT NULL,
        image_url VARCHAR(500) NULL,
        details TEXT NULL,
        price DECIMAL(15,2) NOT NULL DEFAULT 0.00,
        currency_code CHAR(3) NOT NULL DEFAULT 'TZS',
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

        PRIMARY KEY (id),
        CONSTRAINT chk_dogs_price CHECK (price >= 0)
      ) ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_unicode_ci
    `);

    console.log("Database and dogs table are ready.");
  } finally {
    await connection.end();
  }
}

initializeDatabase().catch((error) => {
  console.error("Database initialization failed:", error);
  process.exit(1);
});
