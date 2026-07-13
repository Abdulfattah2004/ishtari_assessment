# Ishtari Assessment

Submitted by **Abdulfattah Abboud**

This repository contains my solution for the Ishtari hiring assessment.

The project consists of two applications:

- **api-nodejs** – A secure REST API built with Express and TypeScript.
- **dashboard-nextjs** – A Next.js dashboard that consumes the API and displays products.

---

# Project Structure

```
ishtari-assessment/
│
├── api-nodejs/
│
├── dashboard-nextjs/
│
└── README.md
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Zod
- PM2

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod

---

# Features

## Backend

- Express REST API
- JWT protected endpoints
- Request validation using Zod
- Response validation using Zod
- Centralized error handling
- Request logging middleware
- Health check endpoint
- Product search and filtering
- Environment variable configuration
- PM2 support for production

## Frontend

- Product dashboard
- Product search
- Loading state
- Error state
- Empty state
- Secure API communication
- Environment variables
- Responsive UI

---

# Installation

Clone the repository.

```bash
git clone <repository-url>
cd ishtari-assessment
```

---

# Backend Setup

Navigate to the backend.

```bash
cd api-nodejs
```

Install dependencies.

```bash
npm install
```

Create an environment file.

```
.env
```

Example:

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your_secret_key
```

Run development server.

```bash
npm run dev
```

Build the project.

```bash
npm run build
```

Run PM2.

```bash
pm2 start ecosystem.config.js
```

Useful PM2 commands.

```bash
pm2 status
pm2 logs ishtari-api
pm2 restart ishtari-api
pm2 stop ishtari-api
```

---

# Frontend Setup

Navigate to the frontend.

```bash
cd dashboard-nextjs
```

Install dependencies.

```bash
npm install
```

Create

```
.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_DEMO_TOKEN=YOUR_GENERATED_TOKEN
```

Run development server.

```bash
npm run dev
```

Build.

```bash
npm run build
```

---

# API Endpoints

## Health Check

```
GET /health
```

---

## Get Products

```
GET /api/products
```

Authorization

```
Bearer <JWT Token>
```

---

## Get Product By ID

```
GET /api/products/:id
```

---

## Create Product

```
POST /api/products
```

Example Body

```json
{
  "name": "Mechanical Keyboard",
  "price": 120,
  "category": "Accessories",
  "status": "active"
}
```

---

## Update Product Status

```
PATCH /api/products/:id/status
```

Example Body

```json
{
  "status": "inactive"
}
```

---

# Validation

The project uses **Zod** for validation.

Backend:

- Request body validation
- Route parameter validation
- Response validation

Frontend:

- API response validation before rendering

---

# Authentication

Protected endpoints require a JWT token.

Example:

```
Authorization: Bearer YOUR_TOKEN
```

A helper script is included to generate a demo token.

```bash
node generate-token.js
```

---

# Error Handling

The API returns consistent error responses.

Example:

```json
{
    "success": false,
    "error": {
        "message": "Product not found"
    }
}
```

---

# Design Decisions

A few decisions I made while implementing the project:

- I separated the application into controllers, services, routes, and middleware to keep responsibilities clear.
- I used an in-memory data store since persistence wasn't required for the assessment.
- Zod is used on both the backend and frontend to keep data validation consistent.
- Environment variables are used instead of hardcoded values for configuration and JWT secrets.
- PM2 configuration was added to simulate a simple production deployment.

---

# Future Improvements

If this project were expanded further, I would consider adding:

- Database integration (PostgreSQL or MongoDB)
- User login endpoint with refresh tokens
- Pagination
- Product sorting
- Unit and integration tests
- Docker support
- CI/CD pipeline
- API documentation with Swagger/OpenAPI

---

# Notes

This project was developed as part of the Ishtari hiring assessment.

Thank you for taking the time to review my submission.