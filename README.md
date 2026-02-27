# Event Booking Frontend
React (Vite) · Context API · Axios

A mobile-first Single Page Application (SPA) built to consume the Laravel 12 Event Booking API.  
This frontend focuses on clean state management, authentication flow, and API integration.

---

# username & password
  - email = admin@example.com
  - password = password123

# 1. Tech Choices

## Stack Overview

- React (Vite)
- React Router DOM
- Context API (Global Auth State)
- Axios (API Client)
- LocalStorage (Token persistence)

---

## Why This Stack?

### React + Vite
- Fast development server
- Lightweight setup
- Modern tooling
- Minimal boilerplate
- Great DX (Developer Experience)

Vite was chosen over CRA because:
- Faster startup
- Smaller bundle
- Modern ES module support

---

### Context API (Instead of Redux)

Chosen because:
- Application state is simple
- Only authentication state is global
- Avoid unnecessary complexity
- Lightweight and built-in

Redux was considered but unnecessary for current scope.

---

### Axios

Used for:
- Centralized API configuration
- Interceptors for token injection
- Clean error handling

---

# 2. Architecture Overview

## Folder Structure

src/
 ├── components/
 ├── pages/
 ├── context/
 ├── services/
 └── App.jsx

---

## Core Concepts

### Authentication Flow

- User logs in
- Token stored in localStorage
- Axios interceptor attaches Bearer token
- Context stores authenticated user
- Protected UI rendered conditionally

---

## Routing

- Public routes:
  - /login
  - /register
- Authenticated routes:
  - /events
  - /events/:id
  - /bookings
  - /notifications

Navigation controlled via React Router.

---

# 3. Trade-offs

## What Was Prioritized

- Clear authentication flow
- Clean API consumption
- Simple state management
- Mobile-first layout
- Conditional rendering based on auth state

---

## What Was Deprioritized

- UI animation
- Advanced component library (no MUI/AntD)
- Global state scaling
- Performance optimization
- SSR / SEO optimization

---

## What Would Break Under Production Load?

1. No caching strategy
2. No request debouncing on search
3. No request retry strategy
4. No pagination optimization on large data

Production improvements:
- React Query / TanStack Query
- Request throttling
- Lazy loading
- Code splitting
- Skeleton loading states

---

# 4. Setup Instructions

## Requirements

- Node.js 18+
- Backend API running

---

## Installation

git clone https://github.com/your-repo/event-booking-frontend.git
cd event-booking-frontend
npm install

---

## Configure API Base URL

Update:

src/services/api.js

Example:

const api = axios.create({
  baseURL: "https://api.and-dev.my.id/api",
});

---

## Run Development Server

npm run dev

App runs at:

http://localhost:5173

---

# 5. Authentication Behavior

## When Not Logged In

- Login & Register buttons visible
- Logout button hidden

## When Logged In

- Username displayed
- Logout button visible
- Token automatically attached to API requests

---

# 6. Key Features

- Event listing with search
- Event detail page
- Booking interaction
- Conditional rendering based on auth state
- Logout with backend token revoke
- LocalStorage session persistence

---

# 7. What I'd Improve First

If given more time:

## 1. Replace Context API with React Query

Reason:
- Built-in caching
- Better request state handling
- Automatic background refetch
- Improved UX

---

## 2. Add Protected Route Wrapper

Create:
- <PrivateRoute />
- Auto redirect to /login if token missing

---

## 3. Add Global Error Handling

- Axios interceptor for 401
- Auto logout on token expired

---

## 4. Improve UX

- Loading spinner
- Skeleton UI
- Toast notifications
- Disabled states during submit

---

## 5. Performance Optimization

- Lazy load routes
- Code splitting
- Memoization
- Pagination instead of loading full list

---

# 8. Production Readiness Gaps

- No environment config separation
- No error boundary
- No unit testing
- No E2E testing
- No CI/CD integration
- No performance monitoring

---

# 9. Engineering Philosophy

This frontend is intentionally simple.

Focus:
- Clean auth flow
- Clear API communication
- Minimal complexity
- Easy to extend

The goal is maintainability and clarity over premature optimization.

# 10. Video Testing 
 - link = https://www.loom.com/share/20580878c8f54f919e76ac75d0008070