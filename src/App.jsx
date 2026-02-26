import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
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

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
