# StudySpace — Student Task Management System

A frontend-only student task planner built with React, Vite and CSS.

## Features
- Dashboard with total, pending and completed counts
- Add tasks with subject, due date, priority and notes
- Search and priority filters
- Views for due today, pending and completed tasks
- Mark tasks complete or delete them
- Responsive desktop/mobile layout
- Browser local storage keeps tasks on this device

## Run locally
1. Install Node.js LTS.
2. Extract the ZIP and open this folder in VS Code.
3. Open Terminal in VS Code and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Hosting
Use a static host that supports Vite builds. Set build command to `npm run build` and output folder to `dist` (for example, on Vercel or Netlify).

## Limitation
This is a frontend demonstration. It has no login or cloud database; tasks are saved in the current browser only. Replace the sample tasks with your own before presenting.
