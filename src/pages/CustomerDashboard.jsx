// src/pages/CustomerDashboard.jsx
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  CreditCard, 
  Building2, 
  LifeBuoy, 
  Search, 
  ArrowRight,
  ChevronRight,
  Bell,
  Gem,
  Tag,
  FileText,
  Send
} from 'lucide-react';

function Customer() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={18} />, active: true },
    { label: 'Accounts', icon: <Wallet size={18} /> },
    { label: 'Wealth', icon: <Gem size={18} /> },
    { label: 'Invest', icon: <TrendingUp size={18} /> },
    { label: 'Cards', icon: <CreditCard size={18} /> },
    { label: 'Loans', icon: <Building2 size={18} /> },
    { label: 'Offer', icon: <Tag size={18} /> },
    { label: 'Support', icon: <LifeBuoy size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-orange-600">AU BANK</div>
          <div className="hidden md:relative md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search accounts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2 bg-orange-600 text-white text-sm font-bold rounded-full hover:bg-orange-700 transition-all">
            Quick Video Banking
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold border border-orange-200">
            AS
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex bg-white border-b border-gray-200 overflow-x-auto sticky top-14.25 z-20 scrollbar-hide">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`flex-1 flex flex-col items-center py-3 px-5 text-xs min-w-22.5 border-b-2 transition-colors ${
              activeTab === item.label ? 'border-[#3f1f4a] text-[#3f1f4a] bg-purple-50' : 'border-transparent text-gray-500'
            }`}
          >
            <span className="mb-1">{item.icon}</span>
            <span className="font-bold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar (White Background) */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shrink-0 overflow-y-auto">
          <div className="p-5">
            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => setActiveTab(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all ${
                      activeTab === item.label 
                        ? 'bg-[#3f1f4a] text-white shadow-lg shadow-purple-900/20' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="text-[10px] font-bold text-[#3f1f4a] uppercase tracking-wide">NEW LAUNCH</div>
              <div className="text-lg font-bold text-gray-900 mt-1">AU Zenith Plus</div>
              <div className="text-xs mt-2 opacity-90 text-gray-500 font-medium">
                Premium Metal Credit Card with Exclusive Benefits
              </div>
              <button className="mt-4 bg-[#3f1f4a] hover:bg-purple-900 text-white px-4 py-2.5 rounded-full text-xs font-bold w-full transition-all">
                APPLY NOW
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* Welcome Section with Buttons on Right */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Namaste, Aditya Sharma
              </h1>
              <p className="text-gray-600 mt-1 font-medium">
                Badlaav Humse Hai. Here's your financial snapshot for today.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all active:scale-95">
                <FileText size={18} className="text-orange-600" /> Generate Statement
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 shadow-md transition-all active:scale-95">
                <Send size={18} /> Quick Transfer
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                TOTAL SAVINGS <span className="text-green-600 font-bold">↑ 2.4%</span>
              </div>
              <div className="text-3xl font-bold mt-2 text-gray-900">₹4,25,840.00</div>
              <div className="text-xs text-gray-500 mt-2 font-medium tracking-tight">Acc •••4920 •••3312</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                WEALTH PORTFOLIO <span className="text-green-600 font-bold">↑ 5.8%</span>
              </div>
              <div className="text-3xl font-bold mt-2 text-gray-900">₹12,80,000.00</div>
              <div className="text-xs text-gray-500 mt-2 font-medium tracking-tight">
                8 Mutual Funds • 3 Fixed Deposits
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">CREDIT CARD LIMIT</div>
              <div className="text-3xl font-bold mt-2 text-gray-900">₹5,00,000.00</div>
              <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[65%]"></div>
              </div>
              <div className="text-xs text-gray-500 mt-2 font-medium">Available: ₹3,42,000</div>
            </div>
          </div>

          {/* Recent Transactions + Portfolio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Transactions */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/30">
                <h2 className="font-bold text-gray-900 text-lg">Recent Transactions</h2>
                <a href="#" className="text-orange-600 text-sm font-bold hover:underline">
                  View All →
                </a>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { title: 'Amazon India', time: '22 Oct 2023 - 14:30', amount: '-₹2,498.00', icon: '🛒' },
                  { title: 'Salary Credit', time: '01 Sep 2023 - 09:15', amount: '+₹1,85,000.00', icon: '💼' },
                  { title: 'Zomato Limited', time: '30 Sep 2023 - 20:45', amount: '-₹1,842.00', icon: '🍔' },
                  { title: 'Electricity Bill', time: '28 Sep 2023 - 11:29', amount: '-₹4,210.00', icon: '⚡' },
                ].map((tx, i) => (
                  <div key={i} className="p-5 flex justify-between items-center hover:bg-gray-50 cursor-pointer group transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-all shadow-sm">
                        {tx.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{tx.title}</div>
                        <div className="text-xs text-gray-500 font-medium">{tx.time}</div>
                      </div>
                    </div>
                    <div className={`font-bold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio Allocation */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col">
              <h2 className="font-bold text-gray-900 text-lg mb-6 tracking-tight uppercase   ">Portfolio Allocation</h2>
              <div className="flex-1 min-h-55 bg-gray-50 rounded-2xl flex items-end justify-around px-8 pt-12 gap-4 border border-gray-100">
                <div className="flex-1 bg-orange-400 h-[65%] rounded-t-lg shadow-sm"></div>
                <div className="flex-1 bg-[#3f1f4a] h-[40%] rounded-t-lg shadow-sm"></div>
                <div className="flex-1 bg-green-500 h-[25%] rounded-t-lg shadow-sm"></div>
                <div className="flex-1 bg-gray-300 h-[15%] rounded-t-lg shadow-sm"></div>
              </div>
              <div className="flex justify-between text-[11px] mt-4 text-gray-500 font-bold uppercase tracking-tighter">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-sm"></div> Fixed Deposits
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#3f1f4a] rounded-sm"></div> Mutual Funds
                </div>
              </div>
            </div>
          </div>

          {/* Promo Banner (Updated to #3f1f4a Background) */}
          <div className="bg-[#3f1f4a] text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl border border-white/5">
            <div className="max-w-2xl relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                Earn up to <span className="text-orange-400">7.25% p.a.*</span> on Savings
              </h2>
              <p className="mt-4 text-purple-100 font-medium leading-relaxed">
                Open an AU Digital Savings Account instantly via Video KYC and enjoy
                monthly interest payouts. Badlaav Humse Hai.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-900/20 active:scale-95 transition-all">
                  Open Account Now
                </button>
                <button className="border border-purple-300/30 hover:bg-white/10 px-6 py-3.5 rounded-full font-bold text-sm transition-all">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mb-20 -mr-10 hidden sm:block"></div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-6 text-center mt-auto font-medium">
        <div className="text-[11px] font-bold text-gray-400 tracking-[0.2em] mb-4">AU SMALL FINANCE BANK</div>
        <div className="flex justify-center gap-6 text-[11px] text-gray-500 font-bold mb-4 uppercase">
          <a href="#" className="hover:text-orange-600">Privacy</a>
          <a href="#" className="hover:text-orange-600">Security Tips</a>
          <a href="#" className="hover:text-orange-600">Terms</a>
        </div>
        <div className="text-[11px] text-gray-400 font-medium tracking-tight uppercase">© 2026 AU Small Finance Bank. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Customer;
