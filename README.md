
# StudySpace – Student Task Management System

## Project Overview
StudySpace is a web application designed to help students organize their academic tasks, manage deadlines, and track task completion.

## Technologies Used
- **Frontend:** React, JavaScript, HTML, CSS, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **API:** REST API

## Features
- Add and manage student tasks
- Search and filter tasks
- Mark tasks as completed
- Delete tasks
- Store tasks in MongoDB through the backend API

## Project Structure
```text
Student_Task_Management_System_Frontend_Ready/
├── backend/
│   ├── server.js
│   ├── .env.example
│   └── .gitignore
├── Student_Task_Management_System_Frontend/
└── README.md
```

## Setup Instructions

### 1. Backend
Open a terminal in the `backend` folder and run:

```bash
npm install
```

Create a `.env` file using `.env.example` as a reference, then add your MongoDB connection string.

Start the backend:

```bash
node server.js
```

The API runs at `http://localhost:5000`.

### 2. Frontend
Open another terminal and navigate to the frontend folder:

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | Retrieve tasks |
| POST | `/api/tasks` | Create a task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Environment Variables
The backend requires:
- `PORT`
- `MONGODB_URI`

Never commit your real `.env` file or database credentials.

## Project Status
The Express backend and MongoDB connection have been tested locally. Frontend-to-backend integration and deployment still need verification.
