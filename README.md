# <a name="Title">MERN Blogging Site</a>

![Blogging Site Mockup](/frontend/public/Mockup-Template.png)

A fully responsive and feature-rich blogging platform built with the MERN stack. This project provides users with an engaging experience for reading, writing, and managing blogs while ensuring smooth performance and modern design.

## Features

### General Features

- **Homepage:** Displays featured blogs and recent posts for easy exploration.
- **Dynamic Blog Listings:** Infinite scrolling for smooth navigation.
- **Interactive Blog Pages:** Users can save blogs, leave comments (requires login), and sort blogs by:
  - Trending
  - Newest
  - Oldest
  - Popular
- **Category View:** Explore blogs by specific categories.

### User Features

- **Authentication:**
  - Login/Signup via username and password or Google authentication.
- **Blog Management:**
  - Write, update, and delete blogs.
  - Add images and videos to blogs.
  - View personal written blogs.
- **Saved Blogs:** View and manage saved blogs.
- **Profile Management:**
  - Update profile information, including title and profile image.
  - Connect social accounts.
- **Comment Management:**
  - Add comments to blogs.
  - Delete personal comments on any blog.

### Admin Features

- Feature or unfeature blogs.
- Delete any blog or comment.
- Moderate platform content.

### Performance and Optimizations

- Optimistic updates for creating, saving, updating, and deleting blogs and comments.
- Eye-catching and fully responsive UI.
- Image and video uploads handled via **ImageKit**.

## Technologies Used

- **Frontend:** React, TailwindCSS
- **State Management:** Zustand
- **Data Fetching:** TanStack/React-Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase (Google Authentication)
- **Media Management:** ImageKit
- **Infinite Scrolling:** React-Infinite-Scroll-Component

## Live Demo

[Visit the Blogging Site](https://ahmed-bloggify.vercel.app/)

## Repository

[GitHub Repository](https://github.com/Ahmed-Abbasi-Official/Blogging-APP)

## Installation and Setup

To run the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Huzaifa-Khan-Official/Blogging-Site.git
   cd Blogging-Site
   ```

2. **Install Dependencies: (For Frontend)**

   ```bash
   cd .\frontend\
   npm install -f
   cd client && npm install
   ```

3. **Install Dependencies: (For Backend)**

   ```bash
   cd .\backend\
   npm install
   cd client && npm install
   ```

4. **Environment Variables: (For Frontend)**
   Create a `.env` file in the frontend directory and add the following:

   ```env
   VITE_IK_URL_ENDPOINT=<your-imagekit-url-endpoint>
   VITE_IK_PUBLIC_KEY=<your-imagekit-public-key>

   VITE_FIREBASE_API_KEY=<your-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
   VITE_FIREBASE_APP_ID=<your-firebase-app-id>

   VITE_API_URL=<your-locally/deployed-server-url>

   MONGO_URI=<your-mongodb-uri>

   IMAGEKIT_URL_ENDPOINT=<your-imagekit-url-endpoint>
   IMAGEKIT_PUBLIC_KEY=<your-imagekit-public-key>
   IMAGEKIT_PRIVATE_KEY=<your-imagekit-private-key>
   ```

5. **Environment Variables: (For Backend)**
   Create a `.env` file in the frontend directory and add the following:

   ```env
   MONGO_DB_URI=<your-mongodb-uri>

   PORT=3000

   JWT_SECRET_KEY=<your-jwt-secret-key>

   IK_URL_ENDPOINT=<your-imagekit-url-endpoint>
   IK_PUBLIC_KEY=<your-imagekit-public-key>
   IK_PRIVATE_KEY=<your-imagekit-private-key>

   AllowedOrigin1=<locally-running-host(frotend)-url>
   AllowedOrigin2=<deployed-host(frontend)-url>
   ```

6. **Start the Application:**

   - Start the backend server:
     ```bash
     cd .\backend\
     npm run dev
     ```
   - Start the frontend:
     ```bash
     cd .\frontend\
     npm run dev
     ```

7. **Access the Application:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Contribution

Contributions are welcome! Please fork this repository and submit a pull request with your enhancements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).
