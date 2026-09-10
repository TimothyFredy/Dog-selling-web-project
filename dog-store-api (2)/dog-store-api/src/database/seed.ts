import dotenv from "dotenv";
dotenv.config();

import { pool } from "./db";

const dogs = [
  {
    name: "Doberman",
    imageUrl: "/Doberman.jpg",
    details: "Doberman is a top-tier security and protection dog",
    price: 600000
  },
  {
    name: "German Shepherd",
    imageUrl: "/German shepherd.jpg",
    details: "German Shepherds are elite security and protection dogs",
    price: 450000
  },
  {
    name: "Collie",
    imageUrl: "/collie.jpg",
    details: "Collies make exceptionally gentle, loyal, and smart family pets",
    price: 700000
  },
  {
    name: "French Bulldog",
    imageUrl: "/french_bulldog-scaled-1-820x1024.jpg",
    details: "Bulldogs make gentle, affectionate, and loyal family pets",
    price: 550000
  },
  {
    name: "Rottweiler",
    imageUrl: "/rottweiler.jpg",
    details: "Rottweilers make powerful and effective security and protection dogs",
    price: 460000
  },
  {
    name: "Belgian Malinois",
    imageUrl: "/BelgianMalinoisPurebredDog7MonthsOld.jpg",
    details: "The Belgian Malinois is a top choice for military, police, and elite security work",
    price: 800000
  }
];

async function seed() {
  try {
    await pool.query("DELETE FROM dogs");

    for (const dog of dogs) {
      await pool.execute(
        `INSERT INTO dogs
          (name, image_url, details, price, currency_code)
         VALUES (?, ?, ?, ?, 'TZS')`,
        [dog.name, dog.imageUrl, dog.details, dog.price]
      );
    }

    console.log(`${dogs.length} dogs inserted successfully.`);
  } finally {
    await pool.end();
  }
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
