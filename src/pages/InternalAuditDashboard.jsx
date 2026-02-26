// App.jsx
import { useState } from 'react'
import {
  MdDashboard,
  MdArticle,
  MdSecurity,
  MdPeople,
  MdAssessment,
  MdSettings,
  MdSearch,
  MdNotifications,
  MdRefresh,
  MdMoreVert,
  MdFilterList,
  MdDownload,
  MdChevronLeft,
  MdChevronRight,
  MdError,
  MdWarning,
  MdInfo,
  MdCheckCircle,
  MdSync,
} from 'react-icons/md'

function InternalAudit() {
  const auditEntries = [
    {
      txId: "#TXN-842910",
      agent: "JD John Doe",
      action: "KYC",
      severity: "CRITICAL",
      reason: "Missing secondary document proof",
      time: "2 mins ago",
      color: "red",
    },
    {
      txId: "#TXN-842911",
      agent: "RK Rohan Kumar",
      action: "Transfer",
      severity: "HIGH RISK",
      reason: "Large volume cross-border mismatch",
      time: "15 mins ago",
      color: "orange",
    },
    {
      txId: "#TXN-842915",
      agent: "SL Sara Lee",
      action: "Signature",
      severity: "WARNING",
      reason: "Low resolution image scan",
      time: "1 hour ago",
      color: "yellow",
    },
    {
      txId: "#TXN-842918",
      agent: "JD John Doe",
      action: "KYC",
      severity: "LOW",
      reason: "Standard audit trail check",
      time: "2 hours ago",
      color: "green",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AU
            </div>
            <div className="text-xl font-bold text-gray-900">AU Bank</div>
          </div>

          <div className="relative hidden lg:block w-80">
            <input
              type="text"
              placeholder="Search by Transaction ID or Agent"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
              AM
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">Audit Manager</div>
              <div className="text-xs text-gray-500">Backend Operations</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Sidebar – vertical list */}
        <aside className="w-full lg:w-64 bg-purple-800 text-white border-b lg:border-b-0 lg:border-r border-purple-900 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-purple-300 mb-6">
              INTERNAL AUDIT OPS
            </h3>

            <nav className="flex flex-col gap-1.5">
              {[
                { label: 'Audit Dashboard', icon: MdDashboard, active: true },
                { label: 'Audit Log', icon: MdArticle },
                { label: 'Compliance Hub', icon: MdSecurity },
                { label: 'Agent Performance', icon: MdPeople },
                { label: 'Departments', icon: MdAssessment },
                { label: 'Risk Reports', icon: MdAssessment },
                { label: 'System Settings', icon: MdSettings },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all
                    ${item.active
                      ? 'bg-purple-700 text-white shadow-lg shadow-purple-900/20'
                      : 'text-purple-100 hover:bg-purple-700/60'
                    }
                  `}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-purple-600/40">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20 transition-all">
                <MdDownload size={20} />
                EXPORT DATA
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Audit Dashboard
            </h1>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <MdRefresh size={18} /> Refresh
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { title: "Compliance Health", value: "98.42%", change: "+2.4%", color: "green", icon: MdCheckCircle },
              { title: "Active Sessions", value: "1,482", change: "Live", color: "blue", icon: MdSync },
              { title: "Critical Flags", value: "14", change: "Attention", color: "red", icon: MdError },
              { title: "Audit Velocity", value: "45/min", change: "Last 24h", color: "purple", icon: MdAssessment },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{kpi.title}</div>
                  <kpi.icon size={24} className={`text-${kpi.color}-600 opacity-80`} />
                </div>
                <div className="text-3xl font-black text-gray-900">{kpi.value}</div>
                <div className={`text-xs font-bold mt-1 ${kpi.change.includes('+') ? 'text-green-600' : 'text-gray-500'}`}>
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Date Range</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none transition-all">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 24 Hours</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Agent Status</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none transition-all">
                  <option>All Agents</option>
                  <option>Active</option>
                  <option>Idle</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Department</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none transition-all">
                  <option>Backend Operations</option>
                  <option>Customer Support</option>
                  <option>KYC</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-orange-900/20 transition-all">
                <MdFilterList size={18} />
                APPLY FILTERS
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg text-sm font-bold transition-all">
                CLEAR
              </button>
            </div>
          </div>

          {/* Master Audit Log */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-semibold text-xl">Master Audit Log</h2>
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded hover:bg-gray-100">
                  <MdRefresh size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded hover:bg-gray-100">
                  <MdMoreVert size={20} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">TRANSACTION ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">AGENT NAME</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">ACTION TYPE</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">SEVERITY</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">FLAG REASON</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">TIMESTAMP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {auditEntries.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-5 font-medium text-gray-900">{entry.txId}</td>
                      <td className="px-6 py-5">{entry.agent}</td>
                      <td className="px-6 py-5 text-gray-700">{entry.action}</td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          entry.color === 'red'    ? 'bg-red-100 text-red-800' :
                          entry.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                          entry.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {entry.severity}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 max-w-xs truncate">{entry.reason}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">{entry.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-gray-600">
              <div>Showing 1-10 of 1,284 audits</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                  <MdChevronLeft size={18} />
                </button>
                <button className="px-4 py-1 bg-orange-600 text-white rounded">1</button>
                <button className="px-4 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">
                  <MdChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default InternalAudit;