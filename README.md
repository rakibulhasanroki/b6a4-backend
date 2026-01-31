# MediStore

### "Your Trusted Online Medicine Shop" [MediStore API](https://medistore-pharma-api.vercel.app)

MediStore is a role-based e-commerce backend system for purchasing **over-the-counter (OTC) medicines**. It supports **Customers**, **Sellers**, and **Admins**, each with different permissions and responsibilities.

This backend provides REST APIs for authentication, medicine management, orders, reviews, and user administration.

> ⚠️ This system handles **OTC medicines only** (no prescriptions).

## Live Demo

### [Frontend](https://medistore-pharma.vercel.app)

### [Backend API](https://medistore-pharma-api.vercel.app)

## Project Overview

MediStore allows:

- Customers to browse medicines, place orders, and leave reviews
- Sellers to manage their medicine inventory and fulfill orders
- Admins to manage users, categories, and oversee platform activity

---

## Roles & Permissions

| Role         | Description         | Key Permissions                                       |
| ------------ | ------------------- | ----------------------------------------------------- |
| **Customer** | Purchases medicines | Browse, order, track orders, leave reviews            |
| **Seller**   | Medicine vendors    | Add/edit medicines, manage stock, update order status |
| **Admin**    | Platform manager    | Manage users, categories, medicines, and all orders   |

> Users select **Customer** or **Seller** during registration.  
> Admin accounts are seeded directly in the database.

---

## Tech Stack

| Technology        | Purpose                             |
| ----------------- | ----------------------------------- |
| Node.js + Express | REST API server                     |
| PostgreSQL        | Database                            |
| Prisma ORM        | Database modeling & queries         |
| Better Auth       | Authentication & session management |
| Vercel            | Backend deployment                  |

---

## Folder Structure

```bash
src/
│
├── app.ts              # Express app config
├── server.ts           # Server entry point
│
├── lib/
│   ├── prisma.ts       # Prisma client instance
│   └── auth.ts         # Better Auth configuration
│
├── middleware/
│   ├── auth.ts
│   ├── checkUserStatus.ts
│   ├── errorHandele.ts
│   └── notFound.ts
│
├── modules/
│   ├── category/
│   ├── medicine/
│   ├── order/
│   ├── review/
│   └── user/
│
├── routes/
│   ├── auth.route.ts
│   └── index.ts
│
prisma/
│   └── schema.prisma
│
vercel.json
tsconfig.json
package.json

```

## Features

### Public Features

- Browse all medicines
- Filter by category, manufacturer, and price
- View medicine details
- View customer reviews

### Customer Features

- Register & login
- Place orders (Cash on Delivery)
- Track order status
- Leave reviews after purchasing
- Manage profile

### Seller Features

- seller can view theirs medicine
- Add, update, delete medicines
- Manage stock
- View customer orders
- Update order status

### Admin Features

- View all users
- Ban / unban users
- Manage categories
- View all medicines & orders

---

## Authentication APIs (Better Auth)

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| POST   | `/api/auth/sign-up/email` | Register user       |
| POST   | `/api/auth/sign-in/email` | Login user          |
| GET    | `/api/auth/session`       | Get current session |

## Medicine APIs

### Public

| Method | Endpoint                | Access |
| ------ | ----------------------- | ------ |
| GET    | `/api/medicines`        | Public |
| GET    | `/api/medicines/:id`    | Public |
| GET    | `/api/seller/medicines` | Public |

### Seller Only

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | `/api/seller/medicines`     |
| POST   | `/api/seller/medicines`     |
| PATCH  | `/api/seller/medicines/:id` |
| DELETE | `/api/seller/medicines/:id` |

## Category APIs

| Method | Endpoint                      | Access |
| ------ | ----------------------------- | ------ |
| GET    | `/api/categories`             | Public |
| POST   | `/api/categories`             | Admin  |
| PATCH  | `/api/categories/:categoryId` | Admin  |
| DELETE | `/api/categories/:categoryId` | Admin  |

## Order APIs

| Method | Endpoint             | Access          |
| ------ | -------------------- | --------------- |
| POST   | `/api/orders`        | Customer        |
| GET    | `/api/orders`        | Customer/Admin  |
| GET    | `/api/orders/:id`    | Customer/Admin  |
| GET    | `/api/seller/orders` | Seller          |
| Seller | `/api/seller/stats`  | Seller          |
| PATCH  | `/api/orders/:id`    | Customer/Seller |

## Review APIs

| Method | Endpoint                   | Access   |
| ------ | -------------------------- | -------- |
| POST   | `/api/reviews`             | Customer |
| GET    | `/api/reviews/:medicineId` | Public   |

## User APIs

| Method | Endpoint             | Access             |
| ------ | -------------------- | ------------------ |
| GET    | `/api/users`         | Admin              |
| GET    | `/api/user/me`       | Authenticated User |
| PATCH  | `/api/users/:userId` | Admin              |
| PATCH  | `/api/user/me`       | Authenticated User |

## Order Status Flow

PLACED → PROCESSING → SHIPPED → DELIVERED
↓
CANCELLED

> Check docs folder for example data formate.

## Database Tables

- **Users**
- **Categories**
- **Medicines**
- **Orders**
- **OrderItems**
- **Reviews**

---

## Environment Variables

Create a `.env` file and configure:

DATABASE_URL=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=

APP_URL=

## Running Locally

```bash
pnpm install
pnpm prisma generate
pnpm dev
```

# Deployment

This backend is deployed on Vercel using a serverless Node.js setup.

Thank You

Github: [rakibulhasanroki](https://github.com/rakibulhasanroki)
