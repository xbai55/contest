import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppShell from "./components/AppShell/AppShell";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Courses from "./pages/Courses/Courses";
import Behavior from "./pages/Behavior/Behavior";
import Warnings from "./pages/Warnings/Warnings";
import Agent from "./pages/Agent/Agent";
import Workflow from "./pages/Workflow/Workflow";
import User from "./pages/User/User";
import Settings from "./pages/Settings/Settings";
import StudentHome from "./pages/StudentHome/StudentHome";
import TeacherHome from "./pages/TeacherHome/TeacherHome";
import CounselorHome from "./pages/CounselorHome/CounselorHome";
import AdminHome from "./pages/AdminHome/AdminHome";
import Toast from "./components/Toast/Toast";
import { routeMeta } from "./data/mockData";

function ProtectedRoute({ children, route }) {
  const { isAuth, permissions } = useAuth();
  if (route === "home") return children;
  if (!isAuth) return <Navigate to="/home" replace />;
  if (permissions && permissions.routes.includes(route)) return children;
  if (permissions) return <Navigate to={`/${permissions.home}`} replace />;
  return <Navigate to="/home" replace />;
}

export default function App() {
  const { isAuth, user } = useAuth();
  const location = useLocation();
  const currentRoute = location.pathname.replace("/", "") || "home";
  const meta = routeMeta[currentRoute] || routeMeta.dashboard;
  const isLoginPage = currentRoute === "login";

  // Sync body data attributes (matches original app.js hydrateUser + renderRoute)
  useEffect(() => {
    document.body.setAttribute("data-page", isLoginPage ? "auth" : "app");
    document.body.setAttribute("data-authenticated", String(isAuth && !isLoginPage));
    document.body.setAttribute("data-role", user?.role || "匿名");
    document.body.classList.toggle("agent-route", currentRoute === "agent" && !isLoginPage);
    return () => {
      document.body.classList.remove("agent-route");
    };
  }, [isAuth, user, currentRoute, isLoginPage]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <AppShell meta={meta} currentRoute={currentRoute}>
              <Routes>
                <Route path="/home" element={<ProtectedRoute route="home"><Home /></ProtectedRoute>} />
                <Route path="/student-home" element={<ProtectedRoute route="student-home"><StudentHome /></ProtectedRoute>} />
                <Route path="/teacher-home" element={<ProtectedRoute route="teacher-home"><TeacherHome /></ProtectedRoute>} />
                <Route path="/counselor-home" element={<ProtectedRoute route="counselor-home"><CounselorHome /></ProtectedRoute>} />
                <Route path="/admin-home" element={<ProtectedRoute route="admin-home"><AdminHome /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute route="dashboard"><Dashboard /></ProtectedRoute>} />
                <Route path="/students" element={<ProtectedRoute route="students"><Students /></ProtectedRoute>} />
                <Route path="/courses" element={<ProtectedRoute route="courses"><Courses /></ProtectedRoute>} />
                <Route path="/behavior" element={<ProtectedRoute route="behavior"><Behavior /></ProtectedRoute>} />
                <Route path="/warnings" element={<ProtectedRoute route="warnings"><Warnings /></ProtectedRoute>} />
                <Route path="/agent" element={<ProtectedRoute route="agent"><Agent /></ProtectedRoute>} />
                <Route path="/workflow" element={<ProtectedRoute route="workflow"><Workflow /></ProtectedRoute>} />
                <Route path="/user" element={<ProtectedRoute route="user"><User /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute route="settings"><Settings /></ProtectedRoute>} />
                <Route path="/" element={<Navigate to={isAuth ? `/${meta.home || "dashboard"}` : "/home"} replace />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
      <Toast />
    </>
  );
}
