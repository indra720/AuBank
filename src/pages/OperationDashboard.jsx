// src/pages/OperationDashboard.jsx
import { useState, useEffect } from 'react';
import { MdRefresh, MdCheckCircle, MdErrorOutline, MdSearch, MdChevronRight, MdHistory } from 'react-icons/md';

function OperationDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resolvingId, setResolvingId] = useState(null);
  const [agentFeedback, setAgentFeedback] = useState("");
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchPendingTickets = async () => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    console.log("Using token:", token); // Log token for debugging
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agent/tickets/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Fetch failed with status:", response.status, errorData);
        setError(`Failed to fetch pending tickets (Status: ${response.status})`);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Something went wrong (Network Error).");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTickets();
  }, []);

  const handleResolveTicket = async () => {
    if (!selectedTicket || !agentFeedback) {
      alert("Please provide feedback to resolve the ticket.");
      return;
    }

    setResolvingId(selectedTicket.id);
    const token = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/agent/tickets/resolve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ticket_id: selectedTicket.id,
          feedback: agentFeedback,
          status: "resolved"
        }),
      });

      if (response.ok) {
        alert("Ticket Resolved Successfully!");
        setTickets(tickets.filter(t => t.id !== selectedTicket.id));
        setShowResolveModal(false);
        setSelectedTicket(null);
        setAgentFeedback("");
      } else {
        alert("Failed to resolve ticket.");
      }
    } catch (err) {
      console.error("Error resolving ticket:", err);
      alert("Something went wrong.");
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      
      {/* 1. TOP NAVBAR */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="relative w-full md:max-w-md">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tickets by ID or subject..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden xl:flex gap-6 text-sm font-bold uppercase tracking-wider">
            <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1">Queue</a>
            <a href="#" className="text-gray-500 hover:text-orange-600">Resolved</a>
            <a href="#" className="text-gray-500 hover:text-orange-600">Insights</a>
          </nav>
          <button onClick={fetchPendingTickets} className="text-gray-400 hover:text-orange-600 transition-colors">
            <MdRefresh size={24} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* 2. SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0">
          <div className="p-5">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Agent Console</div>
            <ul className="flex flex-col space-y-2">
              {[
                { label: 'Pending Tickets', active: true, count: tickets.length },
                { label: 'My Resolution History' },
                { label: 'Compliance Alerts', count: 12 },
                { label: 'Team Performance' },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all ${
                      item.active
                        ? 'bg-orange-50 text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    {item.count !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${item.active ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 3. MAIN CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Operational Console</h1>
              <p className="text-sm text-gray-500 font-medium mt-1">Manage and resolve customer service requests in real-time.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
                Export Data
              </button>
              <button 
                onClick={fetchPendingTickets}
                className="px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 shadow-lg shadow-orange-900/20 transition-all flex items-center gap-2"
              >
                <MdRefresh size={16} className={loading ? "animate-spin" : ""} /> REFRESH QUEUE
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <KPICard label="QUEUE SIZE" value={tickets.length} trend="Live" color="orange" />
            <KPICard label="AVG. WAIT TIME" value="12m" trend="Stable" color="blue" />
            <KPICard label="URGENT TASKS" value="08" trend="High Priority" color="red" />
            <KPICard label="RESOLVED TODAY" value="142" trend="↑ 12%" color="green" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ticket Queue List */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                <h2 className="font-black text-gray-900 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Active Ticket Queue
                </h2>
                <span className="text-[10px] font-bold text-gray-400">WAITING: {tickets.length} CUSTOMERS</span>
              </div>
              
              <div className="flex-1 overflow-y-auto min-h-[400px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full p-10 space-y-4">
                    <MdRefresh className="animate-spin text-orange-600" size={40} />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Updating Live Queue...</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-full p-10 space-y-4">
                    <MdErrorOutline className="text-red-500" size={40} />
                    <p className="text-sm font-bold text-red-500">{error}</p>
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-10 space-y-4 opacity-40">
                    <MdCheckCircle className="text-gray-300" size={48} />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Queue is empty. Good job!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {tickets.map((ticket, i) => (
                      <div 
                        key={i} 
                        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:bg-orange-50/30 transition-all cursor-pointer group"
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setShowResolveModal(true);
                        }}
                      >
                        <div className="flex gap-5 items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 font-black text-xs group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                            #{ticket.id}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 text-sm uppercase tracking-tight">{ticket.subject}</div>
                            <div className="text-xs text-gray-500 font-medium mt-1">Customer ID: {ticket.customer_id} • Raised on {new Date(ticket.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority</div>
                            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded uppercase">Standard</span>
                          </div>
                          <button className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                            <MdChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - System Alerts */}
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <h2 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  System Health
                </h2>
                <div className="space-y-6">
                  {[
                    { name: 'Ticket Engine', load: 82 },
                    { name: 'API Gateway', load: 45 },
                    { name: 'KYC Storage', load: 28 },
                  ].map((node, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-60">
                        <span>{node.name}</span>
                        <span>{node.load}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: `${node.load}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-8 w-full bg-white text-gray-900 py-3.5 rounded-2xl text-xs font-black uppercase hover:bg-orange-50 transition-colors shadow-xl">
                  Full Diagnostics
                </button>
              </div>

              <div className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-sm">
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2">
                  <MdHistory size={18} className="text-orange-600" />
                  Recent Actions
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-1 h-8 bg-green-500 rounded-full mt-1"></div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Resolved Ticket #SR102</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1 h-8 bg-orange-500 rounded-full mt-1"></div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Updated Case Notes #SR88</p>
                      <p className="text-[10px] text-gray-400 font-medium mt-0.5">15 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* RESOLVE TICKET MODAL */}
      {showResolveModal && selectedTicket && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl scale-in-center border border-white/20">
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
              <div className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em] mb-2">Resolution Console</div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">#{selectedTicket.id}: {selectedTicket.subject}</h3>
              <p className="text-sm text-gray-500 font-medium mt-2">Raised by Customer #{selectedTicket.customer_id}</p>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Customer Message</label>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-700 leading-relaxed font-medium italic">
                  "{selectedTicket.description}"
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Agent Resolution Feedback</label>
                <textarea
                  rows={4}
                  value={agentFeedback}
                  onChange={(e) => setAgentFeedback(e.target.value)}
                  placeholder="Provide details on how this ticket was resolved..."
                  className="w-full p-5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button
                onClick={() => {
                  setShowResolveModal(false);
                  setAgentFeedback("");
                }}
                className="flex-1 py-4 text-xs font-black uppercase text-gray-400 hover:bg-gray-100 rounded-2xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleResolveTicket}
                disabled={resolvingId === selectedTicket.id}
                className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black uppercase rounded-2xl shadow-xl shadow-orange-900/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {resolvingId === selectedTicket.id ? "Processing..." : "Resolve Ticket"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KPICard({ label, value, trend, color }) {
  const colors = {
    orange: "text-orange-600 bg-orange-50",
    blue: "text-blue-600 bg-blue-50",
    red: "text-red-600 bg-red-50",
    green: "text-green-600 bg-green-50",
  };
  
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${colors[color]}`}>{trend}</span>
      </div>
      <div className="text-3xl font-black text-gray-900 tracking-tighter">{value}</div>
    </div>
  );
}

export default OperationDashboard;