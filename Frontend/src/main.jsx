import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import Write from "./routes/Write.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import HomePage from "./routes/HomePage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx"
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import {ClerkProvider} from '@clerk/clerk-react'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {PostProvider} from './context/userContext.jsx'
import { ToastContainer } from 'react-toastify';
import SavedPosts from "./routes/SavedPosts.jsx";
import ProtectedRoute from "./protected/ProtectedRoute.jsx";

const queryClient = new QueryClient()

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<MainLayout/>}>
      <Route path="/" element={
          <HomePage/>
      } />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/:slug" element={<SinglePostPage/>} />
      <Route path="/write" element={
        <ProtectedRoute>
          <Write />
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        <LoginPage/>
      } />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/saved-posts" element={
        <ProtectedRoute>
          <SavedPosts />
        </ProtectedRoute>
      } />
     
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <QueryClientProvider client={queryClient}>
        <PostProvider>

    <RouterProvider router={router} />
        </PostProvider>
    <ToastContainer position="top-right" />
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>
);
