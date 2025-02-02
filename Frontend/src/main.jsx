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

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {PostProvider} from './context/userContext.jsx'
import { ToastContainer } from 'react-toastify';
import SavedPosts from "./routes/SavedPosts.jsx";
import ProtectedRoute from "./protected/ProtectedRoute.jsx";
import MyBlog from "./routes/MyBlog.jsx";
import PostUpdate from "./routes/PostUpdate.jsx";

const queryClient = new QueryClient()

// Import your Publishable Key


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<MainLayout/>}>
      <Route path="/" element={
          <HomePage/>
      } />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/:slug" element={
          <SinglePostPage/>
      } />
      <Route path="/write" element={
        <ProtectedRoute>
          <Write />
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        <LoginPage/>
      } />
      <Route path="/register" element={
        <RegisterPage />
      } />
      <Route path="/saved-posts" element={
        <ProtectedRoute>
          <SavedPosts />
        </ProtectedRoute>
      } />
      <Route path="/my-blog" element={
        <ProtectedRoute>
          <MyBlog />
        </ProtectedRoute>
      } />
      <Route path="/update/:slug" element={
        <ProtectedRoute>
          <PostUpdate />
        </ProtectedRoute>
      } />
     
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <PostProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" />
        </PostProvider>
      </QueryClientProvider>
  </StrictMode>
);


