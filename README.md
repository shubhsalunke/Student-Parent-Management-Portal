# 🎓 Student-Parent Management Portal

A modern, production-grade **Student-Parent Management Portal** built with **React 19**, **Vite**, **React Router 7**, **Tailwind CSS 4**, and integrated with **Live UAT Backend REST APIs** (`uat-safetrans.in`) with robust client-side LocalStorage fallback & caching.

Designed with role-based access control (Admin, Student, Parent), real-time profile synchronization, multi-guardian family mapping, and live database persistence.

---

## 🚀 Tech Stack

- **Frontend Framework**: [React.js](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vite.dev/) (v6)
- **Routing**: [React Router](https://reactrouter.com/) (v7)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend API Integration**: Live REST API Integration with UAT Services (`uat-safetrans.in`)
- **Data Caching & Persistence**: Browser `LocalStorage` hybrid caching with persistent deletion tracking

---

## 🌐 Live UAT Backend API Endpoints

The application seamlessly communicates with the following live UAT backend REST services:

| Endpoint | Method | Purpose | Key Parameters |
| :--- | :--- | :--- | :--- |
| `Get_Std_list` | `GET` | Fetch all registered students master list | `CLASS_SRNO`, `F_NAME`, `L_NAME`, `MOBILE_NO` |
| `Get_Std_Details` | `GET` | Fetch full details for a student and linked guardians | `STD_SRNO` (e.g. `STD_SRNO=6`) |
| `Insert_Update_Std_Ms` | `POST` | Create new or update existing student & guardian records | JSON PostData payload (`v_FLAG`, `stD_SRNO`, `grdN_Ms`) |

### 📄 Live Payload Schema (`Insert_Update_Std_Ms`)

```json
{
  "v_FLAG": "A", // "A" for Add / Creation, "U" for Update
  "stD_SRNO": 0,  // 0 for Creation, >0 for Update
  "f_NAME": "Nitesh",
  "m_NAME": "Harichand",
  "l_NAME": "Dhote",
  "dob": "2001-03-18T05:01:02.720Z",
  "birtH_PLACE": "Mumbai",
  "blooD_GROUP": 3,
  "mobilE_NO": "9876543210",
  "address": "123 Main St",
  "citY_SRNO": 1,
  "districT_SRNO": 1,
  "statE_SRNO": 1,
  "pincode": 400001,
  "gendeR_SRNO": 1,
  "rolL_NO": 12,
  "clasS_SRNO": 3,
  "addmissioN_DATE": "2026-08-15T05:01:02.720Z",
  "grdN_Ms": [
    {
      "grdN_SRNO": 0,
      "f_NAME": "Harichand",
      "m_NAME": "",
      "l_NAME": "Dhote",
      "relation": "Father",
      "gendeR_SRNO": 1,
      "mobilE_NO": "9876543211",
      "address": "123 Main St"
    }
  ]
}
```

---

## 🔑 Demo Login Credentials

The portal features a **Unified Direct Login Form** with automatic role detection based on User ID or Email ID. Fresh browser tabs or Incognito windows automatically synchronize live API data on mount.

| Role | User ID | Email ID | Default Password | Access Path |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `ADMIN001` | `admin@portal.com` | `admin123` | `/admin/dashboard` |
| **Student** | `STU001` | `nitesh@example.com` | `student123` | `/student/dashboard` |
| **Student** | `STU006` | `rahul@example.com` | `student123` | `/student/dashboard` |
| **Parent** | `PAR001` | `harichand@example.com` | `parent123` | `/parent/dashboard` |

---

## ✨ Key Features

### 🔐 1. Unified Direct Login & Live Auth Sync
- **Single Login Page** (`/login`): Accepts either **User ID** or **Email ID**.
- **Auto Live Sync**: Syncs live student accounts from UAT API on login page mount so fresh incognito sessions log in seamlessly.
- **Auto Role Detection**: Detects whether credentials belong to Admin, Student, or Parent.
- **Protected Routes**: Restricts unauthorized route navigation with dynamic location-based profile re-evaluation.

### 🛡️ 2. Admin Portal
- **Overview Dashboard** (`/admin/dashboard`): Live metrics for Total Students, Total Parents, and Family Links with auto-sync from live API.
- **Combined Registration Form** (`/admin/add-student`): Register a **Student** along with multiple linked **Guardians** (Father, Mother, Local Guardian) in a single workflow.
- **Mandatory Input Validation**: Strict validation for Email formats, Mobile numbers, Roll numbers, and Classes.
- **Students Directory** (`/admin/students`): Searchable directory with View details modal, Edit modal (bound to `v_FLAG: "U"` POST API), Delete confirmation, and manual **Sync Live API** button.
- **Parents Directory** (`/admin/parents`): Lists registered parent accounts with linked children badges and relationship tags.
- **Persistent Deletions**: Deleting a student or parent marks their ID in `portal_deleted_students` and `portal_deleted_parents` so page refreshes (`F5`) preserve deletion states.

### 🎒 3. Student Portal
- **Student Dashboard** (`/student/dashboard`): Welcome banner with real-time Middle Name (`M_NAME`) sync (`Rahul R lokhande`), Attendance percentage, Academic Score, Class/Roll info, and Linked Parent summary.
- **Realtime Profile Synchronization**: Admin updates to student names or details dynamically reflect across Dashboard, Header badges, Sidebar, and Profiles without requiring re-login.
- **My Profile** (`/student/profile`): Comprehensive profile view with personal info, blood group, contact, and address.
- **My Parent Page** (`/student/parent`): Linked parent/guardian profile details.
- **Attendance & Results**: Monthly attendance badges and subject-wise examination mark breakdowns.

### 👨‍👩‍👦 4. Parent Portal
- **Parent Dashboard** (`/parent/dashboard`): Linked child profile overview with quick navigation cards.
- **My Child Page** (`/parent/my-child`): Detailed profile of the linked child student.
- **Child Attendance & Results**: Real-time monitoring of child's attendance and academic grades.
- **Profile**: Parent account details.

---

## 📂 Project Structure

```text
project/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top Navigation Bar with role badge and logout
│   │   ├── ProtectedRoute.jsx  # Dynamic role-based route guard with useLocation
│   │   └── Sidebar.jsx         # Responsive sidebar navigation with active role state
│   ├── data/
│   │   ├── apiService.js       # Live API HTTP client & Get_Std_list / Get_Std_Details handlers
│   │   └── demoData.js         # LocalStorage caching, Insert_Update_Std_Ms POST payloads, & sync engine
│   ├── pages/
│   │   ├── admin/              # Admin pages (Dashboard, AddStudent, Students, Parents)
│   │   ├── student/            # Student pages (Dashboard, Profile, Attendance, Results, MyParent)
│   │   ├── parent/             # Parent pages (Dashboard, Profile, Attendance, Results, MyChild)
│   │   └── Login.jsx           # Unified login page with auto API pre-sync
│   ├── App.jsx                 # React Router 7 configuration & root redirects
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind CSS imports & global styles
├── vite.config.js              # Vite configuration with Tailwind CSS plugin
├── README.md                   # Project documentation
└── package.json                # Dependencies & scripts
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
The application will be running at `http://localhost:5173/`.

### 3. Build for Production
```bash
npm run build
```

---

## 📝 License

This project is created for educational, presentation, and production integration demonstration purposes.
