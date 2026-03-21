// src/pages/ServiceRequestForm.jsx
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  MdDashboard,
  MdReceipt,
  MdAccountBalance,
  MdPerson,
  MdSearch,
  MdNotifications,
  MdSettings,
  MdPhoneInTalk,
  MdHelpOutline,
  MdCancel,
  MdArrowForward,
  MdCheckCircle,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
  MdInfoOutline,
  MdVideocam,
  MdTrackChanges,
  MdAddCircleOutline
} from 'react-icons/md'

function ServiceForm() {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const accounts = [
    {
      type: "SAVINGS ACCOUNT",
      number: "XXXX XXXX 8902",
      balance: "₹1,45,280.00",
      icon: MdAccountBalance,
      color: "purple",
    },
    {
      type: "CURRENT ACCOUNT",
      number: "XXXX XXXX 1145",
      balance: "₹24,150.00",
      icon: MdAccountBalance,
      color: "indigo",
    },
  ]

  const handleSubmit = async () => {
    if (!subject || !description) {
      toast.error("Please fill in both subject and description.")
      return
    }

    setIsSubmitting(true)
    const token = localStorage.getItem("access_token")

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/customer/raise-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          description,
        }),
      })

      if (response.ok) {
        toast.success("Ticket Raised Successfully!")
        setSubject("")
        setDescription("")
      } else {
        const errorData = await response.json()
        toast.error(`Error: ${errorData.detail || "Failed to raise ticket"}`)
      }
    } catch (error) {
      console.error("Error raising ticket:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Top Navigation Bar */}
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
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">
            <MdPhoneInTalk size={18} />
            Talk to Agent
          </button>

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

      <div className="flex flex-col lg:flex-row">

        {/* Left Sidebar – always visible */}
        <aside className="bg-white border-b lg:border-r border-gray-200 lg:w-72 xl:w-80 shrink-0">
          <div className="p-5 lg:p-6">
            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">SERVICE PORTAL 101</div>
            <div className="text-sm font-medium mb-8">
              Customer ID: <span className="text-orange-600 font-semibold">8829103</span>
            </div>

            <nav className="space-y-1">
              {[
                { icon: MdDashboard,       label: 'Overview' },
                { icon: MdTrackChanges,    label: 'Request Tracking' },
                { icon: MdAddCircleOutline,label: 'New Request', active: true },
                { icon: MdVideocam,        label: 'Video Support' },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                    ${item.active
                      ? 'bg-purple-50 text-purple-700 font-medium border-l-4 border-purple-600'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-10">
              <div className="bg-gray-900 text-white rounded-xl p-5">
                <div className="text-sm font-medium mb-3 flex items-center gap-2">
                  <MdHelpOutline size={20} />
                  Need Help?
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 mt-3">
                  <MdVideocam size={20} />
                  Start Video Call
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content – Raise Ticket Form */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Raise a Service Ticket
          </h1>

          <p className="text-gray-600 mb-8">
            Submit a request for any service or report an issue.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">

            {/* Left – Sidebar Info */}
            <div className="lg:col-span-1 space-y-6">

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-5">Quick Support</h3>
                <p className="text-sm text-gray-500 mb-6">Raising a ticket helps us track your request and resolve it faster.</p>

                <div className="space-y-4">
                  {[
                    { label: 'Submit Ticket', active: true, icon: MdAddCircleOutline },
                    { label: 'Track Progress', active: false, icon: MdTrackChanges },
                    { label: 'Get Resolution', active: false, icon: MdCheckCircle },
                  ].map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 ${
                        step.active
                          ? 'border-purple-600 bg-purple-50 text-purple-700 font-medium'
                          : 'border-transparent text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <step.icon size={20} />
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-white rounded-xl p-6">
                <div className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MdHelpOutline size={22} />
                  Instant Help
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  <MdVideocam size={20} />
                  Start Video Call
                </button>
              </div>
            </div>

            {/* Center – Raise Ticket Form */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Request Details
                </h2>
                <p className="text-gray-600">
                  Please provide a clear subject and detailed description of your request.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
                    Request Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Cheque Book Request"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
                    Detailed Description
                  </label>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your request in detail..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-8">
                <div className="flex items-start gap-3">
                  <MdInfoOutline size={24} className="text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">Bank Policy</div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Tickets are usually resolved within 24-48 working hours. You will receive an SMS notification once your request is processed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => { setSubject(""); setDescription(""); }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-lg font-medium transition-all"
                >
                  Clear Form
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/10 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"} <MdArrowForward size={18} />
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

export default ServiceForm;