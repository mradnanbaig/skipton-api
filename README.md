# Skipton API app

A React application built with Next.js that fetches and displays blog posts from JSONPlaceholder API.

## Prerequisites

- **Node.js**: Version 18.17.0 or higher (recommended: 20.x)
- **npm**: Version 9.0.0 or higher

## Features

- Next.js 15 with TypeScript
- Tailwind CSS with custom design system
- TanStack Query for API data fetching and caching
- Full accessibility compliance (WCAG 2.1)
- Comprehensive test coverage with Jest
- Semantic HTML structure
- Dark mode support
- Responsive design

## Getting Started

First, install dependencies:

npm install

Then, run the development server:

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Project Structure

src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── __tests__/      # Component tests
├── hooks/              # Custom React hooks
├── providers/          # Context providers
├── services/           # API services
└── types/              # TypeScript type definitions

## API Integration

This app fetches blog posts from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts) using TanStack Query for efficient data fetching, caching, and state management.
