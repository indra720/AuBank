import { useState } from "react";
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowForward,
} from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link for navigation
import loginimg from "../assets/login-right.jpg"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate login API call
      console.log("Login attempt with:", { email, password });
      alert("Login successful! (Simulated)");
      // In a real app, you would redirect here using navigate('/dashboard')
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 font-sans antialiased flex  justify-center items-center ">
      <div className=" h-auto w-auto lg:h-1/2  lg:max-w-6xl  flex  justify-center items-center border rounded-2xl overflow-hidden shadow-2xl bg-white ">
       {/* left side section */}
        <div className="max-w-2xl md:flex hidden">
          <img src={loginimg} alt="" className="h-100 w-100"/>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 flex items-center justify-center  p-2">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden p-8 lg:p-10 lg:shadow-none lg:border-none">
            {/* Mobile Logo (visible only on small screens) */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md">
                AU
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center lg:text-left">
              Welcome Back
            </h1>
            <p className="text-gray-600 mb-8 text-center lg:text-left">
              Sign in to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute top-5 left-0    flex items-center pl-3">
                    <MdEmail size={20} className="text-gray-400" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    className={`w-full pl-10 pr-4 py-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute top-5 left-0 flex items-center pl-3">
                    <MdLock size={20} className="text-gray-400" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`w-full pl-10 pr-10 py-3 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <MdVisibilityOff
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <MdVisibility
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </span>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link
                  to="#"
                  className="font-medium text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign In <MdArrowForward size={20} />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
