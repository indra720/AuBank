// src/pages/SystemHealth&Security.jsx
import {
  MdDashboard,
  MdDns,
  MdSecurity,
  MdFingerprint,
  MdTimeline,
  MdArticle,
  MdDownload,
  MdSync,
  MdNotifications,
  MdSettings,
  MdSearch,
  MdError,
  MdWarning,
  MdInfo,
  MdChevronRight,
} from 'react-icons/md';

function SystemHealth() {
  const alerts = [
    {
      time: "14:22:01",
      node: "US-EAST-04",
      type: "Repeated Auth Failure",
      severity: "CRITICAL",
      color: "red",
    },
    {
      time: "14:18:45",
      node: "EU-WEST-01",
      type: "Node Latency Spike",
      severity: "WARNING",
      color: "orange",
    },
    {
      time: "14:05:12",
      node: "ASIA-SOUTH-02",
      type: "Firmware Updated",
      severity: "INFO",
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <div className="text-xl font-bold text-gray-900">SuperAdmin Monitor</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-80">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search logs, nodes, or alerts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full border-2 border-white"></span>
          </button>

          <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
            SA
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Sidebar – NOW STACKED AS FLEX-COL (Like Global/Operation) */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="p-4 sm:p-5">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-4">System Menu</h2>
            <div className="flex flex-col gap-1">
              {[
                { icon: MdDashboard, label: 'Dashboard', active: true },
                { icon: MdDns, label: 'Server Health' },
                { icon: MdSecurity, label: 'Security Alerts', badge: 3 },
                { icon: MdFingerprint, label: 'Biometrics' },
                { icon: MdTimeline, label: 'RTC Latency' },
                { icon: MdArticle, label: 'System Logs' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    item.active
                      ? 'bg-orange-50 text-orange-700 font-bold shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <item.icon size={20} className={item.active ? "text-orange-600" : "text-gray-400"} />
                  {item.label}
                  {item.badge && (
                    <span className={`ml-auto px-2 py-0.5 text-[10px] rounded-full font-black ${item.active ? 'bg-orange-200 text-orange-800' : 'bg-red-100 text-red-700'}`}>
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Infrastructure Overview</h1>
              <p className="text-gray-500 font-medium mt-1">
                Real-time health telemetry across global clusters
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm active:scale-95 transition-all">
                <MdDownload size={18} /> Export CSV
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
                <MdSync size={18} /> Force Sync
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { title: "Avg Server Load", value: "42.8%", change: "+5.2%", color: "orange", icon: MdDns },
              { title: "Video Latency (RTC)", value: "18ms", change: "-2.1%", color: "red", icon: MdTimeline },
              { title: "Breach Detection", value: "0", change: "Stable", color: "green", icon: MdSecurity },
              { title: "Biometric Auth", value: "99.9%", change: "+0.1%", color: "green", icon: MdFingerprint },
            ].map((kpi, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{kpi.title}</div>
                  <kpi.icon size={20} className={kpi.color === 'orange' ? 'text-orange-600' : kpi.color === 'red' ? 'text-red-600' : 'text-green-600'} />
                </div>
                <div className="text-3xl font-bold text-gray-900 tracking-tight">{kpi.value}</div>
                <div className={`text-xs mt-2 font-bold ${kpi.change.includes('+') ? 'text-green-600' : kpi.change.includes('-') ? 'text-red-600' : 'text-gray-500'}`}>
                  {kpi.change}
                </div>
                <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${kpi.color === 'orange' ? 'bg-orange-500' : kpi.color === 'red' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: kpi.value.includes('%') ? kpi.value : '80%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
              <h2 className="font-bold text-gray-900 text-lg mb-6 tracking-tight">Network Throughput</h2>
              <div className="relative h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
                [ Network Wave Chart Placeholder ]
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
              <h2 className="font-bold text-gray-900 text-lg mb-6 tracking-tight">Biometric Success Rate</h2>
              <div className="relative h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
                [ Success Rate Bar Chart Placeholder ]
              </div>
            </div>
          </div>

          {/* Security & System Alerts */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/20">
              <h2 className="font-bold text-gray-900 text-lg tracking-tight">Security & System Alerts</h2>
              <a href="#" className="text-orange-600 hover:text-orange-700 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                View All Logs <MdChevronRight size={18} />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-200">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Source Node</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Event Type</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Severity</th>
                    <th className="px-6 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {alerts.map((alert, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{alert.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-600 tracking-tight">{alert.node}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{alert.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-lg border ${
                            alert.color === 'red'    ? 'bg-red-50 text-red-700 border-red-100' :
                            alert.color === 'orange' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                            'bg-blue-50 text-blue-700 border-blue-100'
                          }`}
                        >
                          {alert.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="text-orange-600 hover:text-orange-700 font-black uppercase text-[10px] tracking-tighter transition-all">
                          Fix Deployment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SystemHealth;
