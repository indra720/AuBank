// src/pages/BranchManageMent.jsx
import { useState } from 'react'
import {
  MdDashboard,
  MdPeople,
  MdPeopleOutline,
  MdTimeline,
  MdSchedule,
  MdSearch,
  MdNotifications,
  MdSettings,
  MdArrowForward,
  MdEdit,
  MdAccessTime,
  MdTrendingUp,
  MdTrendingDown,
  MdVerifiedUser,
  MdGroupWork,
} from 'react-icons/md'

function BranchManagement() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">

      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="text-xl lg:text-2xl font-bold text-orange-600 tracking-tight">AU BANK</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-72">
            <input
              type="text"
              placeholder="Search branch data..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative transition-colors">
            <MdNotifications size={24} />
            <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold border border-orange-200 text-xs">RK</div>
            <div className="hidden sm:block leading-tight text-right">
              <div className="text-sm font-bold text-gray-900">Rajesh Kumar</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-right">Branch Manager</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* 2. SIDEBAR (Clean & Consistent Style) */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="p-4 lg:p-5">
            {/* Simple Branch Title for LG */}
            <div className="hidden lg:block px-4 mb-6">
              <h2 className="text-sm font-bold text-gray-900 leading-tight">Mumbai Central</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">#AU-MUM-4001</p>
            </div>

            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Menu</h3>
            <nav className="flex flex-col gap-1">
              {[
                { icon: MdDashboard,        label: 'Dashboard',         active: true },
                { icon: MdPeople,           label: 'Staff Management' },
                { icon: MdPeopleOutline,    label: 'Customer Queue' },
                { icon: MdTimeline,         label: 'Performance' },
                { icon: MdSchedule,         label: 'Shift Scheduling' },
              ].map(item => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                    item.active ? 'bg-orange-50 text-orange-700 font-bold' : 'text-gray-600 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50/30">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Live Branch Performance</h1>
            <div className="text-[11px] font-bold text-green-600 mt-1 flex items-center gap-2 uppercase tracking-widest">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live Active
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { icon: MdTrendingUp, title: "Savings Growth", value: "₹4.2 Cr", change: "+12.5%", color: "green" },
              { icon: MdTrendingDown, title: "Loan Disburse", value: "₹1.8 Cr", change: "-2.1%", color: "orange" },
              { icon: MdVerifiedUser, title: "KYC Success", value: "92%", change: "+5.4%", color: "green" },
              { icon: MdGroupWork, title: "Attendance", value: "24 / 30", change: "Online", color: "green" },
            ].map((item,i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.title}</div>
                  <item.icon size={20} className="text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                <div className={`text-[11px] font-bold mt-1 ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{item.change}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Customer Queue */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/20">
                <h2 className="font-bold text-gray-900 text-lg tracking-tight">Customer Queue</h2>
                <a href="#" className="text-orange-600 text-xs font-bold hover:underline tracking-widest">VIEW ALL →</a>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-[#3f1f4a] rounded-2xl p-5 text-white shadow-lg border border-white/5">
                  <div className="text-[10px] font-bold opacity-60 uppercase mb-1">CURRENT SERVING</div>
                  <div className="font-bold text-2xl mb-1">Token #A-402</div>
                  <div className="text-sm opacity-80">Counter 3 - Account Opening</div>
                </div>
                <div className="divide-y divide-gray-50">
                  {[ { token: "B-12", type: "Cash Deposit", wait: "2m" }, { token: "L-05", type: "Loan Enquiry", wait: "8m" } ].map((q,i) => (
                    <div key={i} className="flex justify-between items-center py-3">
                      <div><div className="font-bold text-gray-900 text-sm">{q.token}</div><div className="text-xs text-gray-500">{q.type}</div></div>
                      <div className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{q.wait}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-md shadow-orange-900/10">+ Generate Token</button>
              </div>
            </div>

            {/* Staff Attendance */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 bg-gray-50/20">
                <h2 className="font-bold text-gray-900 text-lg tracking-tight">Staff Attendance</h2>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse min-w-100">
                  <thead>
                    <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest"><th className="px-6 py-4">Member</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[ { name: "Anjali Sharma", status: "Present", color: "green" }, { name: "Vikram Singh", status: "Break", color: "orange" } ].map((s,i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap"><div className="font-bold text-sm text-gray-900">{s.name}</div></td>
                        <td className="px-6 py-5"><span className={`px-2 py-1 text-[10px] font-bold rounded-lg ${s.color === 'green' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>{s.status}</span></td>
                        <td className="px-6 py-5 text-right"><button className="text-gray-400 hover:text-orange-600"><MdEdit size={18} /></button></td>
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
  )
}

export default BranchManagement;
