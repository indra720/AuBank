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
    <div className="min-h-screen bg-gray-50 font-sans antialiased">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AU
            </div>
            <div className="text-xl font-bold text-gray-900">AU COMPLIANCE</div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Transactions</a>
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

      {/* Sidebar – always visible – horizontal scroll on mobile */}
      <aside className="bg-white border-b lg:border-r border-gray-200">
        <div className="px-4 py-3 lg:p-5">
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 whitespace-nowrap lg:whitespace-normal">
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
                  flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm min-w-max lg:min-w-0
                  ${item.active
                    ? 'bg-orange-50 text-orange-700 font-medium border-b-2 lg:border-b-0 lg:border-l-4 border-orange-600'
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
      <main className="p-4 sm:p-6 lg:p-8">

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">

          {/* Real-time Fraud Monitoring chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-2">Real-time Fraud Monitoring</h2>
            <p className="text-sm text-gray-600 mb-5">Hourly transaction anomalies vs normal baseline</p>

            <div className="relative h-72 bg-gray-50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                [ Area / Line chart placeholder – anomalies vs baseline ]
              </div>
              <div className="absolute bottom-4 left-4 text-sm font-medium text-orange-600">
                24 hours view • 7 days trend
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Risk Category Split</h3>
              <div className="space-y-4">
                {[
                  { label: "AML Compliance", percent: 42, color: "orange" },
                  { label: "Identity Fraud", percent: 28, color: "amber" },
                  { label: "KYC Discrepancy", percent: 18, color: "blue" },
                  { label: "Regulatory Reporting", percent: 12, color: "green" },
                ].map((cat, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{cat.label}</span>
                      <span>{cat.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${cat.color}-500`}
                        style={{ width: `${cat.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                "Risk levels have decreased by 2.4% since the last automated audit cycle."
              </p>
            </div>
          </div>

          {/* Priority Audit Log */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-semibold text-lg">Priority Audit Log</h2>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  <MdFilterList size={18} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700">
                  <MdDownload size={18} /> Export CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">TRANSACTION ID</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">CUSTOMER</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">VALUE</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">TYPE</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">STATUS</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">RISK LEVEL</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {priorityLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-5 py-4 font-medium">{log.id}</td>
                      <td className="px-5 py-4">{log.customer}</td>
                      <td className="px-5 py-4 font-medium">{log.value}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{log.type}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          log.status === 'ON-HOLD'  ? 'bg-red-100 text-red-800' :
                          log.status === 'CLEARED'  ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${log.color}-500`}></div>
                          <span className={`text-xs font-medium text-${log.color}-700`}>{log.risk}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-orange-600 hover:text-orange-800">
                          <MdChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
              <div>Showing 3 of 842 BADs found in last 2 hours</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-40" disabled>←</button>
                <button className="px-4 py-1 bg-orange-600 text-white rounded">1</button>
                <button className="px-4 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">→</button>
              </div>
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
  )
}

export default ComplianceRiskDash;