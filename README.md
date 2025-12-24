# 🚀 Task Tracker – Frontend

A modern, responsive Task Management Web Application built with **Next.js**, **Tailwind CSS**, and **React Context**.  
Designed to feel like a desktop SaaS app on large screens and a mobile app on smaller devices.

## ✨ Features

### 🖥️ Desktop Experience
- Collapsible sidebar navigation
- Navigation items: **Dashboard**, **Tasks**, **Calendar**, **Settings**
- Centered main content when sidebar is minimized
- User profile section at the bottom of the sidebar

### 📱 Mobile Experience
- App-like bottom tab navigation
- Floating **Add Task** button available on all tabs
- Bottom-sheet modal for adding tasks

### 📊 Dashboard
> 📦 **Organize your time for more productivity**  
> Stay focused and achieve your goals with our task tracker.

### ✅ Tasks
- **Pending** & **Completed** task sections
- Task cards with:
  - Title
  - Description
  - Date & time
  - Status badge
- **Add / Update / Delete** tasks
- Toggle task status
- Smooth animation when marking a task as completed

### 📅 Calendar
- Monthly and daily calendar views
- Select a day to view tasks by time (Google Calendar–like)
- Tasks grouped by scheduled time

### ⚙️ Settings
- Light / Dark theme switch
- Update user details:
  - Username
  - Email
  - Password

## 🛠 Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context + `useReducer`
- **Animations**: Framer Motion
- **Icons**: Lucide React / Heroicons
- **Date & Time Picker**: Modern picker (native or library)

## 🔗 Backend API Integration
The frontend communicates with an **Express.js** backend.

### Environment Variable
Create a `.env.local` file: