// import { useState } from 'react'
// import { MdPerson, MdEmail, MdLock, MdPhone, MdVisibility, MdVisibilityOff, MdArrowForward } from 'react-icons/md'
// import { Link } from 'react-router-dom'; // Import Link for navigation

// function RegistrationPage() {
//   const [fullName, setFullName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [agreeToTerms, setAgreeToTerms] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [errors, setErrors] = useState({})

//   const validate = () => {
//     let newErrors = {}
//     if (!fullName) newErrors.fullName = 'Full Name is required'
//     if (!email) newErrors.email = 'Email is required'
//     else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email address is invalid'
//     if (!password) newErrors.password = 'Password is required'
//     else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
//     else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) newErrors.password = 'Password must contain uppercase, lowercase, number, and special character'
//     if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required'
//     else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
//     if (!phoneNumber) newErrors.phoneNumber = 'Phone Number is required'
//     else if (!/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = 'Phone Number must be 10 digits'
//     if (!agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (validate()) {
//       // Simulate registration API call
//       console.log('Registration data:', { fullName, email, password, phoneNumber, agreeToTerms })
//       alert('Registration successful! (Simulated)')
//       // In a real app, you might redirect to login using navigate('/login')
//     } else {
//       console.log('Validation failed')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-br from-orange-50 to-orange-100 font-sans antialiased flex flex-col lg:flex-row">
//       {/* Left Section - Image/Graphic */}
//       <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-orange-600 relative overflow-hidden p-8">
//         <div className="absolute inset-0 z-0 opacity-10">
//           {/* Abstract pattern */}
//           <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
//             <defs>
//               <pattern id="pattern-grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
//                 <path d="M30 0L0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#pattern-grid)" />
//           </svg>
//         </div>
//         <div className="relative z-10 text-white text-center">
//           <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 font-bold text-5xl shadow-lg">
//             AU
//           </div>
//           <h2 className="text-4xl font-extrabold mb-3 leading-tight">Your Journey Starts Here.</h2>
//           <p className="text-orange-100 text-lg max-w-md mx-auto">
//             Experience seamless banking, secure transactions, and personalized services with AuBank.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Registration Form */}
//       <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-12">
//         <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative">
          
//           {/* Mobile Logo (visible only on small screens) */}
//           <div className="lg:hidden flex items-center justify-center pt-8 mb-4">
//             <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-md">
//               AU
//             </div>
//           </div>

//           {/* Scrollable content container with padding */}
//           <div className="absolute inset-0 p-8 lg:p-10 overflow-y-auto scrollbar-hide">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center lg:text-left">Create Your Account</h1>
//             <p className="text-gray-600 mb-8 text-center lg:text-left">Join AuBank for a seamless banking experience</p>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Full Name */}
//               <div>
//                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <MdPerson size={20} className="text-gray-400" />
//                   </span>
//                   <input
//                     type="text"
//                     id="fullName"
//                     className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
//                     placeholder="John Doe"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                   />
//                   {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
//                 </div>
//               </div>

//               {/* Email Address */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <MdEmail size={20} className="text-gray-400" />
//                   </span>
//                   <input
//                     type="email"
//                     id="email"
//                     className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <MdPhone size={20} className="text-gray-400" />
//                   </span>
//                   <input
//                     type="tel"
//                     id="phoneNumber"
//                     className={`w-full pl-10 pr-4 py-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
//                     placeholder="e.g., 9876543210"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                   {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <MdLock size={20} className="text-gray-400" />
//                   </span>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     className={`w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <span
//                     className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <MdVisibilityOff size={20} className="text-gray-400 hover:text-gray-600" /> : <MdVisibility size={20} className="text-gray-400 hover:text-gray-600" />}
//                   </span>
//                   {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                     <MdLock size={20} className="text-gray-400" />
//                   </span>
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     id="confirmPassword"
//                     className={`w-full pl-10 pr-10 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300`}
//                     placeholder="••••••••"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                   <span
//                     className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <MdVisibilityOff size={20} className="text-gray-400 hover:text-gray-600" /> : <MdVisibility size={20} className="text-gray-400 hover:text-gray-600" />}
//                   </span>
//                   {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
//                 </div>
//               </div>

//               {/* Terms and Conditions */}
//               <div className="flex items-start">
//                 <input
//                   type="checkbox"
//                   id="agreeToTerms"
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
//                   checked={agreeToTerms}
//                   onChange={(e) => setAgreeToTerms(e.target.checked)}
//                 />
//                 <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
//                   I agree to the{' '}
//                   <Link to="#" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
//                     Terms and Conditions
//                   </Link>
//                 </label>
//               </div>
//               {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}

