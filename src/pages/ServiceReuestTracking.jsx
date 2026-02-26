// App.jsx
import { useState } from 'react'
import {
  MdDashboard,
  MdTrackChanges,
  MdAddCircleOutline,
  MdVideocam,
  MdHelpOutline,
  MdSearch,
  MdNotifications,
  MdSettings,
  MdPerson,
  MdPhoneInTalk,
  MdDownload,
  MdPlayCircleOutline,  
  MdCheckCircle,
  MdSchedule,
  MdChevronRight,
  MdReceipt,
  MdHeadsetMic
} from 'react-icons/md'

function ServiceRequestTracking() {
  const [activeTab, setActiveTab] = useState('Active Requests')

  const requests = [
    {
      id: "SR10294",
      title: "Cheque Book Request",
      date: "12 Oct 2023",
      status: "Under Processing",
      statusColor: "orange",
      timeline: [
        { label: "Submitted", date: "12 Oct 2023, 10:30 AM", done: true },
        { label: "Under Processing", date: "13 Oct 2023, 02:15 PM", done: true },
      ]
    },
    {
      id: "SR10185",
      title: "Address Update",
      date: "08 Oct 2023",
      status: "Submitted",
      statusColor: "blue",
      timeline: [
        { label: "Submitted", date: "08 Oct 2023", done: true },
      ]
    },
    {
      id: "SR09921",
      title: "Debit Card Reissue",
      date: "01 Oct 2023",
      status: "Dispatched",
      statusColor: "purple",
      timeline: [
        { label: "Submitted", date: "01 Oct 2023", done: true },
        { label: "Dispatched", date: "Expected: 15 Oct 2023", done: false },
      ]
    },
    {
      id: "SR09812",
      title: "KYC Renewal",
      date: "28 Sep 2023",
      status: "Completed",
      statusColor: "green",
      timeline: [
        { label: "Submitted", date: "28 Sep 2023", done: true },
        { label: "Completed", date: "17 Oct 2023", done: true },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              AU
            </div>
            <div className="text-xl font-bold text-gray-900">AU Bank</div>
          </div>

          <div className="relative hidden md:block w-64 lg:w-80">
            <input
              type="text"
              placeholder="Search Request ID"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </button>

          <button className="p-2 text-gray-600 hover:text-orange-600">
            <MdSettings size={24} />
          </button>

          <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
            AV
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* Sidebar – always visible */}
        <aside className="bg-white border-b lg:border-r border-gray-200 lg:w-64 xl:w-72 shrink-0 overflow-y-auto">
          <div className="p-4 lg:p-5">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-4">SERVICE PORTAL 101</div>
            <div className="text-sm font-medium mb-6">
              Customer ID: <span className="text-orange-600 font-semibold">8829103</span>
            </div>

            <nav className="space-y-1">
              {[
                { icon: MdDashboard,       label: 'Overview' },
                { icon: MdTrackChanges,    label: 'Request Tracking', active: true },
                { icon: MdAddCircleOutline,label: 'New Request' },
                { icon: MdVideocam,        label: 'Video Support' },
                { icon: MdHelpOutline,     label: 'Need help?' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                    ${item.active
                      ? 'bg-orange-50 text-orange-700 font-medium border-l-4 border-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <MdPhoneInTalk size={20} />
              Talk to RM
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Service Request Tracking
            </h1>

            <p className="text-gray-600 mb-8">
              Monitor and manage your active service requests in real-time.
            </p>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 items-start">

              {/* Active Requests Table Card */}
              <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="font-bold text-gray-900 text-lg">My Requests</h2>
                  <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setActiveTab('Active Requests')}
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTab === 'Active Requests'
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <MdTrackChanges size={16} />
                      ACTIVE
                    </button>
                    <button
                      onClick={() => setActiveTab('Completed')}
                      className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                        activeTab === 'Completed'
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <MdCheckCircle size={16} />
                      COMPLETED
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">DETAILS</th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">DATE</th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">STATUS</th>
                        <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {requests.map((req, i) => (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-5">
                            <div className="font-bold text-gray-900 text-sm">{req.id}</div>
                            <div className="text-xs text-gray-500 font-medium">{req.title}</div>
                          </td>
                          <td className="px-6 py-5 text-xs text-gray-600 font-semibold">{req.date}</td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full ${
                              req.statusColor === 'orange' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                              req.statusColor === 'blue'   ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                              req.statusColor === 'purple' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                              'bg-green-50 text-green-600 border border-green-100'
                            }`}>
                              {req.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-600 transition-colors">
                              <MdChevronRight size={22} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-200 bg-gray-50/30">
                    <div className="text-[10px] font-bold text-orange-600 tracking-widest uppercase mb-1">LIVE TRACKING</div>
                    <h2 className="font-bold text-gray-900">Request Timeline</h2>
                    <div className="text-xs text-gray-500 mt-1 font-medium">SR ID: <span className="text-gray-900">SR10294</span></div>
                  </div>

                  <div className="p-6">
                    <div className="relative space-y-8 before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                      {requests[0].timeline.map((step, i) => (
                        <div key={i} className="relative flex gap-4">
                          <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                            step.done ? 'bg-orange-600' : 'bg-gray-200'
                          }`}>
                            {step.done && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.label}
                            </div>
                            <div className="text-[11px] text-gray-500 font-medium mt-0.5">
                              {step.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl text-xs font-bold border border-gray-100 transition-all">
                        <MdReceipt size={16} />
                        RECEIPT
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-orange-900/20 transition-all">
                        <MdHeadsetMic size={16} />
                        SUPPORT
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stats Summary Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "TOTAL REQUESTS", value: "24", icon: MdReceipt, color: "gray" },
                    { label: "ACTIVE", value: "03", icon: MdTrackChanges, color: "orange" },
                    { label: "COMPLETED", value: "19", icon: MdCheckCircle, color: "green" },
                    { label: "AVG. TIME", value: "2.4d", icon: MdSchedule, color: "blue" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                          <stat.icon size={18} />
                        </div>
                      </div>
                      <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                      <div className="text-[10px] font-bold text-gray-400 tracking-widest mt-1 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ServiceRequestTracking;