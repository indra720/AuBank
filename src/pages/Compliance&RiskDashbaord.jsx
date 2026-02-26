// App.jsx
import {
  MdDashboard,
  MdReceiptLong,
  MdWarningAmber,
  MdVerifiedUser,
  MdGavel,
  MdAssessment,
  MdSearch,
  MdNotifications,
  MdSettings,
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

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-gray-700 hover:text-orange-600">Fraud Alerts</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">KYC</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Reports</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block w-80">
            <input
              type="text"
              placeholder="Search accounts, TRN or alerts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              3
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
              AV
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium">Anand Verma</div>
              <div className="text-xs text-gray-500">Officer</div>
            </div>
          </div>
        </div>
      </header>

      {/* Parent Container - Flex Col for mobile, Row for LG */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar – vertical list */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="px-4 py-3 lg:p-5">
            <div className="flex flex-col gap-1.5">
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
                    flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm transition-all
                    ${item.active
                      ? 'bg-orange-50 text-orange-700 font-medium lg:border-l-4 border-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
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
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Agent Performance Analytics
        </h1>
        <p className="text-gray-600 mb-8">
          Real-time monitoring and historical metrics for the customer success department.
          <span className="block sm:inline"> Updated 2 minutes ago.</span>
        </p>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { icon: MdTrendingUp,   title: "TOTAL TRANSACTIONS (24h)", value: "₹142.8 Cr", change: "+12.5%", color: "green" },
            { icon: MdError,        title: "HIGH RISK ALERTS",        value: "42",        change: "",      color: "red"   },
            { icon: MdVerifiedUser, title: "KYC VERIFICATION AUDIT",  value: "1,204",     change: "",      color: "orange"},
            { icon: MdCheckCircle,  title: "COMPLIANCE HEALTH SCORE", value: "98.4%",     change: "Optimal",color: "green" },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm text-gray-600 font-medium">{kpi.title}</div>
                <kpi.icon size={24} className={`text-${kpi.color}-600 opacity-80`} />
              </div>
              <div className="text-3xl font-bold mb-1">{kpi.value}</div>
              {kpi.change && (
                <div className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-gray-700'}`}>
                  {kpi.change}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 mb-8">

          {/* Risk Category Split card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-5">Risk Category Split</h3>
            <div className="space-y-5">
              {[
                { label: "AML Compliance", percent: 42, color: "orange" },
                { label: "Identity Fraud", percent: 28, color: "amber" },
                { label: "KYC Discrepancy", percent: 18, color: "blue" },
                { label: "Regulatory Reporting", percent: 12, color: "green" },
              ].map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-700 font-medium">{cat.label}</span>
                    <span className="font-bold text-gray-900">{cat.percent}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-${cat.color}-500 transition-all duration-500`}
                      style={{ width: `${cat.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "Risk levels have decreased by <span className="text-green-600 font-bold">2.4%</span> since the last automated audit cycle."
              </p>
            </div>
          </div>

          {/* Real-time Fraud Monitoring chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold text-lg">Real-time Fraud Monitoring</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div> LIVE
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-8">Hourly transaction anomalies vs normal baseline</p>

            <div className="relative h-64 w-full">
              {/* Hill Type Graph SVG Placeholder */}
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Baseline */}
                <path d="M0,150 Q100,140 200,150 T400,150 T600,150 T800,150" fill="none" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
                {/* Hill Graph */}
                <path d="M0,180 Q50,160 100,100 T200,80 T300,140 T400,60 T500,90 T600,120 T700,50 T800,100 L800,200 L0,200 Z" fill="url(#hillGradient)" />
                <path d="M0,180 Q50,160 100,100 T200,80 T300,140 T400,60 T500,90 T600,120 T700,50 T800,100" fill="none" stroke="#ea580c" strokeWidth="3" />
                
                {/* Data Points */}
                <circle cx="100" cy="100" r="4" fill="#ea580c" />
                <circle cx="400" cy="60" r="4" fill="#ea580c" />
                <circle cx="700" cy="50" r="4" fill="#ea580c" />
              </svg>

              <div className="absolute top-0 left-0 w-full h-full flex items-end justify-between px-2 pointer-events-none">
                {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'].map((time) => (
                  <span key={time} className="text-[10px] text-gray-400 font-medium mb-1">{time}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-orange-600"></div>
                  <span className="text-xs font-semibold text-gray-700">Anomalies Detected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm border border-gray-300 border-dashed"></div>
                  <span className="text-xs font-semibold text-gray-700">Baseline Trend</span>
                </div>
              </div>
              <div className="text-sm font-bold text-orange-600">
                24 hours view • 7 days trend
              </div>
            </div>
          </div>
        </div>

        {/* Priority Audit Log - Full Width */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-semibold text-lg">Priority Audit Log</h2>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 font-medium text-gray-700">
                <MdFilterList size={18} /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700 font-medium">
                <MdDownload size={18} /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">TRANSACTION ID</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CUSTOMER</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">VALUE</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">TYPE</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">RISK LEVEL</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {priorityLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-bold text-gray-900">{log.id}</td>
                    <td className="px-5 py-4 text-gray-700 font-medium">{log.customer}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">{log.value}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{log.type}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full ${
                        log.status === 'ON-HOLD'  ? 'bg-red-100 text-red-800' :
                        log.status === 'CLEARED'  ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full bg-${log.color}-500 shadow-sm shadow-${log.color}-200`}></div>
                        <span className={`text-xs font-bold text-${log.color}-700`}>{log.risk}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="p-2 hover:bg-orange-50 rounded-full text-orange-600 transition-colors">
                        <MdChevronRight size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between text-xs font-medium text-gray-500">
            <div>Showing 3 of 842 BADs found in last 2 hours</div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-40" disabled>←</button>
              <button className="px-4 py-1.5 bg-orange-600 text-white rounded-md font-bold">1</button>
              <button className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50">→</button>
            </div>
          </div>
        </div>

        {/* Bottom section – Upcoming Filings + Backend Audit Trail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

          {/* Upcoming Filings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-5 flex items-center gap-2">
              <MdCalendarToday size={20} /> Upcoming Filings
            </h2>

            <div className="space-y-4">
              {[
                { title: "STR Filing (Batch 4)", time: "2 DAYS LEFT", status: "pending", color: "red" },
                { title: "Annual Audit", time: "SCHEDULED", status: "scheduled", color: "orange" },
                { title: "CTR Reporting", time: "COMPLETED", status: "completed", color: "green" },
              ].map((filing, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div>
                    <div className="font-medium">{filing.title}</div>
                    <div className="text-sm text-gray-600">{filing.time}</div>
                  </div>
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    filing.color === 'red'    ? 'bg-red-100 text-red-800' :
                    filing.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {filing.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium">
              View Compliance Calendar →
            </button>
          </div>

          {/* Backend Audit Trail */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-5">Backend Audit Trail</h2>

            <div className="space-y-4">
              {[
                { action: "Mehul J. updated Risk Score for account AB-82913", time: "14:22", color: "orange" },
                { action: "Systems auto-verified KYC for 12,042 non-banking customers", time: "13:58", color: "green" },
                { action: "Fraud Engine flagged high-velocity transaction pattern in Mumbai sector", time: "11:45", color: "red" },
              ].map((entry, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b last:border-0">
                  <div className={`w-2 h-2 mt-2 rounded-full bg-${entry.color}-500`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{entry.action}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{entry.time}</div>
                  </div>
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