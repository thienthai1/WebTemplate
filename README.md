# Next.js MySQL Authentication App

A full-stack Next.js application with JWT authentication, MySQL database, Tailwind CSS styling, and Docker support.

## Features

- 🔐 JWT Authentication (Login/Register)
- 🗄️ MySQL Database
- 🎨 Tailwind CSS Styling
- 🐳 Docker & Docker Compose
- 🔒 HTTP-only Cookies for Security
- 🛡️ Protected Routes with Middleware

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL 8.0
- **Authentication**: JWT (jsonwebtoken, jose)
- **Container**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 18+ (for local development)
- Docker and Docker Compose (for containerized deployment)

### Option 1: Run with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd WebAppTemplate
   ```

2. Start the application:
   ```bash
   docker-compose up --build
   ```

3. Access the app at [http://localhost:3000](http://localhost:3000)

### Option 2: Run Locally

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd WebAppTemplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MySQL database and update `.env.local`:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. Run the database migrations:
   ```bash
   # Execute the init.sql file in your MySQL database
   mysql -u root -p authdb < init.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the app at [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=authdb

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with email and password |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/logout` | Logout current user |
| GET | `/api/auth/me` | Get current user info |

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── login/route.ts
│   │   │       ├── register/route.ts
│   │   │       ├── logout/route.ts
│   │   │       └── me/route.ts
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── db.ts
│   │   ├── jwt.ts
│   │   └── user.ts
│   └── middleware.ts
├── public/
├── docker-compose.yml
├── Dockerfile
├── init.sql
├── package.json
└── README.md
```

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens stored in HTTP-only cookies
- Protected routes with middleware
- Input validation on all endpoints

## License

MIT
# WebTemplate
