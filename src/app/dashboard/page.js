"use client";

import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { Navbar, MainContent } from "@/app/page-components/dashboard-compoents";

export default function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} onLogout={logout} />
        <MainContent user={user} />
      </div>
    </ProtectedRoute>
  );
}
