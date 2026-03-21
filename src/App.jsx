import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import DashboardLayout from "./components/DashboardLayout";
import OperationDashboard from "./pages/OperationDashboard";
import GlobalDashboard from "./pages/GlobalDashboard";
import Customer from "./pages/CustomerDashboard";
import InternalView from "./pages/InternalView";
import PerformanceOverview from "./pages/Performance";
import UserManagement from "./pages/UserManagement";
import SystemHealth from "./pages/SystemHealthSecurity";
import GeneratedPage from "./pages/GeneratedPage";
import BranchManagement from "./pages/BranchManagement";
import AgentPerformanceAnalytics from "./pages/AgentPerformanceAnalytics";
import ComplianceRiskDash from "./pages/ComplianceRiskDashboard";
import ServiceRequest from "./pages/ServiceRequestCatlog";
import ServiceRequestTracking from "./pages/ServiceRequestTracking";
import ServiceForm from "./pages/ServiceRequestForm";
import WealthManagement from "./pages/WealthManagementPortal";
import InternalAudit from "./pages/InternalAuditDashboard";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import VideoKyc from "./pages/VideoKyc";
import AgentVideokyc from "./pages/AgentVideokyc";


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes for Login and Registration */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Authenticated Routes with DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<LoginPage/>} />
          <Route path="videokyc" element={<VideoKyc/>} />
          <Route path="agent-videokyc" element={<AgentVideokyc/>} />
          <Route path="operation" element={<OperationDashboard />} />
          <Route path="global" element={<GlobalDashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="internal" element={<InternalView/>} />
          <Route path="performance" element={<PerformanceOverview/>} />
          <Route path="user-management" element={<UserManagement/>} />
          <Route path="system-health" element={<SystemHealth/>} />
          <Route path="training-portal" element={<GeneratedPage/>} />
          <Route path="branch-management" element={<BranchManagement/>} />
          <Route path="agent-performance" element={<AgentPerformanceAnalytics/>} />
          <Route path="compliance-risk" element={<ComplianceRiskDash/>} />
          <Route path="service-request" element={<ServiceRequest/>} />
          <Route path="service-tracking" element={<ServiceRequestTracking/>} />
          <Route path="service-form" element={<ServiceForm/>} />
          <Route path="wealth-portal" element={<WealthManagement/>} />
          <Route path="internal-audit" element={<InternalAudit/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
