# EduVault — Student Portal

A React + Vite web app where teachers upload notes and students browse/download them by subject.

## Features
- Landing page with a role picker (Student / Teacher)
- Student & Teacher registration and login
- Protected dashboards (redirects to login if not signed in, redirects away if wrong role)
- Teachers can upload notes (title, subject, description, PDF) and manage them under "My Notes"
- Students browse notes by subject and download PDFs
- Logout

## Data storage
This project currently uses the browser's `localStorage` as a stand-in database
(see `src/utils/auth.js` and `src/utils/notes.js`). That means:
- Accounts and notes are only visible in the browser/device they were created on
- Passwords are stored in plain text — fine for a college demo, **not production-safe**
- Swapping in a real backend later only means rewriting the functions inside those two files

## Getting started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Project structure
```
src/
  pages/       one component + one CSS file per screen
  utils/       auth.js and notes.js -- the "database" layer
  routes/      ProtectedRoute.jsx -- guards routes by login/role
  App.jsx      all routes
```
