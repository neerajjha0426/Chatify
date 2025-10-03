# Chatify

Chatify is a simple chat application built using the MERN stack (MongoDB, Express, React, Node). This repository contains two top-level folders:

- `Backend/` - Express server and API routes
- `Frontend/Chatify/` - React app (Vite)

This README explains how to set up and run both parts locally, common pitfalls (including bcrypt/bcryptjs installation on Windows), and useful commands.

## Repository layout

- Backend/
  - src/
    - server.js
    - route/
      - auth.route.js
      - message.route.js
  - package.json

- Frontend/Chatify/
  - src/
  - package.json

## Prerequisites

- Node.js (recommended LTS, e.g., 18.x or 20.x)
- npm (bundled with Node)
- MongoDB (local or remote Atlas instance)
- (Windows only) If you plan to install native modules like `bcrypt` you may need Windows Build Tools / Visual Studio Build Tools.

If you don't want to install native build tools, prefer `bcryptjs` which is a pure-JS implementation and works without native compilation.

## Environment variables

Create a `.env` file in `Backend/` (same level as `src` or as your server reads it) with the following variables (example):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/chatify
JWT_SECRET=your_jwt_secret_here
```

Adjust names/locations to match how your server code reads them. `server.js` in `Backend/src` already uses `dotenv.config()`.

## Install and run (Backend)

1. Open a terminal and go to the backend folder:

```powershell
cd 'd:\Projects\Chatify App\Backend'
```

2. Install dependencies. If you want to use `bcryptjs` (no native build required):

```powershell
npm install bcryptjs
```

If you prefer native `bcrypt` (may require build tools):

```powershell
npm install bcrypt
```

3. Install other dependencies (if any are listed in package.json). If `package.json` is currently empty you may add packages like `express`, `dotenv`, `mongoose`, etc. Example:

```powershell
npm install express dotenv mongoose
```

4. Start the server:

```powershell
node src/server.js
# or, if you use nodemon for development:
npx nodemon src/server.js
```

## Install and run (Frontend)

1. Open a terminal and go to the frontend folder:

```powershell
cd 'd:\Projects\Chatify App\Frontend\Chatify'
```

2. Install dependencies then start dev server:

```powershell
npm install
npm run dev
```

3. `vite` will start a local dev server and print the URL (e.g., http://localhost:5173).

## Using bcrypt vs bcryptjs

- `bcrypt` is a native module that uses C++ bindings and may need compilation during install (node-gyp, Python, Visual Studio Build Tools). It is fast but sometimes hard to install on Windows without build tools.
- `bcryptjs` is a pure JavaScript implementation which is slower but easier to install and works in browsers and Node without native compilation.

Recommendation:
- For server-side password hashing: use `bcrypt` if you can install build tools; otherwise `bcryptjs` is fine.
- Do not rely on client-side hashing for secure storage—perform final hashing and verification on the server.

Example server-side usage (Node):

```js
// using bcryptjs
import bcrypt from 'bcryptjs';

const hash = await bcrypt.hash(password, 10);
const match = await bcrypt.compare(passwordAttempt, hash);
```

## Troubleshooting common install issues

- node-gyp / Visual Studio errors installing `bcrypt` on Windows:
  - Install Visual Studio Build Tools or the `windows-build-tools` package (older approach).
  - Ensure Python is available or install `windows-build-tools` which sets up Python and the VC++ toolchain.

- Network/registry errors:
  - Check `npm config get registry`.
  - If behind a corporate proxy, configure npm proxy settings.
  - Try `npm cache clean --force` and re-run install.

- Permission (EACCES) errors:
  - On Windows, run PowerShell as Administrator or fix the folder permissions.

## Notes & next steps
- Your `Backend/package.json` currently has no dependencies. Add required backend packages there so `npm install` in `Backend/` brings them in automatically.
- If you want, I can:
  - Add a simple `package.json` with typical backend dependencies (`express`, `dotenv`, `mongoose`, `bcryptjs`) and a `start` script.
  - Install `bcryptjs` in the backend and add a tiny test endpoint that hashes a sample password to verify everything works.

---

If you'd like me to create or modify files (e.g., add backend dependencies, add example auth route, or install a package), tell me which step and I'll do it and run a quick verification.
