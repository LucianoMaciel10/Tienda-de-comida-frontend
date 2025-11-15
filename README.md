# 🍽️ Luciano Restaurant

A modern and elegant restaurant web application built with React, TypeScript, and Tailwind CSS. This project simulates a complete food ordering system with user authentication, cart management, and real-time meal data.

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.4.10-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</div>

<div align="center">
  <h3>
    <a href="https://luciano-restaurant.netlify.app/" target="_blank">🌐 Live Demo</a>
  </h3>
</div>

---

## 📋 Overview

Luciano Restaurant is a full-featured frontend application that provides a seamless food ordering experience. The application features a clean, dark-themed UI with smooth animations and an intuitive user interface.

## ✨ Key Features

### 🔐 User Authentication System
- **Complete user management** using JSONBin API for data persistence
- **Login and Registration** with form validation
- **Persistent sessions** using localStorage
- **User profile management** with personal information

### 🛒 Shopping Cart & Orders
- **Real-time cart management** with add, remove, and quantity adjustments
- **Order tracking system** with unique order IDs
- **Order history** for registered users
- **Multiple order types**: Dine In, To Go, and Delivery
- **Order notes** functionality for special instructions
- **Price calculation** with subtotal display

### 🍕 Menu Categories
The application features four main food categories, each powered by TheMealDB API:
- **Beef** - Premium beef dishes
- **Pasta** - Italian pasta selections
- **Chicken** - Chicken-based meals
- **Dessert** - Sweet treats and desserts

### 📱 Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Dark theme** with carefully selected color palette
- **Smooth animations** and transitions
- **Custom scrollbar styling** using tailwind-scrollbar-hide
- **Toast notifications** powered by Sonner

### 🎨 UI/UX Features
- **Modern card-based layout** for meal display
- **High-quality food images** from TheMealDB
- **Interactive quantity selectors** with increment/decrement buttons
- **Real-time availability indicators** showing bowl counts
- **Search functionality** for finding specific dishes
- **Sidebar navigation** with order summary

## 🏗️ Technical Architecture

### Component Structure
The project follows a modular component architecture:

```
src/
├── components/           # Reusable UI components
│   ├── Dishes.tsx       # Main dishes display
│   ├── Home.tsx         # Landing page
│   ├── LoginForm.tsx    # User login
│   ├── RegisterForm.tsx # User registration
│   ├── MealCard.tsx     # Individual meal card
│   ├── OrderCard.tsx    # Order summary card
│   ├── Sidebar.tsx      # Navigation sidebar
│   ├── NavBar.tsx       # Top navigation
│   └── [Modals]         # Various modal components
├── contexts/            # React Context for state management
│   └── OrdersContext.tsx
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

### State Management
- **React Context API** for global order state management
- **localStorage** for client-side data persistence
- **Custom hooks** for reusable logic

### API Integration
1. **JSONBin API**: Used for user authentication and data storage
   - User registration and login
   - Order history persistence
   - User profile management

2. **TheMealDB API**: Provides real meal data
   - Meal categories (Beef, Pasta, Chicken, Dessert)
   - Meal details and images
   - Recipe information

### Routing
Built with **React Router v6** for seamless navigation:
- `/` - Home page
- `/login` - User authentication
- `/register` - New user registration
- Category-specific routes for different meal types

### Styling
- **Tailwind CSS** for utility-first styling
- **Custom theme configuration** in `tailwind.config.js`
- **PostCSS** for CSS processing
- **Responsive breakpoints** for all screen sizes

## 🛠️ Technologies Used

### Core
- **React 18.3.1** - UI library
- **TypeScript 5.6.2** - Type safety
- **Vite 5.4.10** - Build tool and dev server

### UI & Styling
- **Tailwind CSS 3.4.14** - Utility-first CSS framework
- **React Icons 5.3.0** - Icon library
- **Sonner 1.7.0** - Toast notifications
- **tailwind-scrollbar-hide 1.1.7** - Custom scrollbar styling

### Routing
- **React Router DOM 6.28.0** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React SWC** - Fast refresh and optimized builds

## 🎯 Project Highlights

- **Clean Architecture**: Well-organized component structure with clear separation of concerns
- **Type Safety**: Full TypeScript implementation for better development experience
- **Modern React**: Uses latest React features including hooks and context
- **Performance**: Optimized with Vite and SWC for fast build times
- **User Experience**: Smooth animations, instant feedback, and intuitive navigation
- **Data Persistence**: Smart use of localStorage and external APIs for data management
- **Scalability**: Modular design allows for easy feature additions

## 📦 Deployment

The application is deployed on **Netlify** with automatic deployments from the main branch. The production build is optimized for performance with code splitting and lazy loading.

🔗 **Live URL**: [https://luciano-restaurant.netlify.app/](https://luciano-restaurant.netlify.app/)

---

<div align="center">
  <p>Built with ❤️ by Luciano Joaquin Maciel</p>
  <p>
    <a href="https://github.com/lucianomaciel10">GitHub</a> •
    <a href="https://www.linkedin.com/in/luciano-maciel-53253430a/">LinkedIn</a>
  </p>
</div>
