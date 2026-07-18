# Solvit Counselling

Solvit Counselling is a full-stack web application for discovering counsellors, authenticating users, and browsing professionals by specialization.

Live Demo: https://solvit.dibyo.tech

## Overview

This repository contains:

- A Node.js + Express backend API with MongoDB persistence and cookie-based JWT authentication.
- A React + Vite frontend for user registration, login, counsellor discovery, filtering, and booking request UI.

## Tech Stack

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcrypt
- cookie-parser
- cors
- dotenv

### Frontend

- React 19
- Vite
- React Router DOM 7
- Axios
- Sass
- Lucide React

## Repository Structure

```text
Solvit-Counselling/
  Backend/
    server.js
    src/
      app.js
      config/
      controllers/
      middlewares/
      models/
      routes/
      utils/
  Frontend/
    src/
      components/
      hooks/
      pages/
      services/
```

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- MongoDB (local instance or MongoDB Atlas)

## Local Development Setup

### 1) Clone and install dependencies

```bash
git clone https://github.com/dibyo20/Solvit-Counselling.git
cd Solvit-Counselling

cd Backend
npm install

cd ../Frontend
npm install
```

### 2) Configure backend environment

Create a file named `.env` in `Backend/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/solvit
JWT_SECRET=replace_with_a_strong_secret
NODE_ENV=development
```

Environment variable reference:

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No | API server port. Defaults to `5000`. |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `JWT_SECRET` | Yes | Secret used to sign and verify JWT tokens. |
| `NODE_ENV` | No | Use `production` in production deployments for secure cookie behavior. |

### 3) Configure frontend environment (optional)

Create `.env` in `Frontend/` only if you need to override the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

If not set, the frontend defaults to `http://localhost:5000/api`.

### 4) Run both services

Backend terminal:

```bash
cd Backend
npm run dev
```

Frontend terminal:

```bash
cd Frontend
npm run dev
```

Default local URLs:

- Frontend: http://localhost:5173 (Vite may switch to 5174 if 5173 is occupied)
- Backend API root: http://localhost:5000

## Available Scripts

### Backend (`Backend/package.json`)

- `npm run dev` - start backend with nodemon
- `npm start` - start backend with Node.js

### Frontend (`Frontend/package.json`)

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## API Summary

Base URL (local): `http://localhost:5000/api`

### Auth routes

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login with username or email + password | No |
| GET | `/auth/logout` | Logout current user | Yes |

### Counsellor routes

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| GET | `/counsellors` | Fetch all counsellors, optional `?search=` query | Yes |
| POST | `/counsellors/add` | Add counsellor data (utility/demo endpoint) | No |

## Authentication and Security

- JWT token is issued on register/login and stored in an HTTP-only cookie named `token`.
- Token expiration is `1d`.
- Protected routes validate the cookie token using middleware.
- In production (`NODE_ENV=production`), cookies are set with `secure: true` and `sameSite: none`.

## CORS and Credentials

Backend currently allows these local origins:

- http://localhost:5173
- http://127.0.0.1:5173
- http://localhost:5174
- http://127.0.0.1:5174

Frontend requests use `withCredentials: true`, which is required for cookie-based auth.

## Product Scope Notes

- Counsellor discovery is fully integrated with backend APIs.
- Booking is currently a frontend form workflow and does not persist booking records to the backend.

## Deployment Notes

For production deployments:

- Set `NODE_ENV=production` in backend environment variables.
- Use a strong `JWT_SECRET`.
- Provide a production `MONGO_URI`.
- Set `VITE_API_URL` in frontend to your deployed API base URL.
- Ensure backend CORS `allowedOrigins` includes your production frontend origin.

## Troubleshooting

- `Port 5173 is in use`: Vite will automatically try another port (commonly 5174).
- `Token not provided, unauthorized access`: make sure you are logged in and requests include cookies.
- CORS rejection errors: verify the frontend origin is listed in backend CORS `allowedOrigins`.
- MongoDB connection failure: validate `MONGO_URI` and ensure MongoDB is running/reachable.

## License

This project is currently unlicensed. Add a LICENSE file if you plan to distribute it under a specific license.