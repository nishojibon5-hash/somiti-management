import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddMember from "./pages/AddMember";
import MembersList from "./pages/MembersList";
import MemberProfile from "./pages/MemberProfile";
import EditMember from "./pages/EditMember";
import DailyCollection from "./pages/DailyCollection";
import CollectionsList from "./pages/CollectionsList";
import MonthlyCollections from "./pages/MonthlyCollections";
import BackupRestore from "./pages/BackupRestore";
import AdminDashboard from "./pages/AdminDashboard";
import SystemManagement from "./pages/SystemManagement";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        basename={
          window.location.pathname.includes("/somiti-management")
            ? "/somiti-management"
            : ""
        }
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-member" element={<AddMember />} />
          <Route path="/members" element={<MembersList />} />
          <Route path="/member/:memberID" element={<MemberProfile />} />
          <Route path="/edit-member/:memberID" element={<EditMember />} />
          <Route path="/daily-collection" element={<DailyCollection />} />
          <Route path="/collections" element={<CollectionsList />} />
          <Route path="/monthly-collections" element={<MonthlyCollections />} />
          <Route path="/backup-restore" element={<BackupRestore />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/system-management" element={<SystemManagement />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
