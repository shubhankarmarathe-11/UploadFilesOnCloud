# File Upload & Management System

A **full‑stack file upload and management web application** built for portfolio purposes. The system allows users to upload, store, download, and manage files securely on a server.

This project demonstrates **full‑stack development skills** including backend API development, authentication, file handling, and modern frontend development.

The repository also contains a **mobile application prototype** that is being developed as a future enhancement.

---

# Project Purpose

This project was created as a **portfolio project** to demonstrate the following skills:

- Full‑stack web development
- REST API development
- Secure authentication
- File upload and download handling
- Server‑side file storage
- Modern frontend UI development

---

# Features

- User authentication (Google OAuth + JWT)
- Upload files to the server
- Download stored files
- View uploaded files
- Delete files
- Email notifications
- Redis caching
- Responsive web interface

---



# Project Structure

This repository follows a **monorepo structure** with three main components.

```
Root
│
├── Backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
├── FileUploadFrontEnd
│   ├── src
│   ├── components
│   ├── pages
│   └── services
│
└── fileuploadingapp
    ├── app
    ├── components
    └── screens
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- Redis (ioredis)
- Multer (file upload handling)
- JWT (jose)
- bcryptjs
- Google OAuth
- Nodemailer

Files are stored **directly on the server filesystem** using Multer.

---

## Web Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- PostCSS
- Zustand (state management)
- Axios
- Radix UI
- Lucide React
- Google OAuth

---

## Mobile Application (Future Enhancement)

- React Native
- Expo
- Expo Router
- React Native Reanimated
- Expo Vector Icons

The mobile application is currently **experimental** and will extend the platform to mobile devices in future versions.

---

# System Requirements

Ensure the following tools are installed:

- Node.js (v18 or higher)
- MongoDB (Local or MongoDB Atlas)
- Redis Server

---

# Live Application

This project is deployed and accessible online. Users can access the web application directly without any local setup.

**Live Demo:**

```
https://app.shubhankarmarathe.online/

```

The application allows users to authenticate, upload files, manage stored files, and download them directly from the browser.

---

# API Capabilities

## Authentication

- Google OAuth login
- JWT access tokens

## File Management

- Upload files
- Download files
- List user files
- Delete files

## Storage

Files are stored **on the server filesystem** inside the uploads directory and managed using Multer.

---

# Security

- Password hashing using bcryptjs
- JWT authentication
- Environment variables for sensitive credentials
- Token validation using Redis

---

# Future Improvements

- Folder based file organization
- File sharing via links
- File preview support
- Upload progress indicators
- Drag and drop upload UI
- Storage usage statistics

---

# Author

**Shubhankar Marathe**

BCA Student | Full Stack Developer

This project was built as part of my portfolio to demonstrate practical full‑stack development skills.

---

# License

ISC License
