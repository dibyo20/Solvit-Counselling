# 🧠 Solvit Counselling

A full-stack web application that connects users with professional counsellors. Users can register, log in, browse available counsellors, and search by name or specialization.

---

## 📁 Project Structure

```
Solvit Counselling/
├── Backend/        # Express.js REST API
└── Frontend/       # React + Vite frontend
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JSON Web Tokens (JWT) | Authentication |
| bcrypt | Password hashing |
| cookie-parser | HTTP cookie support |
| CORS | Cross-origin request handling |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP requests |
| Sass | Styling |
| Lucide React | Icon library |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### 🔧 Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/solvit
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

> ⚠️ **Important:** Set `NODE_ENV=production` only when deploying. This controls whether cookies use `secure: true` and `sameSite: none` (required for cross-origin production environments).

Start the development server:

```bash
npm run dev
```

The API will run on `http://localhost:5000`.

---

### 🎨 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

---

### 🔐 Auth Routes (`/api/auth`)

#### `POST /api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Validation Rules:**
- All fields are required
- Email must be a valid format
- Password must be at least 6 characters
- Username must be at least 3 characters

**Response `201`:**
```json
{
  "message": "User registered successfully",
  "user": { "fullname": "...", "username": "...", "email": "..." }
}
```

---

#### `POST /api/auth/login`
Log in with either username or email.

**Request Body (username login):**
```json
{
  "username": "johndoe",
  "password": "securePass123"
}
```

**Request Body (email login):**
```json
{
  "email": "john@example.com",
  "password": "securePass123"
}
```

**Response `200`:**
```json
{
  "message": "Login successful",
  "user": { "fullname": "...", "username": "...", "email": "..." }
}
```

> A `token` cookie is set automatically on both register and login.

---

#### `GET /api/auth/logout`
Log out the current user. **Protected** — requires a valid session cookie.

**Response `200`:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 👨‍⚕️ Counsellor Routes (`/api/counsellors`)

#### `GET /api/counsellors/`
Get all counsellors. **Protected** — requires a valid session cookie.

**Query Parameters (optional):**
| Param | Type | Description |
|---|---|---|
| `search` | `string` | Filter by name or specialization (case-insensitive) |

**Example:**
```
GET /api/counsellors/?search=anxiety
```

**Response `200`:**
```json
{
  "message": "Counsellors fetched successfully",
  "data": [ { ... }, { ... } ]
}
```

---

#### `POST /api/counsellors/add`
Add a new counsellor (for seeding/demo purposes). **Not protected.**

**Request Body:**
```json
{
  "name": "Dr. Jane Smith",
  "specialization": "Anxiety & Depression",
  "experience": 8,
  "sessionFee": 1500,
  "availability": "Mon-Fri 9AM-5PM",
  "rating": 4.8,
  "image": "https://example.com/image.jpg"
}
```

**Validation Rules:**
- `name`, `specialization`, `experience`, `sessionFee`, `availability` are required
- `experience` and `sessionFee` must be non-negative numbers
- `rating` (optional) must be between 0 and 5

---

## 🔒 Authentication Flow

```
1. User registers  -->  JWT token issued  -->  stored in httpOnly cookie
2. User logs in    -->  JWT token issued  -->  stored in httpOnly cookie
3. Protected route -->  auth middleware reads cookie  -->  verifies JWT  -->  grants access
4. User logs out   -->  cookie is cleared
```

The JWT token expires in **24 hours**.

---

## 🌐 CORS Configuration

The backend allows requests from the following origins:
- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5174`

All requests to the backend from the frontend must include `credentials: true` (Axios: `withCredentials: true`) for cookies to be sent.

---

## 🌱 Database Seeding

A seed script is available to populate the database with sample counsellor data:

```bash
cd Backend
node seed.js
```

---

## ⚠️ Error Handling

The API returns consistent JSON error responses across all endpoints:

| Status Code | Meaning |
|---|---|
| `400` | Bad Request — validation failed or resource not found |
| `401` | Unauthorized — token missing or invalid |
| `404` | Not Found — route does not exist |
| `500` | Internal Server Error — unexpected server error |

**Error response format:**
```json
{
  "message": "Descriptive error message here"
}
```

---

## 📦 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `NODE_ENV` | No | Set to `production` in production environments |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.
