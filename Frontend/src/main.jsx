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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<MainLayout/>}>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostListPage />} />
      <Route path="/:slug" element={<SinglePostPage/>} />
      <Route path="/write" element={<Write />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:slug" element={<RegisterPage />} />
     
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
