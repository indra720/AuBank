// src/pages/Internalview.jsx
import { useState } from 'react';
import {Bell} from 'lucide-react'

function InternalView() {
  const auditEntries = [
    {
      time: "10:45:22 AM",
      date: "24 Oct 2023",
      session: "evb-Aq",
      agent: "Rohan Sharma",
      action: "Liveness Fail",
      severity: "CRITICAL",
      reason: "Document mismatch vs face scan",
      color: "red",
    },
    {
      time: "10:32:15 AM",
      date: "24 Oct 2023",
      session: "pvb-ZP",
      agent: "Ananya Iyer",
      action: "IP Anomaly",
      severity: "HIGH RISK",
      reason: "Login from blacklisted region",
      color: "orange",
    },
    {
      time: "09:58:04 AM",
      date: "24 Oct 2023",
      session: "evb-LK",
      agent: "Vikram Seth",
      action: "Manual Override",
      severity: "WARNING",
      reason: "Agent manually bypassed blurry photo",
      color: "yellow",
    },
    {
      time: "09:12:45 AM",
      date: "24 Oct 2023",
      session: "evb-XC",
      agent: "Sneha Kapoor",
      action: "System Health",
      severity: "LOW",
      reason: "High latency during recording",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Top Bar - Original Look */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-orange-600">AU BANK</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search Transaction ID or Agent..."
              className="w-64 pl-9 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            {/* Global Style Notification Icon */}
            <button className="text-gray-500 hover:text-orange-600 relative">
              {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg> */}
               <Bell size={20} />
              <span className="absolute top-0 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-medium">
              AM
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar - Desktop & Mobile (Stacked, No Hamburger) */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">AUDIT CONTROL</h3>
            <ul className="space-y-1 mb-8">
              {[
                { label: 'Dashboard' },
                { label: 'Transaction Logs', active: true },
                { label: 'Compliance Flags' },
                { label: 'User Activity Audit' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className={`block px-4 py-2.5 text-sm rounded-md ${
                      item.active ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">OPERATIONS</h3>
            <ul className="space-y-1">
              {['Agent Performance', 'Settings'].map((item) => (
                <li key={item}>
                  <a href="#" className="block px-4 py-2.5 text-sm text-gray-700 rounded-md hover:bg-gray-100">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Transaction & Activity Audit</h1>
            <p className="text-gray-600 mt-1">
              Reviewing <strong>1,284</strong> sessions and operations from the last 24 hours.
            </p>
          </div>

          {/* Filters & Export */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {['24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  className={`px-4 py-1.5 text-sm rounded-md border ${
                    range === '24h' ? 'bg-orange-600 text-white border-orange-600' : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {range}
                </button>
              ))}
              <button className="px-4 py-1.5 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Advanced Filters
              </button>
            </div>

            <button className="px-5 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 flex items-center justify-center gap-2">
              Export Audit Report
            </button>
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm flex-1 sm:flex-none">
              <option>Agent Status: All Agents</option>
            </select>
            <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm flex-1 sm:flex-none">
              <option>Severity Level: All Severities</option>
            </select>
            <select className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm flex-1 sm:flex-none">
              <option>Department: KYC Verification</option>
            </select>
          </div>

          {/* Master Audit Log Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="p-4 sm:p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Master Audit Log</h2>
              <div className="flex items-center gap-3">
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TIMESTAMP</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SESSION ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AGENT NAME</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTION TYPE</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEVERITY</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FLAG REASON</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {auditEntries.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.time}<br />
                        <span className="text-xs text-gray-500">{entry.date}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{entry.session}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.agent}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{entry.action}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          entry.color === 'red'    ? 'bg-red-100 text-red-800' :
                          entry.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                          entry.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {entry.severity}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">{entry.reason}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button className="text-orange-600 hover:text-orange-800 font-medium">REVIEW</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RESPONSIVE PAGINATION - Fixed Look */}
            <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
              <div className="text-xs font-medium">Showing 1-10 of 1,284 entries</div>
              <div className="flex flex-wrap justify-center gap-1.5">
                <button className="px-2 py-1 border rounded hover:bg-gray-50">←</button>
                <button className="w-8 h-8 bg-orange-600 text-white rounded">1</button>
                <button className="w-8 h-8 border rounded hover:bg-gray-50">2</button>
                <button className="w-8 h-8 border rounded hover:bg-gray-50">3</button>
                <button className="px-2 py-1 border rounded hover:bg-gray-50">→</button>
              </div>
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Health */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-lg mb-4 flex items-center justify-between">
                Compliance Health <span className="text-green-600 text-sm">REAL-TIME</span>
              </h2>
              <div className="h-48 bg-gray-50 rounded flex items-center justify-center text-gray-500 text-sm">
                [Compliance Gauges / Donut Chart Placeholder]
              </div>
            </div>

            {/* Recent User Activity Audit - RESPONSIVE REPRESENTATION */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="font-semibold text-lg">Recent User Activity Audit</h2>
                <a href="#" className="text-orange-600 text-sm hover:underline">View All Trails →</a>
              </div>
              <div className="space-y-4 text-sm">
                {[
                  { title: "Critical Liveness Failure", sub: "Session evb-Aq • Rohan Sharma • 10:45 AM", status: "CRITICAL", color: "text-red-600" },
                  { title: "High-Risk IP Anomaly", sub: "Session pvb-ZP • Ananya Iyer • 10:32 AM", status: "HIGH", color: "text-orange-600" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between border-b border-gray-50 pb-3 gap-2">
                    <div>
                      <span className={`font-medium ${item.color === 'text-red-600' ? 'text-red-700' : 'text-gray-900'}`}>{item.title}</span>
                      <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                    </div>
                    <span className={`font-bold text-xs ${item.color} self-start sm:self-center`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default InternalView;
