# 🌍 Wanderlust (First Major Project)

**A full-stack web application for tourists, home-owners, and hotel-owners to discover, rent, and manage accommodations.**

![NodeJS](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?logo=ejs&logoColor=black)

## 📖 About
This is my very first major full-stack project building an Airbnb-like marketplace. It facilitates users to browse travel accommodations, and allows property owners to list their properties dynamically.

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript, EJS (Embedded JavaScript templates), EJS-Mate
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** Passport.js (Local Strategy, Passport-Local-Mongoose)
- **Utilities:** Cloudinary (Image Uploads & Storage), Mapbox SDK (Geocoding/Maps), Connect-Flash (Session notifications), Joi (Schema validation)

## ✨ Features
- **User Authentication:** Secure login and registration using Passport.js.
- **Listing Management:** Create, read, update, and delete (CRUD) property listings.
- **Image Uploads:** Upload property images securely to Cloudinary.
- **Interactive Maps:** Discover property locations via Mapbox integration.
- **Review System:** Users can leave ratings and reviews on properties.

## ⚙️ Setup Instructions
1. Clone the repository and run `npm install`.
2. Create a `.env` file referencing variables like:
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`
   - `MAP_TOKEN`
   - `SECRET`
   - `ATLASDB_URL`
3. Start the server using `node index.js`.
