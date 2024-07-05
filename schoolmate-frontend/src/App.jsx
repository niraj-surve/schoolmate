import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Gallery from "./pages/Gallery/Gallery";
import Login from "./pages/Login/Login";
import Faculty from "./pages/Faculty/Faculty";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role");
    setRole(role);
    setAuthenticated(!!jwtToken);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        authenticated && role === "admin" ? (
          <Navigate to="/dashboard/admin" />
        ) : authenticated && role === "staff" ? (
          <Navigate to="/dashboard/staff" />
        ) : authenticated && role === "principal" ? (
          <Navigate to="/dashboard/principal" />
        ) : (
          <>
            <Navbar />
            <Outlet />
            <Footer />
          </>
        ),
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "faculty", element: <Faculty /> },
        { path: "contact", element: <Contact /> },
        { path: "gallery", element: <Gallery /> },
        {
          path: "login",
          element: <Login setAuthenticated={setAuthenticated} />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/dashboard/admin/*",
      element: authenticated ? (
        <DashboardLayout setAuthenticated={setAuthenticated} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/dashboard/staff/*",
      element: authenticated ? (
        <DashboardLayout setAuthenticated={setAuthenticated} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/dashboard/principal/*",
      element: authenticated ? (
        <DashboardLayout setAuthenticated={setAuthenticated} />
      ) : (
        <Navigate to="/" />
      ),
    },
  ]);

  return (
    <div className="w-full">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
