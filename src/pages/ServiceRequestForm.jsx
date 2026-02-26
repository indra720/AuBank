// App.jsx
import { useState } from 'react'
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
  const [selectedAccount, setSelectedAccount] = useState(null)

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

        {/* Main content – Request Wizard */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Cheque Book Request
          </h1>

          <p className="text-gray-600 mb-8">
            Get your new cheque book delivered to your doorstep.
          </p>

          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm font-medium text-gray-600 mb-3">
              <span className="text-purple-700 font-semibold">Step 1 of 3</span>
              <span>Next: Book Details</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600" style={{ width: '33.33%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">

            {/* Left – Wizard Steps */}
            <div className="lg:col-span-1 space-y-6">

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-5">Request Wizard</h3>

                <div className="space-y-4">
                  {[
                    { label: 'Select Account', active: true, icon: MdRadioButtonChecked },
                    { label: 'Book Details', active: false, icon: MdRadioButtonUnchecked },
                    { label: 'Review & Confirm', active: false, icon: MdRadioButtonUnchecked },
                    { label: 'Track Status', active: false, icon: MdTrackChanges },
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

              {/* Help Card */}
              <div className="bg-gray-900 text-white rounded-xl p-6">
                <div className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MdHelpOutline size={22} />
                  Need Help?
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  <MdVideocam size={20} />
                  Start Video Call
                </button>

                <div className="mt-6 space-y-3 text-sm">
                  <a href="#" className="flex items-center gap-2 hover:text-orange-300">
                    View FAQs
                  </a>
                  <a href="#" className="flex items-center gap-2 hover:text-orange-300">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>

            {/* Center – Select Account */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Select Your Account
                </h2>
                <p className="text-gray-600">
                  Please choose the savings or current account for the new cheque book.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {accounts.map((acc, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedAccount(i)}
                    className={`
                      p-6 border-2 rounded-xl cursor-pointer transition-all
                      ${selectedAccount === i
                        ? 'border-purple-600 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white bg-${acc.color}-600`}>
                        <acc.icon size={28} />
                      </div>
                      {selectedAccount === i ? (
                        <MdRadioButtonChecked size={28} className="text-purple-600" />
                      ) : (
                        <MdRadioButtonUnchecked size={28} className="text-gray-300" />
                      )}
                    </div>

                    <div className="font-semibold text-lg mb-1">{acc.type}</div>
                    <div className="text-sm text-gray-600 mb-3">{acc.number}</div>

                    <div className="text-sm">
                      Available Balance <span className="font-bold text-gray-900">{acc.balance}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 mb-8">
                <div className="flex items-start gap-3">
                  <MdInfoOutline size={24} className="text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">Standard Delivery</div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Requests submitted before 4 PM will be processed on the same business day. Delivery usually takes 5-7 working days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium">
                  Cancel Request
                </button>
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
                  Continue to Details <MdArrowForward size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Step indicators at bottom */}
          <div className="mt-12 flex justify-center gap-4">
            <div className="w-3 h-3 rounded-full bg-purple-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default ServiceForm;