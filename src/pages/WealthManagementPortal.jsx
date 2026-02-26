// App.jsx
import { useState } from 'react'
import {
  MdDashboard,
  MdPieChart,
  MdAssessment,
  MdInsights,
  MdSearch,
  MdNotifications,
  MdSettings,
  MdPerson,
  MdPhoneInTalk,
  MdTrendingUp,
  MdTrendingDown,
  MdInfoOutline,
  MdAutoGraph,
  MdSavings,
  MdMonetizationOn,
  MdShowChart,
  MdBalance,
  MdClose,
  MdArrowForward,
  MdDescription,
  MdChevronRight
} from 'react-icons/md'

function WealthManagement() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">

      {/* Header / Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AU
            </div>
            <div className="text-xl font-bold text-gray-900">AU Bank</div>
          </div>

          <div className="relative hidden lg:block w-72 xl:w-96">
            <input
              type="text"
              placeholder="Search investments..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">
            <MdPhoneInTalk size={18} />
            Talk to Wealth Expert
          </button>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </button>

          <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
            AV
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full p-4">

        {/* Portfolio Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Portfolio Overview
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, Aditya. Here's your wealth status today.
            </p>
          </div>

          <div className="text-sm text-gray-500 flex items-center gap-2">
            Last updated: Oct 24, 2023, 10:30 AM
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {/* Net Worth */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1 flex items-center justify-between">
              <span>Total Net Worth</span>
              <MdInfoOutline size={18} className="text-gray-400 cursor-help" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              ₹84,52,430
            </div>
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              <MdTrendingUp size={16} /> +3.2%
            </div>
            <div className="text-xs text-gray-500 mt-1">vs. last month: +₹2,21,000</div>
          </div>

          {/* Unrealized Gains */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="text-sm text-gray-600 mb-1 flex items-center justify-between">
              <span>Total Unrealized Gains</span>
              <MdInfoOutline size={18} className="text-gray-400 cursor-help" />
            </div>
            <div className="text-3xl lg:text-4xl font-bold text-green-700 mb-1">
              +₹12,40,200
            </div>
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              <MdTrendingUp size={16} /> +14.8%
            </div>
            <div className="text-xs text-gray-500 mt-1">Lifetime portfolio earnings</div>
          </div>

          {/* AI Smart Rebalance */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
              READY
            </div>

            <div className="text-sm text-gray-600 mb-2 font-medium">
              AI Smart Rebalance
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Your equity allocation is liquid above target. Recommended switch to Liquid Funds.
            </p>

            <div className="flex items-center gap-3">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
                VIEW DETAILS
              </button>
              <a href="#" className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
                Read <MdChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

          {/* Portfolio Performance Chart */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="font-semibold text-lg">Portfolio Performance</h2>
              <div className="flex items-center gap-1.5 bg-gray-50 p-1 rounded-lg self-start sm:self-auto">
                {['1M', '6M', '1Y', 'ALL'].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                      period === '1Y' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-72 w-full">
              <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="wealthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid Lines */}
                <line x1="0" y1="50" x2="800" y2="50" stroke="#f3f4f6" strokeWidth="1" />
                <line x1="0" y1="100" x2="800" y2="100" stroke="#f3f4f6" strokeWidth="1" />
                <line x1="0" y1="150" x2="800" y2="150" stroke="#f3f4f6" strokeWidth="1" />
                
                {/* Hill Graph */}
                <path d="M0,180 Q100,170 150,120 T300,100 T450,140 T600,60 T750,40 T800,50 L800,200 L0,200 Z" fill="url(#wealthGradient)" />
                <path d="M0,180 Q100,170 150,120 T300,100 T450,140 T600,60 T750,40 T800,50" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
                
                {/* Data Highlights */}
                <circle cx="150" cy="120" r="4" fill="#7c3aed" className="animate-pulse" />
                <circle cx="600" cy="60" r="4" fill="#7c3aed" className="animate-pulse" />
                <circle cx="750" cy="40" r="5" fill="#7c3aed" />
              </svg>

              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-lg p-2 shadow-sm">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Current Value</div>
                <div className="text-sm font-black text-purple-700">₹84.52L</div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-4 px-2 tracking-widest uppercase">
              <span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-5">Asset Allocation</h2>

            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <div className="text-2xl font-bold">4 Main</div>
                    <div className="text-sm text-gray-500">Total Assets</div>
                  </div>
                </div>
                {/* Donut chart placeholder */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="20"
                    strokeDasharray="251.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                    strokeDasharray="251.2" strokeDashoffset="113" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" strokeWidth="20"
                    strokeDasharray="251.2" strokeDashoffset="176" transform="rotate(-90 50 50)" />
                </svg>
              </div>

              <div className="flex-1 space-y-4 w-full max-w-xs">
                {[
                  { label: "Mutual Funds", percent: 45, color: "orange" },
                  { label: "Fixed Deposits", percent: 30, color: "blue" },
                  { label: "Digital Gold", percent: 15, color: "yellow" },
                  { label: "Cash/Liquid", percent: 10, color: "gray" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-${item.color}-500`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Investment Portfolios */}
        <div className="mb-10">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-5">Key Investment Portfolios</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Mutual Funds", desc: "12 Active SIPs", value: "₹38,12,000", change: "+18.4%", xirr: "XIRR 12.6L", color: "orange" },
              { title: "Fixed Deposits", desc: "4 Active Deposits", value: "₹25,40,000", change: "7.5% Return", color: "blue" },
              { title: "Equity Stocks", desc: "8 Holdings", value: "₹15,20,430", change: "+12.2% CAGR", color: "green" },
            ].map((portfolio, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{portfolio.title}</h3>
                    <div className="text-sm text-gray-600">{portfolio.desc}</div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-${portfolio.color}-600`}>
                    {portfolio.title.includes("Mutual") ? <MdShowChart size={28} /> :
                     portfolio.title.includes("Fixed") ? <MdSavings size={28} /> :
                     <MdMonetizationOn size={28} />}
                  </div>
                </div>

                <div className="text-2xl font-bold mb-1">{portfolio.value}</div>
                <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <MdTrendingUp size={16} /> {portfolio.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Driven Insights */}
        <div className="bg-linear-to-br from-purple-700 to-indigo-800 text-white rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3 flex items-center gap-3">
                <MdAutoGraph size={32} className="text-purple-300" />
                AI-DRIVEN INSIGHTS
              </h2>

              <h3 className="text-xl font-semibold mb-4">Smart Portfolio Optimization</h3>

              <p className="text-purple-100 mb-6">
                Our AI has analyzed the latest market trends and your risk profile. There are 3 new tax-saving opportunities identified for your current portfolio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Tax Harvest", desc: "Save up to ₹45,000 this quarter" },
                  { title: "Risk Adjust", desc: "Mitigate small-cap volatility" },
                  { title: "Growth Pick", desc: "New fund recommendation" },
                  { title: "Insurance Gap", desc: "Review cover status" },
                ].map((insight, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                    <div className="font-medium mb-1">{insight.title}</div>
                    <div className="text-sm text-purple-100">{insight.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-55">
              <button className="bg-white text-purple-800 py-3 rounded-lg font-medium hover:bg-purple-100 transition-colors flex items-center justify-center gap-2">
                <MdDescription size={20} />
                Generate Report
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-medium transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default WealthManagement;