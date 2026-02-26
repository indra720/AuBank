// src/pages/UserManagement.jsx
import { useState } from 'react';
import {
  MdDashboard,
  MdPeople,
  MdSecurity,
  MdHistory,
  MdAdd,
  MdSearch,
  MdNotifications,
  MdSettings,
  MdPlayCircleOutline,
  MdVisibility,
  MdPersonAdd,
  MdEdit,
  MdBlock,
  MdCheckCircle,
  MdAccessTime,
  MdChatBubbleOutline,
  MdChevronRight,
  MdClose,
  MdEmail,
  MdPhone,
  MdBadge,
  MdWork,
  MdCalendarToday,
  MdCameraAlt
} from 'react-icons/md';

function UserManagement() {
  const [activeFilter, setActiveFilter] = useState('All Staff');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const staff = [
    { initials: 'SC', name: 'Sarah Chen', email: 'sarah@bankportal.com', role: 'AGENT', permissions: ['video', 'chat'], status: 'Active', last: '2 mins ago', color: 'green', id: 'EMP-8841' },
    { initials: 'JW', name: 'James Wilson', email: 'jwilson@bankportal.com', role: 'MANAGER', permissions: ['full'], status: 'Active', last: '1 hour ago', color: 'blue', id: 'EMP-8842' },
    { initials: 'MG', name: 'Maria Garcia', email: 'maria@bankportal.com', role: 'AUDITOR', permissions: ['audit'], status: 'Offline', last: '3 days ago', color: 'gray', id: 'EMP-8843' },
    { initials: 'RF', name: 'Robert Fox', email: 'robert@bankportal.com', role: 'AGENT', permissions: ['video'], status: 'Active', last: 'Just now', color: 'green', id: 'EMP-8844' },
  ];

  const openEditModal = (person) => {
    setSelectedStaff(person);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col relative">
      
      {/* DETAILED MODALS - KEPT THE UNIQUE DESIGN */}
      {isAddModalOpen && <StaffModal title="Onboard New Staff" onClose={() => setIsAddModalOpen(false)} actionLabel="Create Account" />}
      {isEditModalOpen && <StaffModal title="Update Staff Profile" onClose={() => setIsEditModalOpen(false)} staff={selectedStaff} actionLabel="Save Changes" />}

      {/* Header - Original Look */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-orange-600">BankAdmin</div>
          <div className="relative hidden md:block w-72">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input type="text" placeholder="Search staff, roles..." className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-orange-600 relative"><MdNotifications size={24} /><span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span></button>
          <button className="p-2 text-gray-600 hover:text-orange-600"><MdSettings size={24} /></button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold text-sm">SJ</div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-medium text-gray-900">Sarah Jenkins</div>
              <div className="text-xs text-gray-500 font-bold">Bank Admin</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar - Original Look */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-r lg:border-gray-200 shrink-0">
          <div className="p-4 lg:p-5">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">MAIN MENU</h3>
            <nav className="space-y-1 mb-10">
              {[{ icon: MdDashboard, label: 'Dashboard' }, { icon: MdPeople, label: 'Staff Management', active: true }, { icon: MdSecurity, label: 'Roles' }, { icon: MdHistory, label: 'Logs' }].map((item) => (
                <a key={item.label} href="#" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${item.active ? "bg-orange-50 text-orange-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`}>
                  <item.icon size={20} /> {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 shadow-md transition-all active:scale-95">
              <MdAdd size={20} /> Add New Staff
            </button>
          </div>

          {/* KPI Cards - Original Look */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-sm text-gray-600 mb-1 flex items-center gap-2 font-medium"><MdPeople className="text-orange-600" /> TOTAL STAFF</div><div className="text-3xl font-bold mt-2 text-gray-900 tracking-tight">1,284</div></div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-sm text-gray-600 mb-1 flex items-center gap-2 font-medium"><MdCheckCircle className="text-green-600" /> ONLINE NOW</div><div className="text-3xl font-bold mt-2 text-green-700 tracking-tight">42</div></div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><div className="text-sm text-gray-600 mb-1 flex items-center gap-2 font-medium"><MdAccessTime className="text-blue-600" /> MANAGERS</div><div className="text-3xl font-bold mt-2 text-gray-900 tracking-tight">18</div></div>
          </div>

          {/* Staff Table - ALL DATA RESTORED */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">STAFF MEMBER</th>
                    <th className="px-6 py-4">ROLE</th>
                    <th className="px-6 py-4">ACCESS PERMISSIONS</th>
                    <th className="px-6 py-4">STATUS</th>
                    <th className="px-6 py-4">LAST LOGIN</th>
                    <th className="px-6 py-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {staff.map((person, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 text-xs">{person.initials}</div>
                          <div><div className="font-medium text-gray-900">{person.name}</div><div className="text-xs text-gray-500">{person.email}</div></div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${person.role === "AGENT" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>{person.role}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex gap-2">
                          {person.permissions.includes('video') && <MdPlayCircleOutline className="text-gray-500" size={20} />}
                          {person.permissions.includes('chat') && <MdChatBubbleOutline className="text-gray-500" size={20} />}
                          {person.permissions.includes('full') && <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Full Access</span>}
                          {person.permissions.includes('audit') && <MdVisibility className="text-gray-500" size={20} />}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${person.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                          <span className={`w-2 h-2 rounded-full ${person.color === "green" ? "bg-green-500" : "bg-gray-500"}`}></span> {person.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500 font-medium">{person.last}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-right">
                        <div className="flex gap-3 justify-end">
                          <button onClick={() => openEditModal(person)} className="text-orange-600 hover:text-orange-800"><MdEdit size={18} /></button>
                          <button className="text-gray-600 hover:text-red-600"><MdBlock size={18} /></button>
                        </div>
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

/* UNIQUE & DETAILED MODAL COMPONENT (Only part updated) */
function StaffModal({ title, onClose, staff, actionLabel }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-md shadow-2xl overflow-hidden font-sans animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center"><MdPersonAdd size={24} /></div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><MdClose size={24} /></button>
        </div>
        <form className="p-8 space-y-8 overflow-y-auto max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-50">
            <div className="relative group">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:border-orange-200 transition-all cursor-pointer">
                {staff ? <span className="text-2xl font-bold text-gray-700">{staff.initials}</span> : <MdCameraAlt size={32} />}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center shadow-lg cursor-pointer"><MdEdit size={16} /></div>
            </div>
            <div className="text-center sm:text-left"><h3 className="font-bold text-gray-900 text-lg">Staff Profile Picture</h3><p className="text-sm text-gray-500 font-medium">Upload headshot for internal ID.</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l-2 border-orange-500 pl-3">Personal Info</h4>
              <InputField icon={<MdBadge />} label="Full Name" placeholder="e.g. Aditya" defaultValue={staff?.name} />
              <InputField icon={<MdEmail />} label="Email Address" type="email" placeholder="aditya@bank.com" defaultValue={staff?.email} />
              <InputField icon={<MdPhone />} label="Phone Number" type="tel" placeholder="+91 98765 43210" />
            </div>
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l-2 border-orange-500 pl-3">Work Details</h4>
              <InputField icon={<MdWork />} label="Employee ID" placeholder="EMP-0000" defaultValue={staff?.id} />
              <div className="space-y-1.5"><label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1">Role</label>
                <select defaultValue={staff?.role || 'AGENT'} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-orange-400 outline-none transition-all">
                  <option value="AGENT">VIDEO BANKING AGENT</option><option value="MANAGER">BRANCH MANAGER</option><option value="AUDITOR">COMPLIANCE AUDITOR</option>
                </select></div>
              <InputField icon={<MdCalendarToday />} label="Joining Date" type="date" />
            </div>
          </div>
          <div className="space-y-4 pt-4">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l-2 border-orange-500 pl-3">Access Permissions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Checkbox label="Video Call" active={staff?.permissions?.includes("video")} /><Checkbox label="Chat Desk" active={staff?.permissions?.includes("chat")} />
              <Checkbox label="Audit Logs" active={staff?.permissions?.includes("audit")} /><Checkbox label="Admin" active={staff?.permissions?.includes("full")} />
            </div>
          </div>
          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl text-xs font-bold hover:bg-gray-200 transition-all uppercase tracking-widest">Discard</button>
            <button type="submit" className="flex-2 py-3.5 bg-orange-600 text-white rounded-2xl text-xs font-bold hover:bg-orange-700 shadow-xl shadow-orange-900/20 transition-all active:scale-95 uppercase tracking-widest">{actionLabel}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div className="space-y-1.5"><label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 mb-1"><span className="text-orange-500">{icon}</span> {label}</label>
      <input className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-400 focus:bg-white outline-none transition-all" {...props} />
    </div>
  );
}

function Checkbox({ label, active }) {
  return (
    <label className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl border border-gray-100 cursor-pointer hover:bg-white transition-all group">
      <input type="checkbox" defaultChecked={active} className="w-4 h-4 accent-orange-600" />
      <span className="text-[11px] font-bold text-gray-600 group-hover:text-gray-900 transition-colors tracking-tight">{label}</span>
    </label>
  );
}

export default UserManagement;
