import { useState } from "react";
import {
  MdPhone,
  MdLock,
  MdBadge,
  MdPerson,
  MdHome,
  MdCalendarToday,
  MdArrowForward,
  MdCheckCircle,
  MdVerifiedUser,
  MdSecurity,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import loginimg from "../assets/login-right.jpg";

function RegistrationPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState("customer"); // "customer" or "agent"
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Unified Form State
  const [formData, setFormData] = useState({
    username: "",
    password: "", // Added for Agent
    mobile_number: "",
    otp: "",
    aadhar_number: "",
    aadhar_otp: "",
    pan_number: "",
    full_name: "",
    dob: "",
    address: "",
    mpin: "",
  });

  const [token, setToken] = useState(""); // State to store the access_token

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); 
  };

  // Generic API Helper with Token Support
  const callApi = async (endpoint, body, requiresToken = false) => {
    setIsLoading(true);
    setError("");
    try {
      const headers = { "Content-Type": "application/json" };
      
      const authToken = token || localStorage.getItem("access_token");
      if (requiresToken && authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error(`Error in ${endpoint}:`, data); // EXACT ERROR LOGGED HERE
        // Handle different error structures (FastAPI usually uses data.detail)
        const errorMsg = data.detail 
          ? (typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail))
          : "Verification failed";
        throw new Error(errorMsg);
      }
      return data;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // --- Step Handlers ---

  const handleStep1Submit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoading) return;

    if (role === "agent") {
      if (!formData.username || !formData.password || !formData.mobile_number || !formData.aadhar_number || !formData.pan_number) {
        return setError("All fields are required for Agent registration");
      }

      const regResult = await callApi("/api/auth/agent/register", {
        username: formData.username,
        password: formData.password,
        mobile_number: formData.mobile_number,
        aadhar_number: formData.aadhar_number,
        pan_number: formData.pan_number
      });

      if (!regResult) return; // Exit if registration failed (error already shown)
      console.log("Agent Registered Successfully!");
    } else {
      if (!formData.username || !formData.mobile_number) return setError("Username and Mobile are required");
    }

    const mobileReqResult = await callApi("/api/verify/mobile/request", { mobile_number: formData.mobile_number });
    if (mobileReqResult) setStep(2);
  };

  const handleMobileVerify = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoading || !formData.otp) return;

    const result = await callApi("/api/verify/mobile/verify", { 
      mobile_number: formData.mobile_number, 
      otp: formData.otp 
    });
    
    if (result && result.access_token) {
      console.log("Mobile Verified! Received Token:", result.access_token);
      setToken(result.access_token);
      localStorage.setItem("access_token", result.access_token); 
      setStep(3);
    }
  };

  const handleAadharRequest = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoading || !formData.aadhar_number) return;

    const result = await callApi("/api/verify/aadhar/request", { aadhar_number: formData.aadhar_number }, true);
    if (result) setStep(4);
  };

  const handleAadharVerify = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoading || !formData.aadhar_otp) return;

    const result = await callApi("/api/verify/aadhar/verify", { 
      aadhar_number: formData.aadhar_number, 
      otp: formData.aadhar_otp 
    }, true);
    if (result) setStep(5);
  };

  const handlePanVerify = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoading || !formData.pan_number) return;

    const result = await callApi("/api/verify/pan/verify", { pan_number: formData.pan_number }, true);
    if (result) setStep(6);
  };

  const handleFinalUpdate = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isLoading || !formData.full_name || !formData.dob || !formData.address || !formData.mpin) return;
    
    // 1. Update Profile Information
    const profileResult = await callApi("/api/verify/profile/update", {
      full_name: formData.full_name,
      dob: formData.dob,
      address: formData.address
    }, true);
    
    if (!profileResult) return;

    // 2. Set Secure MPIN
    const mpinResult = await callApi("/api/auth/set-mpin", {
      mpin: formData.mpin
    }, true);

    if (mpinResult) {
      console.log("Registration and MPIN setup complete!");
      // Redirect based on role
      if (role === "agent") {
        navigate("/agent-videokyc");
      } else {
        navigate("/videokyc");
      }
    }
  };

  // --- UI Components ---

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-10 px-2 relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="relative z-10 flex flex-col items-center">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-4 ${
            step === i ? "bg-orange-600 text-white border-orange-100 scale-110 shadow-lg shadow-orange-200" : 
            step > i ? "bg-green-500 text-white border-green-50" : "bg-white text-gray-400 border-gray-50"
          }`}>
            {step > i ? <MdCheckCircle size={20} /> : i}
          </div>
          <span className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap transition-colors ${step >= i ? "text-orange-600" : "text-gray-300"}`}>
            {i === 1 && "Start"}
            {i === 3 && "Aadhar"}
            {i === 5 && "PAN"}
            {i === 6 && "Profile"}
          </span>
        </div>
      ))}
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-orange-500 -translate-y-1/2 transition-all duration-500 ease-out z-0"
        style={{ width: `${((step - 1) / 5) * 100}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-100 font-sans antialiased flex justify-center items-center p-4">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-500 min-h-175">
        
        {/* Left Section - Aesthetic Sidebar */}
        <div className="hidden lg:block w-[40%] relative group bg-gray-900 overflow-hidden">
          <img src={loginimg} alt="Visual" className="h-full w-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"/>
          <div className="absolute inset-0 bg-linear-to-t from-orange-900/80 via-orange-600/20 to-transparent"></div>
          
          <div className="absolute top-12 left-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-600 font-black text-2xl shadow-2xl">
              AU
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 text-white">
            <div className="flex items-center gap-2 mb-4 opacity-80">
              <MdSecurity size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Secure Onboarding</span>
            </div>
            <h2 className="text-4xl font-black mb-4 leading-tight">
              {step === 1 && "Your Journey Begins Here"}
              {step === 2 && "Mobile Verification"}
              {step === 3 && "Aadhar Linkage"}
              {step === 4 && "Instant Aadhar Check"}
              {step === 5 && "PAN Card Verify"}
              {step === 6 && "Complete Your Profile"}
            </h2>
            <p className="text-orange-50/80 font-medium text-sm leading-relaxed max-w-sm">
              Experience the next generation of digital banking with our 100% secure and paperless Video KYC process.
            </p>
            
            <div className="mt-8 flex gap-4">
               <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs font-bold">99.9% Uptime</div>
               <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs font-bold">Bank-Grade Security</div>
            </div>
          </div>
        </div>

        {/* Right Section - Multi-Step Form */}
        <div className="w-full lg:w-[60%] p-8 lg:p-16 flex flex-col">
          <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center">
            
            <div className="mb-8 lg:hidden flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">AU</div>
              <span className="text-xl font-black text-gray-900 tracking-tight">AU BANK</span>
            </div>

            <StepIndicator />

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                {error}
              </div>
            )}

            {/* Step 1: Mobile Request / Agent Register */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-6">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">Registration</h1>
                  <p className="text-gray-400 font-medium">Choose your role and enter basic details.</p>
                </div>

                {/* Role Switcher */}
                <div className="bg-gray-100 p-1 rounded-2xl flex mb-6">
                  {["customer", "agent"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setRole(r);
                        setError("");
                      }}
                      className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
                        role === r ? "bg-white text-orange-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <Input label="Username" name="username" value={formData.username} onChange={handleChange} icon={<MdPerson/>} placeholder="Choose a unique username" />
                  
                  {role === "agent" && (
                    <>
                      <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} icon={<MdLock/>} placeholder="Create a password" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input label="Aadhar Number" name="aadhar_number" value={formData.aadhar_number} onChange={handleChange} icon={<MdVerifiedUser/>} placeholder="12-digit Aadhar" maxLength={12} />
                        <Input label="PAN Number" name="pan_number" value={formData.pan_number} onChange={handleChange} icon={<MdBadge/>} placeholder="ABCDE1234F" />
                      </div>
                    </>
                  )}

                  <Input label="Mobile Number" name="mobile_number" value={formData.mobile_number} onChange={handleChange} icon={<MdPhone/>} placeholder="Enter 10-digit mobile number" maxLength={10} />
                  
                  <Button loading={isLoading} text={role === "agent" ? "Register & Get OTP" : "Get Verification OTP"} />
                </div>
              </form>
            )}

            {/* Step 2: Mobile Verify */}
            {step === 2 && (
              <form onSubmit={handleMobileVerify} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">Verify Mobile</h1>
                  <p className="text-gray-400 font-medium">Confirm your number and enter the 6-digit code.</p>
                </div>
                <div className="space-y-5">
                  <Input label="Mobile Number" name="mobile_number" value={formData.mobile_number} onChange={handleChange} icon={<MdPhone/>} placeholder="Enter 10-digit mobile number" maxLength={10} />
                  <Input label="Enter OTP" name="otp" value={formData.otp} onChange={handleChange} icon={<MdLock/>} placeholder="••••••" maxLength={6} />
                  <Button loading={isLoading} text="Verify & Continue" />
                  <button type="button" onClick={() => setStep(1)} className="w-full text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest mt-4">Go Back</button>
                </div>
              </form>
            )}

            {/* Step 3: Aadhar Request */}
            {step === 3 && (
              <form onSubmit={handleAadharRequest} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">Aadhar Link</h1>
                  <p className="text-gray-400 font-medium">We need your Aadhar number for paperless KYC.</p>
                </div>
                <div className="space-y-5">
                  <Input label="Aadhar Number" name="aadhar_number" value={formData.aadhar_number} onChange={handleChange} icon={<MdVerifiedUser/>} placeholder="Enter 12-digit Aadhar number" maxLength={12} />
                  <Button loading={isLoading} text="Request Aadhar OTP" />
                </div>
              </form>
            )}

            {/* Step 4: Aadhar Verify */}
            {step === 4 && (
              <form onSubmit={handleAadharVerify} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">Verify Aadhar</h1>
                  <p className="text-gray-400 font-medium">Confirm your Aadhar and enter the OTP sent by UIDAI.</p>
                </div>
                <div className="space-y-5">
                  <Input label="Aadhar Number" name="aadhar_number" value={formData.aadhar_number} onChange={handleChange} icon={<MdVerifiedUser/>} placeholder="Enter 12-digit Aadhar number" maxLength={12} />
                  <Input label="Aadhar OTP" name="aadhar_otp" value={formData.aadhar_otp} onChange={handleChange} icon={<MdLock/>} placeholder="••••••" maxLength={6} />
                  <Button loading={isLoading} text="Verify Aadhar" />
                  <button type="button" onClick={() => setStep(3)} className="w-full text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest mt-4">Go Back</button>
                </div>
              </form>
            )}

            {/* Step 5: PAN Verify */}
            {step === 5 && (
              <form onSubmit={handlePanVerify} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">PAN Verification</h1>
                  <p className="text-gray-400 font-medium">Finally, provide your Permanent Account Number.</p>
                </div>
                <div className="space-y-5">
                  <Input label="PAN Card Number" name="pan_number" value={formData.pan_number} onChange={handleChange} icon={<MdBadge/>} placeholder="ABCDE1234F" />
                  <Button loading={isLoading} text="Verify PAN Details" />
                </div>
              </form>
            )}

            {/* Step 6: Profile Update */}
            {step === 6 && (
              <form onSubmit={handleFinalUpdate} className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="mb-6">
                  <h1 className="text-3xl font-black text-gray-900 mb-2">Final Step</h1>
                  <p className="text-gray-400 font-medium">Review your details and set your secure MPIN.</p>
                </div>
                <div className="space-y-4">
                  <Input label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} icon={<MdPerson/>} placeholder="As per documents" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} icon={<MdCalendarToday/>} placeholder="YYYY-MM-DD" />
                    <Input label="Set Secure MPIN" name="mpin" value={formData.mpin} onChange={handleChange} icon={<MdLock/>} type="password" placeholder="4-6 Digits" maxLength={6} />
                  </div>
                  <Input label="Permanent Address" name="address" value={formData.address} onChange={handleChange} icon={<MdHome/>} placeholder="Enter your full address" />
                  <Button loading={isLoading} text="Finish Registration" />
                </div>
              </form>
            )}

            {step === 1 && (
              <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-between text-sm">
                <span className="text-gray-400 font-medium">Already have an account?</span>
                <button onClick={() => navigate("/login")} className="font-bold text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-widest text-xs">Sign In</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper UI Components ---

function Input({ label, name, value, onChange, icon, type="text", placeholder, maxLength }) {
  return (
    <div className="group">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1 transition-colors group-focus-within:text-orange-500">{label}</label>
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-orange-500 transition-colors duration-300">{icon}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full pl-14 pr-6 py-4.5 bg-gray-50 border border-gray-100 focus:border-orange-500 focus:bg-white rounded-2xl outline-none transition-all duration-300 font-semibold text-gray-700 placeholder:text-gray-300 placeholder:font-normal"
        />
      </div>
    </div>
  );
}

function Button({ loading, text }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-200 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 group mt-2"
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        </div>
      ) : (
        <>
          {text} <MdArrowForward size={22} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}

export default RegistrationPage;
