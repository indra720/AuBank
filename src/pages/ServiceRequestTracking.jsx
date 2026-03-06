// src/pages/ServiceReuestTracking.jsx
import { useState, useEffect } from 'react'
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
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTicket, setSelectedTicket] = useState(null)

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem("access_token")
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/customer/my-tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setTickets(data)
          if (data.length > 0) {
            setSelectedTicket(data[0]) // Default selection
          }
        } else {
          setError("Failed to load tickets.")
        }
      } catch (err) {
        console.error("Error fetching tickets:", err)
        setError("Something went wrong.")
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

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
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID / SUBJECT</th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">DATE</th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">STATUS</th>
                        <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {loading ? (
                        <tr><td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">Loading your requests...</td></tr>
                      ) : error ? (
                        <tr><td colSpan="4" className="px-6 py-10 text-center text-sm text-red-500">{error}</td></tr>
                      ) : (activeTab === 'Active Requests' ? tickets.filter(t => t.status !== 'resolved') : tickets.filter(t => t.status === 'resolved')).length === 0 ? (
                        <tr><td colSpan="4" className="px-6 py-10 text-center text-sm text-gray-500">No requests found in this category.</td></tr>
                      ) : (
                        (activeTab === 'Active Requests' ? tickets.filter(t => t.status !== 'resolved') : tickets.filter(t => t.status === 'resolved')).map((req, i) => (
                          <tr 
                            key={i} 
                            onClick={() => setSelectedTicket(req)}
                            className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${selectedTicket?.id === req.id ? 'bg-orange-50/30' : ''}`}
                          >
                            <td className="px-6 py-5">
                              <div className="font-bold text-gray-900 text-sm">#SR{req.id}</div>
                              <div className="text-xs text-gray-500 font-medium truncate max-w-50">{req.subject}</div>
                            </td>
                            <td className="px-6 py-5 text-xs text-gray-600 font-semibold">{formatDate(req.created_at)}</td>
                            <td className="px-6 py-5">
                              <span className={`inline-flex px-3 py-1 text-[10px] font-bold rounded-full border ${
                                req.status === 'open' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                req.status === 'resolved'   ? 'bg-green-50 text-green-600 border-green-100' :
                                'bg-blue-50 text-blue-600 border-blue-100'
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
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail View Card */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-200 bg-gray-50/30">
                    <div className="text-[10px] font-bold text-orange-600 tracking-widest uppercase mb-1">LIVE TRACKING</div>
                    <h2 className="font-bold text-gray-900">Request Details</h2>
                    {selectedTicket && (
                      <div className="text-xs text-gray-500 mt-1 font-medium">SR ID: <span className="text-gray-900">SR{selectedTicket.id}</span></div>
                    )}
                  </div>

                  <div className="p-6">
                    {selectedTicket ? (
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                          <p className="text-sm font-bold text-gray-900">{selectedTicket.subject}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Description</p>
                          <div className="text-xs text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                            {selectedTicket.description}
                          </div>
                        </div>
                        {selectedTicket.agent_feedback && (
                          <div>
                            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">Agent Feedback</p>
                            <div className="text-xs text-green-700 bg-green-50 p-4 rounded-xl border border-green-100 leading-relaxed">
                              {selectedTicket.agent_feedback}
                            </div>
                          </div>
                        )}
                        
                        <div className="relative space-y-8 before:absolute before:left-2.75 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100 pt-4">
                          <div className="relative flex gap-4">
                            <div className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm bg-orange-600">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900">Ticket Raised</div>
                              <div className="text-[11px] text-gray-500 font-medium mt-0.5">{formatDate(selectedTicket.created_at)}</div>
                            </div>
                          </div>
                          <div className="relative flex gap-4">
                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${selectedTicket.status !== 'open' ? 'bg-orange-600' : 'bg-gray-200'}`}>
                              {selectedTicket.status !== 'open' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                            </div>
                            <div>
                              <div className={`text-sm font-bold ${selectedTicket.status !== 'open' ? 'text-gray-900' : 'text-gray-400'}`}>
                                {selectedTicket.status === 'resolved' ? 'Resolved' : 'In Processing'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">Select a request to view details.</p>
                    )}
                    
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
                    { label: "TOTAL REQUESTS", value: tickets.length, icon: MdReceipt, color: "gray" },
                    { label: "OPEN", value: tickets.filter(t => t.status === 'open').length, icon: MdTrackChanges, color: "orange" },
                    { label: "RESOLVED", value: tickets.filter(t => t.status === 'resolved').length, icon: MdCheckCircle, color: "green" },
                    { label: "AVG. TIME", value: "1.2d", icon: MdSchedule, color: "blue" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm transition-all hover:shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg bg-gray-50 text-orange-600`}>
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