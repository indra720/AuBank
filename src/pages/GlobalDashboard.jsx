import { useState } from "react";

function GlobalDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      
      {/* 1. TOP HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-orange-600 tracking-tight">
            AU Video Banking
          </div>
          <div className="hidden sm:block text-sm text-gray-500 font-medium border-l border-gray-200 pl-4">
            Super Admin Console
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:relative md:block w-48 sm:w-64">
            <input
              type="text"
              placeholder="Search across system..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Active
            </span>
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-md">
              VA
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* 2. SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-4">Navigation Menu</h2>
            <ul className="flex flex-col space-y-1">
              {[
                { label: "Global Overview", active: true },
                { label: "User Management" },
                { label: "Branch Analytics" },
                { label: "Security Protocols" },
                { label: "Financial Reports" },
                { label: "System Logs" },
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-2.5 text-sm rounded-md transition-all ${
                      item.active
                        ? "bg-orange-50 text-orange-700 font-medium"
                        : "text-gray-700 hover:bg-gray-100 font-medium"
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
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Global Dashboard
            </h1>
            <div className="flex gap-2">
              {["Live", "24h", "7D", "30D"].map((range) => (
                <button
                  key={range}
                  className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    range === "Live"
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20"
                      : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* KPI Cards Grid - MATCHING CUSTOMER DASHBOARD STYLE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <KPICard label="ACTIVE VIDEO SESSIONS" value="1,284" trend="↑ 12%" isUp={true} />
            <KPICard label="KYC SUCCESS RATE" value="98.2%" trend="↑ 0.5%" isUp={true} />
            <KPICard label="NEW REGISTRATIONS" value="452" trend="↑ 8%" isUp={true} />
            <KPICard label="TRANSACTION VOL (24H)" value="₹4.2 Cr" trend="↓ 2%" isUp={false} />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
              <h2 className="font-semibold text-lg text-gray-900 mb-6 tracking-tight">Video Call Volume Trend</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-between px-4 pt-8 gap-1.5 md:gap-2">
                {[30, 45, 60, 75, 55, 70, 80, 65, 85, 50, 75, 90, 40].map((val, i) => (
                  <div key={i} className="flex-1 bg-orange-400 rounded-t-sm hover:bg-orange-500 transition-colors" style={{ height: `${val}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mt-4 px-1 font-medium">
                <span>08:00 AM</span><span>12:00 PM</span><span>04:00 PM</span><span>08:00 PM</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-lg text-gray-900 mb-6 tracking-tight">Regional Performance</h2>
              <div className="space-y-6">
                {[
                  { zone: "North Zone", score: 4.8, color: "bg-green-500" },
                  { zone: "South Zone", score: 4.9, color: "bg-green-500" },
                  { zone: "West Zone", score: 4.5, color: "bg-orange-500" },
                  { zone: "Central Zone", score: 4.7, color: "bg-green-500" },
                ].map((region, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-600">{region.zone}</span>
                      <span className="text-gray-900 font-bold">{region.score} ★</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${region.color} transition-all duration-1000`} style={{ width: `${region.score * 20}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/20">
                <h2 className="font-semibold text-lg text-gray-900 tracking-tight">Active Agents Status</h2>
                <a href="#" className="text-orange-600 text-sm hover:underline font-medium">VIEW ALL →</a>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { name: "Rahul Sharma", cluster: "Jaipur-Central", status: "INCALL", time: "12:45 min", type: 'green' },
                  { name: "Priya Verma", cluster: "Mumbai-West", status: "AVAILABLE", time: "—", type: 'blue' },
                  { name: "Arjun Mehra", cluster: "Delhi NCR", status: "INCALL", time: "04:22 min", type: 'green' },
                ].map((agent, i) => (
                  <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{agent.name}</div>
                      <div className="text-sm text-gray-500 font-medium">{agent.cluster}</div>
                    </div>
                    <div className="text-right flex items-center justify-between sm:block">
                      <span className={`inline-block px-3 py-1 text-[11px] font-medium rounded-full ${
                        agent.type === "green" ? "bg-green-100 text-green-800" : 
                        agent.type === "blue" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {agent.status}
                      </span>
                      <div className="text-xs text-gray-400 font-medium sm:mt-1">{agent.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
              <h2 className="font-semibold text-lg text-gray-900 tracking-tight">Security & Compliance Health</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">✓</div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Biometric Authentication</p>
                        <p className="text-xs text-gray-500 font-medium">Active & Enforced</p>
                      </div>
                   </div>
                   <div className="w-10 h-5 bg-orange-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
                </div>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0 text-xl font-bold">!</div>
                    <div>
                      <div className="font-bold text-red-800 text-sm tracking-tight uppercase">Suspicious Activity Detected</div>
                      <div className="text-xs text-red-700 mt-1 font-medium leading-relaxed">3 failed MFA attempts detected from unauthorized IP segment in Kolkata.</div>
                    </div>
                  </div>
                  <button className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-900/10 active:scale-95 uppercase tracking-widest">
                    INVESTIGATE NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function KPICard({ label, value, trend, isUp }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
      <div className="text-sm text-gray-600 font-medium flex items-center gap-2">
        {label} <span className={`${isUp ? 'text-green-600' : 'text-red-600'} text-xs font-bold uppercase`}>{trend}</span>
      </div>
      <div className="text-3xl font-bold mt-2 text-gray-900 tracking-tight">{value}</div>
    </div>
  );
}

export default GlobalDashboard;
