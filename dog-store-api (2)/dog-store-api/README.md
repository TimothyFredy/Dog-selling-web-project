# Dog Store API

A beginner-friendly REST API built with:

- Node.js
- TypeScript
- Express
- MySQL
- mysql2
- Zod
- dotenv
- CORS

## 1. Requirements

Install:

- Node.js 20+
- MySQL 8+

Check:

```bash
node --version
npm --version
mysql --version
```

## 2. Install

```bash
npm install
```

Copy `.env.example` to `.env` and update the MySQL password.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

## 3. Create database and table

```bash
npm run db:init
```

## 4. Insert the sample dogs

```bash
npm run db:seed
```

## 5. Start development server

```bash
npm run dev
```

API:

http://localhost:3000

Health check:

http://localhost:3000/api/health

## API endpoints

### Dogs

```text
GET    /api/dogs
GET    /api/dogs/:id
POST   /api/dogs
PUT    /api/dogs/:id
DELETE /api/dogs/:id
```

### Example GET

```http
GET http://localhost:3000/api/dogs
```

### Example POST

```json
{
  "name": "Labrador",
  "imageUrl": "/labrador.jpg",
  "details": "Friendly and intelligent family dog",
  "price": 500000,
  "currencyCode": "TZS"
}
```

### Example PUT

```json
{
  "name": "Labrador Retriever",
  "price": 550000
}
```

### Delete

```http
DELETE http://localhost:3000/api/dogs/1
```

## React example

```typescript
import axios from "axios";

const response = await axios.get("http://localhost:3000/api/dogs");

console.log(response.data);
```

## Project structure

```text
dog-store-api/
├── src/
│   ├── controllers/
│   │   └── dog.controller.ts
│   ├── database/
│   │   ├── db.ts
│   │   ├── init.ts
│   │   └── seed.ts
│   ├── middleware/
│   │   └── error.middleware.ts
│   ├── models/
│   │   └── dog.model.ts
│   ├── routes/
│   │   └── dog.routes.ts
│   ├── schemas/
│   │   └── dog.schema.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Learning flow

Start by understanding this request:

```text
React
  |
  | GET /api/dogs
  v
Express Route
  |
  v
Controller
  |
  v
Model
  |
  v
MySQL
```

Then learn POST, PUT, DELETE, validation, errors, authentication and orders.
