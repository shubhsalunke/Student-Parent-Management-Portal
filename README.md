# 🎓 Student-Parent Management Portal

A modern, beginner-friendly **Student-Parent Management Portal** built with **React 19**, **Vite**, **React Router**, **Tailwind CSS**, and **LocalStorage**.

Designed with role-based access control (Admin, Student, Parent), clean UX aesthetics, and persistent client-side data management.

---

## 🚀 Tech Stack

- **Frontend Framework**: [React.js](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vite.dev/) (v6)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Persistence**: Browser `LocalStorage` (Zero-Backend Client-Side Storage)

---

## 🔑 Demo Login Credentials

The portal features a **Unified Direct Login Form** with automatic role detection based on User ID or Email.

| Role | User ID | Email ID | Default Password | Access Path |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `ADMIN001` | `admin@portal.com` | `admin123` | `/admin/dashboard` |
| **Student** | `STU001` | `rahul@example.com` | `student123` | `/student/dashboard` |
| **Parent** | `PAR001` | `amit@example.com` | `parent123` | `/parent/dashboard` |

---

## ✨ Key Features

### 🔐 1. Unified Direct Login & Auth
- **Single Login Page** (`/login`): Accepts either **User ID** or **Email ID**.
- **Auto Role Detection**: Automatically detects whether the credentials belong to an Admin, Student, or Parent.
- **Protected Routes**: Restricts unauthorized route navigation based on active role session.
- **Show/Hide Password**: Interactive toggle icon to inspect typed passwords.
- **Reset Demo Data**: One-click button to restore default demo accounts anytime.

### 🛡️ 2. Admin Portal
- **Dashboard Overview**: Metrics for Total Students, Total Parents, and Family Links.
- **Combined Registration Form** (`/admin/add-student`): Single-page form to register both a **Student** and their linked **Parent/Guardian**.
- **Smart ID Generation**: Automatically calculates sequential non-conflicting IDs (`STU003`, `PAR003`).
- **Students Directory** (`/admin/students`): Searchable directory with View details modal, Edit modal, and Delete confirmation.
- **Parents Directory** (`/admin/parents`): Lists parent details with linked student names, relationship badges, and manual deletion options.
- **Automatic Orphan Parent Cleanup**: Deleting a student automatically removes their linked parent if the parent has no other remaining enrolled children.

### 🎒 3. Student Portal
- **Student Dashboard**: Overview of Class, Roll Number, Attendance rate, and Subject Marks.
- **My Parent Page**: View linked parent/guardian profile details.
- **Attendance**: Monthly attendance record with Present/Absent status badges.
- **Academic Results**: Subject-wise marks breakdown and overall grade percentages.
- **Profile**: Student personal account details.

### 👨‍👩‍👦 4. Parent Portal
- **Parent Dashboard**: Child overview card with quick links.
- **My Child Page**: Detailed profile of the linked child student.
- **Child Attendance & Results**: Real-time view of child's school attendance and examination grades.
- **Profile**: Parent account profile information.

---

## 📂 Project Structure

```text
project/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top Navigation Bar with user profile badge
│   │   ├── ProtectedRoute.jsx  # Role-based route guard
│   │   └── Sidebar.jsx         # Responsive sidebar navigation
│   ├── data/
│   │   └── demoData.js         # Core data helper methods & LocalStorage persistence
│   ├── pages/
│   │   ├── admin/              # Admin pages (Dashboard, AddStudent, Students, Parents)
│   │   ├── student/            # Student pages (Dashboard, Profile, Attendance, Results, MyParent)
│   │   ├── parent/             # Parent pages (Dashboard, Profile, Attendance, Results, MyChild)
│   │   └── Login.jsx           # Unified direct login page
│   ├── App.jsx                 # React Router configuration
│   ├── main.jsx                # React app entry point
│   └── index.css               # Tailwind CSS imports & global styles
├── vite.config.js              # Vite configuration with Tailwind plugin
└── package.json                # Project dependencies & scripts
```

---

## ⚡ Getting Started

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The application will be running at `http://localhost:5174/` (or `http://localhost:5173/`).

### 3. Build for Production
```bash
npm run build
```

---

## 📝 License

This project is created for educational, presentation, and interview demonstration purposes.
