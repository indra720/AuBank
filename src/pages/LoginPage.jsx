import { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import loginimg from "../assets/login-right.jpg"

function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [mpin, setMpin] = useState("");
  const [role, setRole] = useState("customer");
  const [showMpin, setShowMpin] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!identifier) newErrors.identifier = "Identifier is required";
    if (!mpin) newErrors.mpin = "MPIN is required";
    if (mpin.length < 4) newErrors.mpin = "MPIN must be at least 4 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: identifier,
            mpin: mpin,
            role: role
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("access_token", data.access_token);
          
          // Role-based redirection
          if (role === "agent") {
            navigate("/agent-videokyc");
          } else {
            navigate("/videokyc");
          }
        } else {
          const errorData = await response.json();
          setErrors({ form: errorData.detail || "Invalid credentials. Please try again." });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ form: "Connection lost. Please check your backend." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 font-sans antialiased flex justify-center items-center p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500">
        
        {/* Left Section - Aesthetic Image */}
        <div className="hidden lg:block w-1/2 relative group">
          <img src={loginimg} alt="Login Visual" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/>
          <div className="absolute inset-0 bg-linear-to-t from-orange-600/40 to-transparent"></div>
          <div className="absolute bottom-12 left-12 text-white">
            <h2 className="text-4xl font-bold mb-2">Secure Banking</h2>
            <p className="text-orange-50 font-medium">Experience the next generation of Video KYC.</p>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-8 lg:mb-12">
              <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-600/30">
                AU
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">AU BANK</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500 mb-10">Secure login for Video KYC verification</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.form && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  {errors.form}
                </div>
              )}

              {/* Role Switcher */}
              <div className="bg-gray-100 p-1 rounded-2xl flex">
                {["customer", "agent"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                      role === r ? "bg-white text-orange-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Identifier (User ID / Phone)
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <MdEmail size={20} />
                  </span>
                  <input
                    type="text"
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border ${errors.identifier ? "border-red-500" : "border-gray-100 focus:border-orange-500"} rounded-2xl outline-none transition-all duration-300 font-medium text-gray-700`}
                    placeholder="Enter your ID"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
                {errors.identifier && <p className="mt-2 text-xs text-red-500 font-bold ml-1">{errors.identifier}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                  Secure MPIN
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <MdLock size={20} />
                  </span>
                  <input
                    type={showMpin ? "text" : "password"}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border ${errors.mpin ? "border-red-500" : "border-gray-100 focus:border-orange-500"} rounded-2xl outline-none transition-all duration-300 font-medium tracking-widest text-gray-700`}
                    placeholder="••••"
                    maxLength={6}
                    value={mpin}
                    onChange={(e) => setMpin(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowMpin(!showMpin)}
                  >
                    {showMpin ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
                {errors.mpin && <p className="mt-2 text-xs text-red-500 font-bold ml-1">{errors.mpin}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 group"
              >
                {isLoading ? "Authenticating..." : (
                  <>
                    Sign In <MdArrowForward size={22} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between text-sm">
              <span className="text-gray-400">New here?</span>
              <Link to="/register" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
