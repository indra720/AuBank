// src/pages/Performence.jsx
import { useState } from 'react';
import { 
  BarChart3, 
  UserCheck, 
  CheckCircle, 
  PhoneCall, 
  Users, 
  Settings, 
  Bell, 
  ChevronRight,
  Search,
  Clock,
  History,
  TrendingUp,
  Video
} from 'lucide-react';

function PerformanceOverview() {
  const agents = [
    { name: "David Chen", status: "In-Call", img: "https://i.pravatar.cc/150?u=david", color: "green" },
    { name: "Maria Garcia", status: "READY", img: "https://i.pravatar.cc/150?u=maria", color: "blue" },
    { name: "James Wilson", status: "BREAK", img: "https://i.pravatar.cc/150?u=james", color: "yellow" },
    { name: "Sarah Smith", status: "READY", img: "https://i.pravatar.cc/150?u=sarah", color: "blue" },
  ];

  const pendingKyc = [
    { customer: "AK Ananya Kapoor", caseId: "KYC-9231", agent: "David Chen", date: "Oct 24, 10:45 AM" },
    { customer: "RS Rohan Sharma", caseId: "KYC-9235", agent: "Sarah Smith", date: "Oct 24, 11:02 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold text-lg shadow-sm">
            AU
          </div>
          <div className="font-semibold text-lg hidden sm:block text-orange-600">Video Banking</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <input
              type="text"
              placeholder="Search call records or agents..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex items-center gap-3">
            <button className="text-gray-600 hover:text-orange-600 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold border-2 border-white">3</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-medium overflow-hidden border border-orange-200">
                <img src="https://i.pravatar.cc/150?u=sarahjenkins" alt="profile" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-sm font-medium">Sarah Jenkins</div>
                <div className="text-xs text-gray-500">Branch Manager</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-4">MENU</h3>
            <ul className="space-y-1 mb-8">
              {[
                { label: 'Dashboard', active: true, icon: <BarChart3 size={18} /> },
                { label: 'Agent Status', icon: <UserCheck size={18} /> },
                { label: 'KYC Approvals', badge: 5, icon: <CheckCircle size={18} /> },
                { label: 'Call Analytics', icon: <PhoneCall size={18} /> },
                { label: 'Team Management', icon: <Users size={18} /> },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href="#"
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                      item.active ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.icon}</span> {item.label}
                    {item.badge && <span className="ml-auto bg-red-100 text-red-700 px-2 py-0.5 text-[10px] font-bold rounded-full">{item.badge}</span>}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 px-4">CONFIGURATION</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50">
                  <Settings size={18} /> Settings
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Western Region Branch Office</h1>
              <p className="text-gray-600 mt-1">Real-time monitoring of AU Video Banking operations</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 font-medium">Export Reports</button>
              <button className="px-5 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Quick Action</button>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KPICard label="Active Agents" value="14 / 20" trend="↑5%" isUp={true} icon={<Users size={18} />} />
            <KPICard label="Pending KYC" value="42" trend="↓12%" isUp={false} icon={<History size={18} />} />
            <KPICard label="Avg. Wait Time" value="1m 45s" trend="↑30s" isUp={false} icon={<Clock size={18} />} />
            <KPICard label="Today's Volume" value="128" trend="↑15%" isUp={true} icon={<TrendingUp size={18} />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Regional Video Call Volume - Area Chart Style */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Regional Video Call Volume</h2>
                <select className="text-xs font-bold border border-gray-200 bg-gray-50 rounded-lg px-2 py-1 focus:outline-none">
                  <option>Last 7 Days</option>
                </select>
              </div>
              <div className="flex-1 relative h-48 w-full mt-4">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Area Fill */}
                  <path 
                    d="M0,100 L0,70 Q15,40 30,55 T60,30 T100,10 L100,100 Z" 
                    fill="url(#orangeGradient)" 
                    opacity="0.2"
                  />
                  {/* Line */}
                  <path 
                    d="M0,70 Q15,40 30,55 T60,30 T100,10" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Dots on line */}
                <div className="absolute top-[68%] left-[0%] w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></div>
                <div className="absolute top-[52%] left-[30%] w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></div>
                <div className="absolute top-[28%] left-[60%] w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></div>
                <div className="absolute top-[8%] left-[98%] w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">
                <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
              </div>
            </div>

            {/* Live Agent Status - Image and Video Icon */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col">
              <h2 className="font-semibold text-lg mb-4">Live Agent Status</h2>
              <div className="space-y-1 overflow-y-auto flex-1">
                {agents.map((agent, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 border-gray-50 group cursor-pointer hover:bg-gray-50 px-2 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                        <img src={agent.img} alt={agent.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{agent.name}</div>
                        <div className={`text-[10px] font-bold uppercase ${agent.status === 'In-Call' ? 'text-green-600' : 'text-blue-600'}`}>{agent.status}</div>
                      </div>
                    </div>
                    <button className="text-gray-400 group-hover:text-orange-600 transition-colors">
                      <Video size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-orange-600 hover:text-orange-700 text-xs font-bold uppercase tracking-widest text-center py-2 border-t border-gray-50">View All 20 Agents</button>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-semibold text-lg">Pending Local KYC Approvals</h2>
              <span className="bg-red-100 text-red-700 px-3 py-1 text-xs rounded-full font-medium">1 Urgent</span>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1.5 font-medium">
                  <span>Monthly Quota Performance</span>
                  <span>75% Achieved</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-orange-500" style={{ width: '75%' }}></div></div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="pb-3 px-2">Customer</th>
                      <th className="pb-3 px-2">Case ID</th>
                      <th className="pb-3 px-2">Agent</th>
                      <th className="pb-3 px-2">Submission</th>
                      <th className="pb-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {pendingKyc.map((item, i) => (
                      <tr key={i} className="border-b last:border-0 border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-2 font-bold text-gray-900">{item.customer}</td>
                        <td className="py-4 px-2 font-medium text-gray-600">{item.caseId}</td>
                        <td className="py-4 px-2 font-medium text-gray-600">{item.agent}</td>
                        <td className="py-4 px-2 text-gray-500">{item.date}</td>
                        <td className="py-4 px-2 text-right"><button className="text-orange-600 font-bold hover:underline">Review →</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function KPICard({ label, value, trend, isUp, icon }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <div className="text-orange-600 p-2 bg-orange-50 rounded-lg">{icon}</div>
        <span className={`text-xs font-bold ${isUp ? 'text-green-600' : 'text-orange-600'}`}>{trend}</span>
      </div>
      <div>
        <div className="text-sm text-gray-600 font-medium">{label}</div>
        <div className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</div>
      </div>
    </div>
  );
}

export default PerformanceOverview;
