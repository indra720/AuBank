// App.jsx
import { useState } from "react";
import {
  MdDashboard,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdMonetizationOn,
  MdAssessment,
  MdSearch,
  MdNotifications,
  MdPerson,
  MdPhoneInTalk,
  MdLock,
  MdRefresh,
  MdUpgrade,
  MdBook,
  MdReceipt,
  MdTune,
  MdRedeem,
  MdChevronRight,
  MdTrackChanges,
} from "react-icons/md";

function ServiceRequest() {
  const [activeCategory, setActiveCategory] = useState("Card Services");

  const categories = [
    {
      name: "Card Services",
      icon: MdCreditCard,
      active: activeCategory === "Card Services",
    },
    {
      name: "Account Services",
      icon: MdAccountBalanceWallet,
      active: activeCategory === "Account Services",
    },
    {
      name: "Loan Services",
      icon: MdMonetizationOn,
      active: activeCategory === "Loan Services",
    },
    {
      name: "Wealth Management",
      icon: MdAssessment,
      active: activeCategory === "Wealth Management",
    },
  ];

  const cardServices = [
    {
      title: "Request New Card",
      desc: "Apply for a new credit or debit card with customized limits.",
      action: "Apply Now",
      icon: MdCreditCard,
    },
    {
      title: "Block/Unblock Card",
      desc: "Temporarily block or permanently disable your lost or stolen card.",
      action: "Manage Security",
      icon: MdLock,
    },
    {
      title: "Generate PIN",
      desc: "Set or reset your card's secret PIN instantly and securely.",
      action: "Reset PIN",
      icon: MdRefresh,
    },
    {
      title: "Upgrade Card",
      desc: "View eligibility and upgrade to a premium card with better rewards.",
      action: "Check Eligibility",
      icon: MdUpgrade,
    },
    {
      title: "Request Checkbook",
      desc: "Get a new checkbook delivered to your registered address.",
      action: "Order Now",
      icon: MdBook,
    },
    {
      title: "Card Statement",
      desc: "View and download your monthly billing and transaction history.",
      action: "Download",
      icon: MdReceipt,
    },
    {
      title: "Limit Management",
      desc: "Set daily limits for domestic and international transactions.",
      action: "Configure",
      icon: MdTune,
    },
    {
      title: "Redeem Rewards",
      desc: "Use your accumulated reward points for shopping or cashback.",
      action: "Redeem",
      icon: MdRedeem,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
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
            <MdSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button className="hidden sm:flex items-center gap-2 px-5 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700">
            <MdPhoneInTalk size={18} />
            Talk to Agent
          </button>

          <button className="p-2 text-gray-600 hover:text-orange-600 relative">
            <MdNotifications size={24} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              2
            </span>
          </button>

          <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-semibold">
            AV
          </div>
        </div>
      </header>

      {/* Parent Container - Flex Col for mobile, Row for LG */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar – vertical list */}
        <aside className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto shrink-0 transition-all duration-300">
          <div className="px-4 py-3 lg:p-5">
            <div className="flex flex-col gap-1.5">
              {[
                { icon: MdDashboard, label: "Home", active: true },
                { icon: MdReceipt, label: "Requests" },
                { icon: MdRedeem, label: "Offers" },
                { icon: MdTrackChanges, label: "Tracking" },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className={`
                    flex items-center gap-3 px-5 py-2.5 rounded-lg text-sm transition-all
                    ${
                      item.active
                        ? "bg-orange-50 text-orange-700 font-medium lg:border-l-4 border-orange-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <item.icon size={20} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Service Request Catalog
            </h1>

            <p className="text-gray-600 mb-8 max-w-3xl">
              Manage your banking needs instantly. Select a category below or
              use the search bar to find a specific service.
            </p>

            {/* Category Tabs */}
            <div className="mb-8 overflow-x-auto pb-2">
              <div className="flex gap-2 sm:gap-3 border-b border-gray-200 min-w-max">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`
                  flex items-center gap-2 px-5 sm:px-6 py-3 text-sm font-medium whitespace-nowrap
                  border-b-2 transition-colors
                  ${
                    cat.active
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }
                `}
                  >
                    <cat.icon size={20} />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {cardServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="h-2 bg-linear-to-r from-orange-400 via-orange-500 to-orange-600"></div>

                  <div className="p-6">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 text-orange-600">
                      <service.icon size={28} />
                    </div>

                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-5 min-h-12">
                      {service.desc}
                    </p>

                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 group-hover:underline"
                    >
                      {service.action} <MdChevronRight size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ServiceRequest;
