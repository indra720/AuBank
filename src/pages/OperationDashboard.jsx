// src/pages/OperationDashboard.jsx
import { useState } from 'react';

function OperationDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="relative w-full md:max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search across transactions..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden xl:flex gap-6 text-sm font-medium">
            <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1">Overview</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Requests</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Audit</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Compliance</a>
          </nav>
          <button className="text-gray-600 hover:text-orange-600 hidden sm:block">
            <RefreshIcon />
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* 2. SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">Menu Overview</h2>
            <ul className="flex flex-col space-y-1">
              {[
                { label: 'Overview', active: true },
                { label: 'Service Requests (124)', count: true },
                { label: 'Transaction Audit' },
                { label: 'Compliance Alerts (12)' },
                { label: 'System Health' },
                { label: 'Team Management' },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2.5 text-sm rounded-md transition-all ${
                      item.active
                        ? 'bg-orange-50 text-orange-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Operational Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time oversight of critical banking backend processes.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                Export Report
              </button>
              <button className="px-4 py-1.5 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 flex items-center gap-2">
                <RefreshIcon size="w-4 h-4" /> Refresh Data
              </button>
            </div>
          </div>

          {/* KPI Cards Grid - MATCHING CUSTOMER DASHBOARD STYLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <KPICard label="PENDING REQUESTS" value="1,284" trend="↑ 5.2%" isUp={true} />
            <KPICard label="COMPLIANCE ALERTS" value="12" trend="⚠️ High Priority" isUp={false} isAlert />
            <KPICard label="SYSTEM UPTIME" value="99.98%" trend="Stable" isUp={true} />
            <KPICard label="AVG PROCESS TIME" value="4.2 min" trend="↓ 32%" isUp={true} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Active Service Requests */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                <h2 className="font-semibold text-lg text-gray-900">Active Service Requests</h2>
                <a href="#" className="text-orange-600 text-sm hover:underline">View All →</a>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { id: 'REQ82910', cat: 'KYC Update', acc: '....4829', wait: '12 min', status: 'IN REVIEW', color: 'bg-yellow-100 text-yellow-800' },
                  { id: 'REQ82909', cat: 'Fund Transfer', acc: '....1102', wait: '5 min', status: 'ASSIGNED', color: 'bg-blue-100 text-blue-800' },
                  { id: 'REQ82908', cat: 'Card Block', acc: '....9934', wait: '2 min', status: 'URGENT', color: 'bg-red-100 text-red-800' },
                  { id: 'REQ82907', cat: 'Loan Approval', acc: '....5521', wait: '45 min', status: 'QUEUED', color: 'bg-gray-100 text-gray-800' },
                ].map((req, i) => (
                  <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="font-medium text-gray-900">{req.id}</div>
                      <div className="text-sm text-gray-500">{req.cat} • {req.acc}</div>
                    </div>
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                      <div className="text-xs text-gray-400">{req.wait}</div>
                      <span className={`inline-block px-3 py-1 text-[11px] font-medium rounded-full mt-1 ${req.color}`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Health */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-lg mb-6 flex justify-between items-center text-gray-900">
                System Node Health <span className="text-green-600 text-xs font-medium uppercase">Online</span>
              </h2>
              <div className="space-y-6">
                {[
                  { name: 'Core Engine', load: 82, color: 'bg-orange-500' },
                  { name: 'API Gateway', load: 45, color: 'bg-green-500' },
                  { name: 'Image Server', load: 28, color: 'bg-green-500' },
                  { name: 'Database Cluster', load: 91, color: 'bg-red-500' },
                ].map((node, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{node.name}</span>
                      <span className="font-medium">{node.load}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${node.color} transition-all duration-1000`} style={{ width: `${node.load}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-8 w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-black transition-colors">
                Run System Diagnostics
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function KPICard({ label, value, trend, isUp, isAlert }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
      <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
        {label} <span className={`${isAlert ? 'text-red-600' : 'text-green-600'} text-xs font-bold`}>{trend}</span>
      </div>
      <div className="text-3xl font-bold mt-2 text-gray-900 tracking-tight">{value}</div>
    </div>
  );
}

const RefreshIcon = ({ size = "w-6 h-6" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

export default OperationDashboard;
