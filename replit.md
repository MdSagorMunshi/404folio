# Ryan Shelby's "Beautifully Broken" Portfolio

## Overview

This is a full-stack portfolio website for Ryan Shelby that embraces a "Beautifully Broken" philosophy, blending modern web development with intentional quirks, sarcasm, and a notebook/sketchbook aesthetic. The application breaks conventional design rules while maintaining professional functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with custom design system and shadcn/ui components
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type consistency
- **API Design**: RESTful API with `/api` prefix for all endpoints
- **Session Management**: In-memory storage with extensible interface design
- **Development**: Hot module replacement via Vite middleware integration

### Data Storage Solutions
- **Database**: Configured for PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL via `@neondatabase/serverless`
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Current Implementation**: In-memory storage for development with database-ready interface

### Authentication and Authorization
- **Strategy**: Session-based authentication (infrastructure ready)
- **User Schema**: Basic username/password model with extensible design
- **Storage Interface**: Abstract storage layer supporting both memory and database implementations

## Key Components

### Visual Design System
- **Color Palette**: Electric blues (#00D4FF, #0080FF), neon greens (#00FF88, #39FF14), hot pinks (#FF1493, #FF69B4)
- **Typography**: Monospace headers, clean sans-serif body, retro terminal fonts for code
- **Theme**: Dark mode with CSS custom properties for consistent theming
- **Aesthetic**: Notebook/sketchbook style with spiral binding, torn edges, and handwritten elements

### Interactive Elements
- **Floating Components**: Animated emoji elements with mouse interaction
- **Skill Tree**: Interactive skill visualization with hover effects and animations
- **Project Cards**: Notebook-style cards with sticky notes and hover animations
- **Contact Form**: Mock form submission with humorous feedback messages
- **Konami Code**: Hidden developer mode activation

### Personality Features
- **Sarcastic Messaging**: Humorous loading states, error messages, and UI copy
- **Easter Eggs**: Hidden interactions and developer-focused jokes
- **Intentional "Bugs"**: Glitch effects and console logs as design features
- **Meme Integration**: Pop culture references and GIF-worthy interactions

## Data Flow

1. **Client Request**: Browser requests served by Express server
2. **Development Mode**: Vite middleware handles HMR and asset serving
3. **API Routes**: RESTful endpoints prefixed with `/api` for data operations
4. **Storage Layer**: Abstract interface allows switching between memory and database storage
5. **Response**: JSON data returned with comprehensive error handling
6. **Client State**: React Query manages caching and synchronization

## External Dependencies

### UI and Animation
- **Radix UI**: Accessible component primitives for complex UI elements
- **Framer Motion**: Production-ready motion library for React
- **Lucide React**: Modern icon library with consistent styling
- **Embla Carousel**: Touch-friendly carousel component

### Development Tools
- **ESBuild**: Fast TypeScript compilation for production builds
- **TSX**: TypeScript execution for development server
- **PostCSS**: CSS processing with Autoprefixer
- **Tailwind CSS**: Utility-first CSS framework

### Database and Storage
- **Drizzle ORM**: Type-safe SQL ORM with excellent TypeScript integration
- **Drizzle Zod**: Schema validation integration
- **Connect PG Simple**: PostgreSQL session store (ready for implementation)

## Deployment Strategy

### Replit Configuration
- **Runtime**: Node.js 20 with PostgreSQL 16 module
- **Development**: `npm run dev` with hot reloading on port 5000
- **Production Build**: Vite frontend build + ESBuild server compilation
- **Deployment**: Autoscale deployment target with automatic port mapping

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild compiles TypeScript server to `dist/index.js`
3. **Assets**: Static files served from build output
4. **Environment**: Production mode automatically detected

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required for database operations)
- `NODE_ENV`: Environment detection for development/production modes
- `REPL_ID`: Replit-specific configuration detection

## Changelog
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.