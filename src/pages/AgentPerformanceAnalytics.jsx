// src/pages/AgentPerformanceAnalytics.jsx
import {
  MdDashboard,
  MdPeople,
  MdBarChart,
  MdGavel,
  MdSearch,
  MdNotifications,
  MdSettings,
  MdDownload,
  MdSync,
  MdTrendingUp,
  MdTrendingDown,
  MdStar,
  MdVerifiedUser,
  MdAccessTime,
  MdPhoneInTalk,
  MdWarning,
  MdInfo,
  MdError,
  MdChevronRight,
} from 'react-icons/md'

function AgentPerformanceAnalytics() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">

      {/* 1. TOP HEADER (Original Look - Nav Links Removed) */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AU
            </div>
            <div className="text-xl font-bold text-gray-900">AU Bank Performance</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block w-80">
            <input
              type="text"
              placeholder="Search agents or metrics..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px]  rounded-full w-4 h-4 flex items-center justify-center font-bold">
              2
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold text-xs">
              SN
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium leading-none mb-1">Supervisor Portal</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase">Region: North Asia</div>
            </div>
          </div>
        </div>
      </header>

      {/* Parent Container - Flex Col for mobile, Row for LG */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* 2. SIDEBAR – STACKED ON MOBILE/MD (Original Design Style) */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="px-4 py-3 lg:p-5">
            <div className="flex flex-col gap-1.5">
              {[
                { icon: MdDashboard, label: 'Dashboard', active: true },
                { icon: MdPeople,    label: 'Agents' },
                { icon: MdBarChart,  label: 'Reports' },
                { icon: MdGavel,     label: 'Compliance' },
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

        {/* 3. MAIN CONTENT (Original Design Restored) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Agent Performance Analytics
              </h1>
              <p className="text-gray-600 mt-1">
                Real-time monitoring and historical metrics for the customer success department.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                <MdSync size={18} /> Last 24 hours
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">
                <MdDownload size={18} /> Export PDF
              </button>
            </div>
          </div>

          {/* KPI cards - Original Look */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {[
              { icon: MdAccessTime, title: "Avg Call Duration", value: "4m 12s", change: "-5%",  color: "red"    },
              { icon: MdStar,       title: "CSAT Score",        value: "4.8/5.0", change: "+2%",  color: "green"  },
              { icon: MdVerifiedUser,title: "KYC Accuracy",      value: "99.2%",   change: "+0.5%",color: "green"  },
              { icon: MdPeople,     title: "Active Agents",     value: "128",     change: "+12%", color: "green"  },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600 font-medium">{kpi.title}</div>
                  <kpi.icon size={24} className={`text-${kpi.color}-600 opacity-80`} />
                </div>
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div className={`text-sm font-medium ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {/* Chart - Original Look */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-5">Call Volume vs Resolution Rate</h2>
              <div className="h-72 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-sm border border-dashed border-gray-200">
                [ Chart Placeholder ]
              </div>
              <div className="flex justify-center gap-6 mt-4 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> Volume</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Resolution</div>
              </div>
            </div>

            {/* Daily Leaderboard - Original Look */}
            <div className="bg-orange-600 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <MdStar size={22} /> Daily Leaderboard
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Marcus T.", score: "98.4 pts", avatarColor: "bg-green-500" },
                  { rank: 2, name: "Sarah J.",  score: "96.1 pts", avatarColor: "bg-blue-500"   },
                  { rank: 3, name: "Lisa K.",   score: "94.8 pts", avatarColor: "bg-purple-500" },
                ].map((entry, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/10 rounded-lg p-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${entry.avatarColor}`}>{entry.rank}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{entry.name}</div>
                      <div className="text-xs opacity-80">{entry.score}</div>
                    </div>
                    <MdChevronRight size={20} className="opacity-50" />
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-medium">View All Standings</button>
            </div>
          </div>

          {/* Bottom row - Original Look */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 pb-10">
            {/* Live Agent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="font-semibold text-lg text-gray-900">Live Agent Activity</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    <tr><th className="px-6 py-4 text-left">Name</th><th className="px-6 py-4 text-left">Status</th><th className="px-6 py-4 text-left">Accuracy</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {[
                      { name: "Sarah Jenkins", status: "On Call", level: 75, color: "green" },
                      { name: "Elena Rodriguez", status: "Available", level: 92, color: "blue" },
                    ].map((agent, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{agent.name}</td>
                        <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.status === 'On Call' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{agent.status}</span></td>
                        <td className="px-6 py-4">
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full bg-green-500`} style={{ width: `${agent.level}%` }}></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Urgent Alerts - Original Look */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-5">Urgent Alerts</h2>
              <div className="space-y-4">
                {[
                  { type: "KYC VIOLATION", desc: "Case #20412 immediate review.", color: "red", icon: MdError },
                  { type: "AHT LIMIT", desc: "Agent Miller exceeded 15 mins.", color: "orange", icon: MdWarning }
                ].map((alert, i) => (
                  <div key={i} className={`p-4 border-l-4 rounded-lg flex gap-3 ${alert.color === 'red' ? 'border-red-600 bg-red-50' : 'border-orange-600 bg-orange-50'}`}>
                    <alert.icon size={22} className={alert.color === 'red' ? 'text-red-600' : 'text-orange-600'} />
                    <div>
                      <div className="font-medium text-sm text-gray-900">{alert.type}</div>
                      <div className="text-xs text-gray-700">{alert.desc}</div>
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

export default AgentPerformanceAnalytics;