//               {/* Register Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5"
//               >
//                 Register <MdArrowForward size={20} />
//               </button>
//             </form>

//             {/* Login Link */}
//             <p className="mt-8 text-center text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
//                 Login here
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }








import { useState } from "react";

// ── SVG Icons (no external dependency needed) ──
const EyeIcon = ({ open }) => open ? (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
) : (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

// ── Reusable Input Field ──
function InputField({ id, label, type = "text", value, onChange, placeholder, icon: Icon, error, rightSlot, onFocus, onBlur, isFocused }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[10px] font-semibold tracking-widest uppercase text-stone-500 select-none">
        {label}
      </label>
      <div className="relative flex items-center">
        <span className={`absolute left-3.5 pointer-events-none transition-colors duration-200 ${isFocused ? "text-orange-500" : "text-stone-300"}`}>
          <Icon />
        </span>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full h-12 pl-10 pr-10 rounded-xl text-sm text-stone-800 bg-white placeholder-stone-300
            border outline-none transition-all duration-200
            ${error
              ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-100 focus:border-red-400"
              : "border-stone-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            }`}
        />
        {rightSlot && (
          <span className="absolute right-3 flex items-center">{rightSlot}</span>
        )}
      </div>
      {error && (
        <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 mt-0.5">
          <span>↳</span>{error}
        </p>
      )}
    </div>
  );
}

// ── Main Component ──
export default function RegistrationPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [focused, setFocused] = useState(null);
  const [success, setSuccess] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone)) e.phone = "Must be exactly 10 digits";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(form.password))
      e.password = "Needs upper, lower, number & special char";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!terms) e.terms = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const focus = (field) => () => setFocused(field);
  const blur = () => setFocused(null);

  return (
    <div className="min-h-screen flex bg-[#0d0805]" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ══════════════════════════════════
          LEFT PANEL — Dark editorial side
         ══════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-12 overflow-hidden">

        {/* Background grid lines */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute bottom-0 left-0 w-3/4 h-3/5 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at bottom left, rgba(234,88,12,0.28) 0%, transparent 65%)" }} />
        <div className="absolute top-0 right-0 w-1/2 h-2/5 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(251,146,60,0.12) 0%, transparent 65%)" }} />

        {/* Brand Mark */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg"
            style={{ background: "linear-gradient(135deg, #ea580c, #fb923c)", boxShadow: "0 8px 28px rgba(234,88,12,0.4)", fontFamily: "Georgia, serif" }}
          >
            AU
          </div>
          <span className="text-white text-lg font-bold tracking-wide" style={{ fontFamily: "Georgia, serif" }}>
            Au<span className="text-orange-400">Bank</span>
          </span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-7 w-fit px-4 py-1.5 rounded-full border border-orange-600/30 bg-orange-600/10">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-[2.5px] uppercase text-orange-400">New Account</span>
          </div>

          {/* Headline */}
          <h2
            className="text-white leading-[1.06] mb-6"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(38px, 3.5vw, 56px)", fontWeight: 900 }}
          >
            Banking<br />
            <span style={{ WebkitTextStroke: "1.5px #fb923c", color: "transparent" }}>Reimagined</span><br />
            For You.
          </h2>

          <p className="text-white/40 text-sm leading-[1.8] max-w-xs font-light">
            Secure. Smart. Seamless. Open your account in minutes and experience next-generation personal banking.
          </p>
        </div>

        {/* Stats */}
        <div className="relative z-10 flex items-center gap-8">
          {[["2M+", "Customers"], ["99.9%", "Uptime"], ["256-bit", "Encryption"]].map(([num, label], i, arr) => (
            <div key={label} className="flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-2xl" style={{ fontFamily: "Georgia, serif" }}>{num}</span>
                <span className="text-white/30 text-[9px] tracking-[1.5px] uppercase font-medium">{label}</span>
              </div>
              {i < arr.length - 1 && <div className="w-px h-10 bg-white/10" />}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          RIGHT PANEL — Form side
         ══════════════════════════════════ */}
      <div className="flex-1 bg-[#faf8f6] flex items-center justify-center px-6 py-10 overflow-y-auto relative">

        {/* Subtle top-right ambient glow */}
        <div
          className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, rgba(234,88,12,0.07) 0%, transparent 70%)" }}
        />

        <div className="w-full max-w-115 relative z-10">

          {/* Mobile Brand (visible on sm screens) */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
              style={{ background: "linear-gradient(135deg, #ea580c, #fb923c)", fontFamily: "Georgia, serif" }}>
              AU
            </div>
            <span className="text-stone-800 text-lg font-bold" style={{ fontFamily: "Georgia, serif" }}>
              Au<span className="text-orange-500">Bank</span>
            </span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-0.5 bg-orange-500 rounded-full" />
              <span className="text-[10px] font-semibold tracking-[2.5px] uppercase text-orange-500">Create Account</span>
            </div>
            <h1
              className="text-stone-900 leading-[1.08] mb-2"
              style={{ fontFamily: "Georgia, serif", fontSize: "38px", fontWeight: 900 }}
            >
              Start Your<br />Journey.
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              Fill in your details to open your AuBank account today.
            </p>
          </div>

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Full Name */}
            <InputField
              id="fullName" label="Full Name" value={form.fullName} onChange={set("fullName")}
              placeholder="John Doe" icon={PersonIcon} error={errors.fullName}
              isFocused={focused === "fullName"} onFocus={focus("fullName")} onBlur={blur}
            />

            {/* Email */}
            <InputField
              id="email" label="Email Address" type="email" value={form.email} onChange={set("email")}
              placeholder="you@example.com" icon={EmailIcon} error={errors.email}
              isFocused={focused === "email"} onFocus={focus("email")} onBlur={blur}
            />

            {/* Phone */}
            <InputField
              id="phone" label="Phone Number" type="tel" value={form.phone} onChange={set("phone")}
              placeholder="9876543210" icon={PhoneIcon} error={errors.phone}
              isFocused={focused === "phone"} onFocus={focus("phone")} onBlur={blur}
            />

            {/* Password + Confirm — 2 col grid */}
            <div className="grid grid-cols-2 gap-3">
              <InputField
                id="password" label="Password" type={showPass ? "text" : "password"}
                value={form.password} onChange={set("password")} placeholder="••••••••"
                icon={LockIcon} error={errors.password}
                isFocused={focused === "password"} onFocus={focus("password")} onBlur={blur}
                rightSlot={
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="text-stone-300 hover:text-orange-500 transition-colors duration-150 flex items-center">
                    <EyeIcon open={showPass} />
                  </button>
                }
              />
              <InputField
                id="confirm" label="Confirm" type={showConfirm ? "text" : "password"}
                value={form.confirm} onChange={set("confirm")} placeholder="••••••••"
                icon={LockIcon} error={errors.confirm}
                isFocused={focused === "confirm"} onFocus={focus("confirm")} onBlur={blur}
                rightSlot={
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="text-stone-300 hover:text-orange-500 transition-colors duration-150 flex items-center">
                    <EyeIcon open={showConfirm} />
                  </button>
                }
              />
            </div>

            {/* Terms & Conditions */}
            <div className="pt-1">
              <div
                className="flex items-start gap-3 cursor-pointer select-none"
                onClick={() => setTerms(!terms)}
              >
                {/* Custom checkbox */}
                <div className={`mt-0.5 w-5 h-5 min-w-5 rounded-md border-[1.5px] flex items-center justify-center
                  transition-all duration-200
                  ${terms ? "bg-orange-500 border-orange-500 shadow-sm shadow-orange-200" : "bg-white border-stone-200"}`}
                >
                  {terms && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-stone-500 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-orange-500 font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-orange-500 font-semibold hover:underline" onClick={(e) => e.stopPropagation()}>
                    Privacy Policy
                  </a>
                </span>
              </div>
              {errors.terms && (
                <p className="text-[11px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                  <span>↳</span>{errors.terms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`relative w-full h-14 rounded-2xl text-white text-[15px] font-semibold tracking-wide
                flex items-center justify-center gap-3 overflow-hidden transition-all duration-300
                ${success
                  ? "bg-green-500 shadow-lg shadow-green-500/20"
                  : "hover:-translate-y-0.5 active:translate-y-0 hover:shadow-xl"
                }`}
              style={!success ? {
                background: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                boxShadow: "0 8px 24px rgba(234,88,12,0.32)",
              } : {}}
            >
              {/* Shimmer overlay */}
              {!success && (
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 3s infinite linear",
                  }}
                />
              )}

              {success ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Account Created!
                </>
              ) : (
                <>
                  Create My Account
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>                       
                </>
              )}
            </button>

            {/* Shimmer animation keyframe */}
            <style>{`
              @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
              }
            `}</style>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-stone-300 text-[11px] tracking-wide font-medium whitespace-nowrap">Already a member?</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Login Link */}
          <div className="text-center">
            <a href="/login" className="text-orange-500 font-semibold text-sm hover:underline transition-all">
              Sign in to your account →
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}