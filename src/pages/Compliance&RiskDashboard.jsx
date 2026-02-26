// src/pages/Compliance&RiskDashboard.jsx
import {
  MdDashboard,
  MdReceiptLong,
  MdWarningAmber,
  MdVerifiedUser,
  MdGavel,
  MdAssessment,
  MdSearch,
  MdNotifications,
  MdDownload,
  MdFilterList,
  MdTrendingUp,
  MdTrendingDown,
  MdError,
  MdCheckCircle,
  MdInfo,
  MdChevronRight,
  MdCalendarToday,
} from 'react-icons/md'

function ComplianceRiskDash() {
  const priorityLogs = [
    { id: "PTRX-829304", customer: "RK Rajesh Kumar", value: "₹12,40,000", type: "RTGS Transfer", status: "ON-HOLD", risk: "CRITICAL", color: "red" },
    { id: "PTRX-829304", customer: "AS Aditi Sharma", value: "₹12,50,000", type: "NEFT Transfer", status: "CLEARED", risk: "LOW", color: "green" },
    { id: "PTRX-829991", customer: "AS Mehta Ltd", value: "₹45,00,000", type: "Internal Credit", status: "PROCESSING", risk: "MEDIUM", color: "yellow" },
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
            <div className="text-xl font-bold text-gray-900">AU COMPLIANCE</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block w-80">
            <input
              type="text"
              placeholder="Search accounts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-bold border-2 border-white">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold text-xs">
              AV
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-medium">Anand Verma</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase">Officer</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* 2. SIDEBAR (Stacked on Mobile/MD - flex-col like other pages) */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all">
          <div className="p-4 lg:p-5">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Compliance Menu</h3>
            <div className="flex flex-col gap-1">
              {[
                { icon: MdDashboard, label: 'Dashboard', active: true },
                { icon: MdReceiptLong, label: 'Transactions' },
                { icon: MdWarningAmber, label: 'Fraud Alerts' },
                { icon: MdVerifiedUser, label: 'KYC' },
                { icon: MdGavel, label: 'Compliance' },
                { icon: MdAssessment, label: 'Reports' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`
                    flex items-center gap-3 px-5 py-2.5 rounded-xl text-sm transition-all
                    ${item.active
                      ? 'bg-orange-50 text-orange-700 font-bold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 font-medium'
                    }
                  `}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50/30">

          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
              Compliance Risk Monitor
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Real-time monitoring of transactions and fraud indicators.
            </p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: MdTrendingUp,   title: "TOTAL TRANSACTIONS", value: "₹142.8 Cr", change: "+12.5%", color: "green" },
              { icon: MdError,        title: "HIGH RISK ALERTS",        value: "42",        change: "Needs Review", color: "red"   },
              { icon: MdVerifiedUser, title: "KYC VERIFICATION",  value: "1,204",     change: "Stable", color: "orange"},
              { icon: MdCheckCircle,  title: "HEALTH SCORE", value: "98.4%",     change: "Optimal",color: "green" },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{kpi.title}</div>
                  <kpi.icon size={20} className={`text-orange-600`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 tracking-tight mb-1">{kpi.value}</div>
                <div className={`text-[11px] font-bold ${kpi.color === 'green' ? 'text-green-600' : kpi.color === 'red' ? 'text-red-600' : 'text-orange-600'}`}>
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Real-time Fraud Monitoring chart */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-200 shadow-sm p-6 lg:p-8 flex flex-col">
              <h2 className="font-bold text-gray-900 text-lg tracking-tight mb-6">Fraud Monitoring Trend</h2>
              <div className="flex-1 min-h-[280px] bg-gray-50 rounded-3xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest text-center p-6">
                Anomalies vs Baseline Visualization
              </div>
              <div className="mt-8 space-y-5">
                {[
                  { label: "AML Compliance", percent: 42, color: "bg-orange-500" },
                  { label: "Identity Fraud", percent: 28, color: "bg-amber-500" },
                ].map((cat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                      <span className="text-gray-500">{cat.label}</span>
                      <span className="text-gray-900">{cat.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color}`} style={{ width: `${cat.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Audit Log - FANTASTIC MOBILE REPRESENTATION */}
            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm flex flex-col overflow-hidden h-fit lg:h-auto">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/20">
                <h2 className="font-bold text-gray-900 text-lg tracking-tight">Priority Audit Log</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-400"><MdFilterList size={18} /></button>
                  <button className="p-2 bg-orange-600 text-white rounded-lg"><MdDownload size={18} /></button>
                </div>
              </div>

              {/* Mobile Card Layout (visible below LG) */}
              <div className="lg:hidden p-4 space-y-4">
                {priorityLogs.map((log, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-black text-xs text-gray-400 uppercase tracking-widest mb-1">{log.id}</div>
                        <div className="font-bold text-gray-900">{log.customer}</div>
                      </div>
                      <span className={`px-2 py-1 text-[10px] font-black rounded-lg ${log.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {log.risk}
                      </span>
                    </div>
                    <div className="flex justify-between items-end border-t border-gray-200 pt-4">
                      <div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">Transaction Type</div>
                        <div className="text-sm font-medium text-gray-700">{log.type}</div>
                      </div>
                      <div className="text-right font-black text-gray-900">{log.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table Layout (visible on LG+) */}
              <div className="hidden lg:block overflow-x-auto flex-1">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-6 py-4">ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {priorityLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors group cursor-pointer">
                        <td className="px-6 py-5 font-bold text-xs text-gray-500">{log.id}</td>
                        <td className="px-6 py-5 font-bold text-gray-900 text-sm">{log.customer}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${log.color === 'red' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{log.status}</span>
                        </td>
                        <td className="px-6 py-5 text-right"><MdChevronRight size={20} className="text-gray-300 ml-auto" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 pb-10">
            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-6 lg:p-8">
              <h2 className="font-bold text-gray-900 text-lg tracking-tight mb-6 flex items-center gap-2">
                <MdCalendarToday size={20} className="text-orange-600" /> Upcoming Filings
              </h2>
              <div className="space-y-4">
                {[{ title: "STR Filing", time: "2 DAYS LEFT", status: "red" }, { title: "Annual Audit", time: "SCHEDULED", status: "orange" }].map((f, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="font-bold text-sm text-gray-900">{f.title}</div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${f.status === 'red' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{f.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-6 lg:p-8">
              <h2 className="font-bold text-gray-900 text-lg tracking-tight mb-6">Backend Audit Trail</h2>
              <div className="space-y-4">
                {[{ action: "Risk Score Updated", time: "14:22", color: "bg-orange-500" }, { action: "Fraud Engine Flag", time: "11:45", color: "bg-red-500" }].map((e, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0">
                    <div className={`w-2 h-2 rounded-full ${e.color}`}></div>
                    <div className="flex-1 font-bold text-sm text-gray-700">{e.action}</div>
                    <span className="text-[10px] font-bold text-gray-400">{e.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ComplianceRiskDash;
