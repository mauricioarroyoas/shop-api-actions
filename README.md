# 🛒 Computer Parts Shop API

This is a backend API for an online shop that sells computer parts. Built with **Express.js** and **TypeScript**, and using **PostgreSQL** with **TypeORM** for database management.

## 📦 Tech Stack
- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL
- Yarn or npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/mauricioarroyoas/assuresoft-eshop-api.git
   cd assuresoft-eshop-api

# Project Setup and Structure
## Install dependencies:
```bash
npm install
# or
yarn install
```

## Set up your .env file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_user
DB_PASSWORD=your_password
DB_NAME=shop_db
```

## Run migrations (if using TypeORM CLI or a script):
```bash
npm run typeorm migration:run
```

## run seeding for table
```bash
npm run seed:products
```

## Start the development server:
```bash
npm run dev
```

## 📁 Project Structure
```bash
src/
├── controllers/
├── entities/
├── routes/
├── services/
├── persistence/
│   └── migrations/
├── data-source.ts
└── index.ts
```

## 📜 Business Rules
- Users can browse computer parts (CPUs, GPUs, RAM, etc.)
- Authenticated users can place orders
- Admins can add/edit/delete products

## 🧪 Testing
To run the tests, use the following command:
```bash
npm run test

## 📬 Contact
Made with 💻 by [MauricioArroyo] & [MiguelGonzales]  

