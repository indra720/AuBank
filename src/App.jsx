import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import OperationDashboard from "./pages/OperationDashboard";
import GlobalDashboard from "./pages/GlobalDashboard";
import Customer from "./pages/CustomerDashboard";
import InternalView from "./pages/Internalview";
import PerformanceOverview from "./pages/Performence";
import UserManagement from "./pages/UserManagement";
import SystemHealth from "./pages/SystemHealth&Security";
import GeneratedPage from "./pages/GeneratedPage";
import BranchManagement from "./pages/BranchManageMent";
import AgentPerformanceAnalytics from "./pages/AgentPerformanceAnalytics";
import ComplianceRiskDash from "./pages/Compliance&RiskDashbaord";
import ServiceRequest from "./pages/ServiceRequestCatlog";
import ServiceRequestTracking from "./pages/ServiceReuestTracking";
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
      <Routes>
        {/* Public Routes for Login and Registration */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Authenticated Routes with DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<VideoKyc/>} />
          <Route path="videokyc" element={<VideoKyc/>} />
          <Route path="agentvideokyc" element={<AgentVideokyc/>} />
          <Route path="operation" element={<OperationDashboard />} />
          <Route path="global" element={<GlobalDashboard />} />
          <Route path="customer" element={<Customer />} />
          <Route path="internal" element={<InternalView/>} />
          <Route path="performance" element={<PerformanceOverview/>} />
          <Route path="usermanagement" element={<UserManagement/>} />
          <Route path="systemhealth" element={<SystemHealth/>} />
          <Route path="generatedpage" element={<GeneratedPage/>} />
          <Route path="branchmanagement" element={<BranchManagement/>} />
          <Route path="AgentPerformance" element={<AgentPerformanceAnalytics/>} />
          <Route path="compliancerisk" element={<ComplianceRiskDash/>} />
          <Route path="servicerequest" element={<ServiceRequest/>} />
          <Route path="servicetracking" element={<ServiceRequestTracking/>} />
          <Route path="serviceform" element={<ServiceForm/>} />
          <Route path="wealthportal" element={<WealthManagement/>} />
          <Route path="internalaudit" element={<InternalAudit/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
