// src/pages/GeneratedPage.jsx
import {
  MdDashboard,
  MdPlayCircleOutline,
  MdFolder,
  MdQuestionAnswer,
  MdLogout,
  MdVideoCall,
  MdLock,
  MdDownload,
  MdChatBubbleOutline,
  MdNotifications,
  MdSearch,
  MdArrowForward,
  MdPlayArrow,
  MdCheckCircle,
  MdOutlineTimer
} from 'react-icons/md';

function GeneratedPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Header / Top bar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
              AU
            </div>
            <div className="text-lg font-semibold text-gray-900 hidden sm:block">
              STAFF TRAINING PORTAL
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Courses</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Certifications</a>
            <a href="#" className="text-gray-700 hover:text-orange-600">Community</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block w-64">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search modules..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative transition-colors">
            <MdNotifications size={24} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
              1
            </span>
          </button>

          <div className="flex items-center gap-3 border-l border-gray-100 pl-4">
            <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-semibold border border-purple-200">
              R
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-bold text-gray-900 font-sans">Rajesh</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Agent ID: 9942</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-4 py-4 lg:p-5">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 whitespace-nowrap lg:whitespace-normal">
              {[
                { icon: MdDashboard, label: 'My Dashboard', active: true },
                { icon: MdPlayCircleOutline, label: 'Live Simulations' },
                { icon: MdFolder, label: 'Resources' },
                { icon: MdQuestionAnswer, label: 'FAQs' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm transition-all ${
                    item.active
                      ? 'bg-orange-50 text-orange-700 font-bold border-l-4 border-orange-600 shadow-sm shadow-orange-900/5'
                      : 'text-gray-600 hover:bg-gray-50 font-medium'
                  }`}
                >
                  <item.icon size={22} />
                  {item.label}
                </a>
              ))}
            </div>

            <div className="mt-8 lg:mt-auto pt-4 border-t border-gray-50 hidden lg:block">
              <a href="#" className="flex items-center gap-3 px-5 py-3 text-sm text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors">
                <MdLogout size={22} /> Logout Session
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 lg:p-8 overflow-y-auto bg-gray-50/30">
          {/* Welcome Card */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8 mb-10 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-purple-900 tracking-tight">
                  Welcome to the Team, Rajesh!
                </h1>
                <p className="text-gray-600 mt-2 max-w-2xl font-medium leading-relaxed">
                  We're excited to have you onboard. Complete your training to start assisting customers through AU Video Banking.
                </p>
              </div>

              <div className="min-w-55 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                <div className="text-[11px] font-bold text-gray-500 mb-2 flex justify-between uppercase tracking-widest">
                  <span>Overall Progress</span>
                  <span className="text-orange-600">65%</span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-linear-to-r from-orange-600 to-orange-400 rounded-full shadow-sm" style={{ width: '65%' }}></div>
                </div>
                <div className="text-[10px] text-gray-400 mt-2 text-right font-bold italic">
                  Estimated 4 hours remaining
                </div>
              </div>
            </div>
            {/* Subtle background shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
          </div>

          {/* Core Training Modules */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 px-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Core Training Path</h2>
              <a href="#" className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 text-[11px] uppercase tracking-widest">
                View All Courses <MdArrowForward size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ModuleCard status="COMPLETED" title="Video KYC Excellence" desc="Master digital onboarding and customer verification workflows." time="1.5 hrs" type="completed" />
              <ModuleCard status="IN PROGRESS" title="Security & Compliance" desc="Protocols for data privacy, fraud detection, and regulatory standards." time="2.0 hrs" type="active" />
              <ModuleCard status="LOCKED" title="Customer Empathy" desc="Soft skills for engaging communication and handling customer queries." time="1.0 hr" type="locked" />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* FANTASTIC LIVE CALL SIMULATION CARD */}
            <div className="bg-white rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-900/5 p-8 flex flex-col items-center text-center relative overflow-hidden group border-b-[6px] border-b-orange-500">
              {/* Badge */}
              <div className="absolute top-6 right-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black tracking-widest border border-orange-100 uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></span>
                  Safe Sandbox
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">AI Interaction Hub</h2>
              <p className="text-gray-500 mb-10 font-medium text-sm max-w-xs leading-relaxed">Master your skills in our real-time simulated environment with instant feedback.</p>
              
              <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
                {/* Multi-layer radar pulse */}
                <div className="absolute inset-0 rounded-full bg-orange-100 animate-ping opacity-20"></div>
                <div className="absolute inset-4 rounded-full bg-orange-50 border border-orange-100 animate-pulse duration-1000 opacity-40"></div>
                <div className="absolute inset-8 rounded-full bg-orange-100 border border-orange-200 opacity-60"></div>
                
                <div className="relative z-10 w-24 h-24 bg-linear-to-tr from-orange-600 to-orange-400 rounded-sm flex items-center justify-center shadow-[0_15px_30px_rgba(249,115,22,0.4)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                  <MdVideoCall size={56} className="text-white drop-shadow-md" />
                </div>
              </div>

              <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-900/20 uppercase tracking-widest flex items-center justify-center gap-2">
                <MdPlayArrow size={20} className="text-orange-500" /> Start Interaction
              </button>
              <p className="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-[0.2em]">Powered by AI-Vision Engine</p>
            </div>

            {/* Resource Library */}
            <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm p-8 flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Knowledge Hub</h2>
              <div className="space-y-3 flex-1">
                <ResourceItem name="Compliance Handbook v4.2" type="PDF" size="2.4 MB" icon="📄" />
                <ResourceItem name="Standard Call Scripts" type="DOCX" size="1.1 MB" icon="📝" />
                <ResourceItem name="Fraud Detection Cases" type="VIDEO" size="12 min" icon="🎥" />
              </div>
              <button className="mt-8 w-full bg-gray-50 text-gray-600 hover:bg-gray-100 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all border border-gray-100 text-xs uppercase tracking-widest">
                <MdChatBubbleOutline size={20} className="text-orange-600" /> Training AI Assistant
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ModuleCard({ status, title, desc, time, type }) {
  const isCompleted = type === 'completed';
  const isActive = type === 'active';
  const isLocked = type === 'locked';

  return (
    <div className={`bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden flex flex-col transition-all hover:shadow-md ${isLocked ? 'opacity-70' : ''} group`}>
      <div className={`h-44 relative flex items-center justify-center ${isCompleted ? 'bg-green-50/50' : isActive ? 'bg-orange-50/50' : 'bg-gray-50'}`}>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${isCompleted ? 'bg-green-100 text-green-700 border border-green-200' : isActive ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-gray-200 text-gray-500'}`}>
          {status}
        </div>
        {isCompleted ? <MdCheckCircle size={64} className="text-green-500 opacity-20" /> : isActive ? <MdPlayArrow size={64} className="text-orange-600 opacity-20 animate-pulse" /> : <MdLock size={56} className="text-gray-300" />}
      </div>
      <div className="p-6 flex flex-1 flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-orange-600 transition-colors">{title}</h3>
        <p className="text-xs text-gray-500 mb-6 flex-1 font-medium leading-relaxed">{desc}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1.5"><MdOutlineTimer size={14} className="text-orange-500" /> {time}</span>
          <button className={`px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${isLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95 shadow-md shadow-orange-900/10'}`}>
            {isCompleted ? 'Review' : isActive ? 'Resume' : 'Locked'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ResourceItem({ name, type, size, icon }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-gray-100 hover:shadow-sm cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-gray-100 uppercase text-[10px] font-black text-gray-400 transition-all group-hover:bg-orange-600 group-hover:text-white">{type}</div>
        <div>
          <div className="font-bold text-sm text-gray-900">{name}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{size}</div>
        </div>
      </div>
      <MdDownload size={22} className="text-gray-300 group-hover:text-orange-600 transition-colors" />
    </div>
  );
}

export default GeneratedPage;
