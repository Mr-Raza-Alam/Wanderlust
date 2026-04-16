# 🌍 WanderLust

> **An Airbnb-inspired full-stack property rental marketplace** — built for tourists, home-owners, and hotel-owners to discover, rent, and manage unique accommodations around the world.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-46E3B7?logo=render&logoColor=white)](https://wa-wlh4.onrender.com)
![NodeJS](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-000000?logo=mapbox&logoColor=white)

---

## 📖 About

WanderLust is a feature-rich, full-stack web application built on the **MEN stack** (MongoDB, Express.js, Node.js) with EJS templating. It allows users to browse travel accommodations, list their own properties, leave reviews, and explore locations on an interactive map — all styled with an **Airbnb-inspired design system**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, Vanilla CSS, JavaScript, EJS, EJS-Mate, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (via Mongoose ORM) |
| **Authentication** | Passport.js (Local Strategy + Passport-Local-Mongoose) |
| **Image Storage** | Cloudinary (via Multer) |
| **Maps** | Mapbox GL JS + Mapbox Geocoder |
| **Session Store** | connect-mongo (MongoDB-backed sessions) |
| **Security** | Helmet, express-rate-limit, Joi schema validation |
| **Performance** | compression (gzip responses) |

---

## ✨ Features

- **User Authentication** — Secure signup/login/logout with Passport.js and session management
- **Full CRUD** — Create, read, update, and delete property listings with authorization checks
- **Owner-only Controls** — Edit/Delete buttons only visible to the listing owner; review delete only visible to review author
- **Image Uploads** — Upload property photos directly to Cloudinary with file-type validation
- **Interactive Maps** — Visualize property locations on an embedded Mapbox map with geocoding
- **Review System** — Star-rated reviews with comments, tied to authenticated users
- **Search** — GET-based search by destination (bookmarkable, shareable URLs)
- **Flash Messages** — Contextual success/error/update notifications
- **Airbnb-Inspired UI** — Clean white theme, `#FF385C` red accent, responsive grid layout, sticky price card on listing detail pages

---

## 🔐 Security Highlights

- `helmet` — adds HTTP security headers (X-Frame-Options, HSTS, etc.)
- `express-rate-limit` — brute-force protection on login/signup (max 15 attempts per 15 min)
- MongoDB-backed sessions via `connect-mongo` (survives server restarts)
- Authorization middleware on all mutating routes (no unauthorized edits/deletes)
- Sensitive listing data is **not** exposed in client-side HTML (only `geometry` + `title` sent to Mapbox)

---

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mr-Raza-Alam/Wanderlust.git
   cd Wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with:
   ```env
   ATLASDB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/Wanderlust
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_public_token
   ```

4. **Start the server**
   ```bash
   npm start
   # Server runs on http://localhost:3300
   ```

---

## 📁 Project Structure

```
Full-Stack-Project/
├── backend/
│   ├── app.js              # Express app — middleware, routes, security
│   ├── Controllers/        # Route handler logic (listings, reviews, users)
│   ├── Routes/             # Express routers
│   └── utils/              # Custom error class, async wrapper
├── database/
│   └── models/             # Mongoose schemas (Listing, Review, User)
├── frontend/
│   ├── public/
│   │   ├── css/style.css   # Custom Airbnb-inspired stylesheet
│   │   └── JS/             # Client-side JS (map.js, validation)
│   └── views/
│       ├── layouts/        # EJS-Mate boilerplate
│       ├── includes/       # Navbar, footer, flash messages
│       ├── listings/       # All listing pages (home, list, show, new, edit, error)
│       └── users/          # Login & signup pages
├── server.js               # Entry point
└── package.json
```

---

## 🚀 Deployment

This project is deployed on **Render** with the following configuration:

- **Build Command:** `npm install`
- **Start Command:** `npm start` (`node server.js`)
- **Environment Variables:** Set via Render dashboard (same as `.env`)
- **Database:** MongoDB Atlas (network access set to `0.0.0.0/0` for Render)

---

## 📝 Recent Improvements (April 2026)

| Category | What Changed |
|---|---|
| **Performance** | Gzip compression via `compression`; Mapbox assets only loaded on pages that use maps |
| **Security** | Added `helmet` security headers; `express-rate-limit` on auth routes; data leak fix on show page |
| **Bug Fixes** | Fixed review deletion (was only dereferenced, not deleted); fixed `Date.now` timestamp bug |
| **UX** | Airbnb-inspired theme with red `#FF385C` accent; improved listing card grid; sticky price card; redesigned edit form |
| **Validation** | `required` on Country field; `type="number"` on Price; `accept=".jpg,.jpeg,.png"` on file inputs |
| **Auth UI** | Edit/Delete buttons now strictly owner-only; review delete button strictly author-only |
| **Search** | Converted from POST to GET — results are now bookmarkable and shareable |
| **Session** | MongoDB-backed sessions via `connect-mongo` — survives Render restarts; local DB fallback for dev |

---

## 👨‍💻 Author

**Raza Alam** — B.Tech Student, Assam University, Silchar
- GitHub: [@Mr-Raza-Alam](https://github.com/Mr-Raza-Alam)
- LinkedIn: [Raza Alam](https://linkedin.com/in/raza-btech27)
