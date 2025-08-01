# 🎨 License Inventory Frontend – LicenseGuard

## 📘 Overview

This is the **frontend interface** for the **License Inventory Management** module of the LicenseGuard system. It provides an intuitive UI for creating, viewing, and managing software license records tied to departmental procurement data. The frontend interacts with REST APIs exposed by the backend service to perform CRUD operations on license data.

---

## 🚀 Features

- ✅ Create new software license entries using a form UI
- 📋 View all licenses in a paginated and sortable table
- 🔍 Filter licenses by:
  - Department ID
  - Procurement Record ID
- 📅 View purchase and expiry details
- 🔄 Real-time data sync via REST APIs

---

## 🛠️ Tech Stack

| Layer           | Technology         |
|----------------|--------------------|
| Framework       | React.js / Next.js *(based on your stack)* |
| HTTP Client     | Axios / Fetch API  |
| Styling         | Tailwind CSS / Bootstrap / Material UI |
| Routing         | React Router (if used) |
| State Management| React Hooks / Redux Toolkit (optional) |

---

## 🌐 API Integration

The frontend connects to the backend through these endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/licenses` | Submit new license data |
| `GET`  | `/api/licenses` | Fetch all license records |
| `GET`  | `/api/licenses/{id}` | Get license by ID |
| `GET`  | `/api/licenses/department/{deptId}` | Get by department |
| `GET`  | `/api/licenses/procurement/{procId}` | Get by procurement |

---

