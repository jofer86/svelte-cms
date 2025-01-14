# Svelte CMS

A minimalist content management system built with SvelteKit, featuring a clean interface for article management.

## Features

### Authentication
- Secure user authentication
- Session-based auth with automatic expiry
- Role-based access (User/Admin)

### Article Management
- Create, read, update, and delete articles
- Rich text editor with support for:
  - Text formatting (bold, italic)
  - Headings
  - Lists (bullet and numbered)
  - Links
  - Images
- Article status management:
  - Draft: Work in progress
  - Published: Live and viewable
  - Archived: Hidden from view
- URL-friendly slugs (auto-generated or custom)
- Tag system for article categorization

## Tech Stack

- **Frontend**: SvelteKit, TailwindCSS
- **Backend**: SvelteKit (server-side), Prisma ORM
- **Database**: PostgreSQL
- **Editor**: TipTap
- **Authentication**: Session-based with bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd svelte-cms
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
# Create a .env file with:
DATABASE_URL="postgresql://[user]:[password]@localhost:5432/svelte_cms?schema=public"
```

4. Set up the database:
```bash
# Run migrations
npx prisma migrate dev

# Seed the database with test data
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

### Test Accounts

The seed script creates two test accounts:

- Regular User:
  - Email: test@example.com
  - Password: password123

- Admin User:
  - Email: admin@example.com
  - Password: admin123

## Database Schema

### User
- Authentication and user management
- Stores email and hashed password
- Links to articles through authorId

### Article
- Core content type
- Fields: title, slug, content, status
- Rich text content storage
- Status tracking (draft/published/archived)
- Metadata and timestamps

### Tag
- Article categorization
- Many-to-many relationship with articles

## Development

### Key Directories
```
src/
├── routes/
│   ├── (auth)/        # Authentication routes
│   └── (protected)/   # Protected CMS routes
│       └── articles/  # Article management
├── lib/
│   ├── components/    # Shared components
│   ├── server/       # Server-side utilities
│   └── utils/        # Shared utilities
```

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Format code
- `npx prisma studio` - Open Prisma database UI

## License

MIT
