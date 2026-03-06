# AuBank Frontend Documentation

## Project Overview
AuBank is a comprehensive React-based banking dashboard application designed for internal operations, customer management, and specialized services like Video KYC. The application provides a modular interface for different banking roles and departments.

## Tech Stack
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.3.1
- **Styling:** Tailwind CSS 4.2.1
- **Routing:** React Router DOM 7.13.1
- **Icons:** Lucide React, React Icons
- **AI/Media:** MediaPipe (Selfie Segmentation, Camera Utils) for Video KYC features.

## Project Structure
```
AuBank/
├── public/              # Static assets (logos, icons)
├── src/
│   ├── assets/          # Project-specific images and icons
│   ├── components/      # Reusable UI components
│   │   ├── DashboardLayout.jsx  # Main wrapper for authenticated pages
│   │   ├── Header.jsx           # Global top navigation bar
│   │   └── Sidebar.jsx          # Collapsible side navigation menu
│   ├── pages/           # Individual page components (Dashboards, Management, etc.)
│   ├── App.jsx          # Main routing and application logic
│   ├── main.jsx         # Entry point for React
│   └── index.css        # Global styles and Tailwind imports
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies and scripts
```

## Core Modules & Features

### 1. Authentication
- **Login:** `LoginPage.jsx` handles user authentication.
- **Registration:** `RegistrationPage.jsx` for new user sign-ups.
- **Session Management:** Token-based logout logic implemented in `Sidebar.jsx`.

### 2. Video KYC (Key Feature)
- **Customer Side:** `VideoKyc.jsx` for customers to perform identity verification.
- **Agent Side:** `AgentVideokyc.jsx` for bank agents to process KYC requests.
- Uses MediaPipe for advanced camera and segmentation features.

### 3. Specialized Dashboards
- **Operation Dashboard:** General banking operations management.
- **Global Dashboard:** High-level overview of bank metrics.
- **Customer Dashboard:** Detailed customer insights and management.
- **Internal Audit:** Tools for internal auditing processes.
- **Compliance & Risk:** Monitoring and managing bank compliance.
- **Wealth Management:** Portal for wealth and investment services.

### 4. Management & Analytics
- **User Management:** Admin controls for system users.
- **Branch Management:** Management of physical bank branches.
- **Performance Analytics:** General and Agent-specific performance tracking.
- **System Health & Security:** Monitoring application health and security logs.

### 5. Service Requests
- **Service Request Catalog:** List of available banking services.
- **Service Tracking:** Real-time tracking of request status.
- **Service Form:** Dynamic forms for submitting new requests.

## Navigation & Layout
The application uses a **DashboardLayout** which includes:
- **Responsive Sidebar:** Supports desktop (collapsible) and mobile views. Includes tooltips for icons when collapsed.
- **Header:** Contains profile information and mobile menu triggers.
- **Main Content:** Rendered via React Router's `Outlet`.

## Getting Started
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Build for production: `npm run build`
4. Lint code: `npm run lint`

## Environment Variables
- `VITE_BACKEND_URL`: Base URL for API calls.
