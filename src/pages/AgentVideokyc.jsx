import { useState, useEffect, useRef } from "react";
import {
  Video,
  Camera,
  FileCheck,
  PhoneOff,
  CheckCircle2,
  AlertTriangle,
  ArrowRightCircle,
  Mic,
  Users,
  ClipboardCheck,
  Search,
} from "lucide-react";

function AgentVideokyc() {
  const [activeTab, setActiveTab] = useState("call"); // 'queue', 'call', 'data'
  const [currentCustomer] = useState({
    name: "Rajesh Kumar",
    id: "V-KYC-952810",
    dob: "12/05/1988",
    address:
      "Flat 402, Sunshine Apartments, Sector 15, Dwarka, New Delhi - 110075",
  });
  const [isCallActive, setIsCallActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [callStarted, setCallStarted] = useState(false);
  const agentVideoRef = useRef(null);
  const peerRef = useRef(null);
  const customerVideoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const localStreamRef = useRef(null);

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  const startWebRTC = async (stream, roomId) => {
    console.log("Joining room:", roomId);

    const agentToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZ2VudF9BYWthc2giLCJyb2xlIjoiYWdlbnQiLCJleHAiOjE3NzIyNTU1NTd9.OP0jZI-RB9aPSqB9rbCFiypK9hUxOKHgSlc2ecGrHQY";
    // WebSocket connect karo
    const ws = new WebSocket(
      `ws://192.168.1.7:8000/ws/${roomId}/2?token=${agentToken}`,
    );

    // RTCPeerConnection banao
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // Agent ki stream add karo
    stream.getTracks().forEach((track) => {
      peerRef.current.addTrack(track, stream);
    });

    // Customer ka video yahan aayega
    peerRef.current.ontrack = (event) => {
      console.log("Customer video aa gaya!");
      customerVideoRef.current.srcObject = event.streams[0];
    };

    // ICE candidate backend ko bhejo
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(
          JSON.stringify({
            type: "ice-candidate",
            candidate: event.candidate,
          }),
        );
      }
    };

    // WebSocket messages handle karo
    ws.onopen = async () => {
      console.log("WebSocket connected!");
      await new Promise((resolve) => setTimeout(resolve, 500)); // 👈 add karo

      // Offer banao aur bhejo
      const offer = await peerRef.current.createOffer();
      await peerRef.current.setLocalDescription(offer);

      ws.send(
        JSON.stringify({
          type: "offer",
          sdp: offer,
        }),
      );
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log("Message aaya:", message);

      if (message.type === "peer-joined") {
        console.log("Peer join ho gaya:", message.role);
        // Agar customer join hua toh offer bhejo
        if (message.role === "customer") {
          const offer = await peerRef.current.createOffer();
          await peerRef.current.setLocalDescription(offer);
          ws.send(
            JSON.stringify({
              type: "offer",
              sdp: offer.sdp,
            }),
          );
          console.log("Customer ko offer bheja!");
        }
      } else if (message.type === "answer") {
        await peerRef.current.setRemoteDescription(
          new RTCSessionDescription({
            type: "answer",
            sdp: message.sdp,
          }),
        );
        console.log("Answer set ho gaya!");
      } else if (message.type === "ice-candidate") {
        await peerRef.current.addIceCandidate(
          new RTCIceCandidate(message.candidate),
        );
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };
  };

  useEffect(() => {
    if (!callStarted || !roomId) return;

    const joinAsAgent = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        agentVideoRef.current.srcObject = stream;
        agentVideoRef.current.muted = true;
        localStreamRef.current = stream;
        await startWebRTC(stream, roomId);
        setIsCallActive(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    joinAsAgent();
  }, [callStarted]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gray-50">
      {/* --- DASHBOARD SPECIFIC HEADER (Only for this page) --- */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search customer ID or name..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        {/* Console Nav & Agent Info */}
        <div className="flex items-center justify-between md:justify-end gap-6">
          <nav className="hidden xl:flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {["Console", "Reports", "Compliance"].map((item) => (
              <button
                key={item}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  item === "Console"
                    ? "bg-white text-orange-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
            <div className="text-right">
              <p className="text-[11px] font-bold text-gray-900">
                Agent ID: 88442
              </p>
              <p className="text-[10px] text-green-600 font-bold flex items-center justify-end gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>{" "}
                Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE TABS (Hidden on Desktop) */}
      <div className="lg:hidden flex bg-white border-b border-gray-200 sticky top-0 z-20">
        <TabButton
          active={activeTab === "queue"}
          onClick={() => setActiveTab("queue")}
          icon={<Users size={18} />}
          label="Queue"
        />
        <TabButton
          active={activeTab === "call"}
          onClick={() => setActiveTab("call")}
          icon={<Video size={18} />}
          label="Call"
        />
        <TabButton
          active={activeTab === "data"}
          onClick={() => setActiveTab("data")}
          icon={<ClipboardCheck size={18} />}
          label="Verify"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 1. LEFT PANEL - LIVE QUEUE */}
        <aside
          className={`
          w-full lg:w-72 bg-white border-r border-gray-200 flex flex-col shrink-0
          ${activeTab === "queue" ? "flex" : "hidden lg:flex"}
        `}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-pulse"></span>
              <h2 className="font-bold text-gray-800 text-sm tracking-wider uppercase">
                Live Queue
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 shadow-sm">
              <div className="flex justify-between items-start text-[10px] font-bold">
                <span className="text-orange-600 uppercase">
                  Current Session
                </span>
                <span className="text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
              <h3 className="font-bold text-gray-900 mt-1">
                {currentCustomer.name}
              </h3>
              <p className="text-[11px] text-gray-600">Savings Account Alpha</p>
            </div>

            {[
              { name: "Priya Sharma", id: "V-KYC-045245", time: "04:20" },
              { name: "Amit Soni", id: "IND-099246", time: "08:15" },
              { name: "Suresh Raina", id: "V-KYC-045248", time: "12:10" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-gray-100 bg-white hover:border-orange-200 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-gray-800 text-sm group-hover:text-orange-600">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  ID: {item.id}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-900/10">
              Next Customer <ArrowRightCircle size={18} />
            </button>
          </div>
        </aside>

        {/* 2. CENTER PANEL - VIDEO */}
        <main
          className={`
          flex-1 flex flex-col min-w-0 bg-gray-100
          ${activeTab === "call" ? "flex" : "hidden lg:flex"}
        `}
        >
          <div className="flex-1 p-2 sm:p-4 lg:p-6 overflow-hidden flex flex-col">
            <div className="flex-1 bg-gray-900 rounded-2xl lg:rounded-[2.5rem] relative overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 ">
                {!callStarted ? (
                  <div className="flex flex-col items-center justify-center gap-4 p-6">
                    <p className="text-white font-bold text-lg">
                      Customer Room ID daalo
                    </p>

                    <input
                      type="text"
                      placeholder="acc-xxxxxx"
                      value={roomId}
                      onChange={(e) => setRoomId(e.target.value)}
                      className="border-2 border-orange-500 p-3 rounded-xl w-72 text-sm text-gray-900 bg-white outline-none text-center font-bold"
                    />

                    <button
                      onClick={() => setCallStarted(true)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold text-sm"
                    >
                      Call Join Karo 🎥
                    </button>
                  </div>
                ) : (
                  <video
                    ref={customerVideoRef}
                    autoPlay
                    playsInline
                    controls={false}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Agent PIP customerVideoRef */}
              <div className="absolute top-4 right-4 lg:top-8 lg:right-8 w-28 h-40 lg:w-44 lg:h-60 bg-gray-800 rounded-2xl border-2 border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm z-20">
                <video
                  ref={agentVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Controls */}
              <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/5 backdrop-blur-2xl p-3 lg:p-4 rounded-[2.5rem] border border-white/10 shadow-2xl z-30">
                <ControlButton icon={<Camera size={20} />} label="Capture" />
                <ControlButton icon={<FileCheck size={20} />} label="PAN" />
                <ControlButton
                  icon={<Mic size={20} />}
                  label={isMuted ? "Unmute" : "Mute"}
                  onClick={toggleMute}
                  active={isMuted}
                />
                <div className="h-10 w-1 bg-white/10 mx-1"></div>
                <button className="w-12 h-12 lg:w-16 lg:h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-900/20 transition-all hover:rotate-90">
                  <PhoneOff size={24} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* 3. RIGHT PANEL - DATA */}
        <aside
          className={`
          w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col shrink-0
          ${activeTab === "data" ? "flex" : "hidden lg:flex"}
        `}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-sm tracking-wider uppercase">
              Verification
            </h2>
            <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold">
              MATCH: 98%
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-6">
              <DataRow
                label="Customer Full Name"
                value={currentCustomer.name}
                matched
              />
              <DataRow
                label="Date of Birth"
                value={currentCustomer.dob}
                matched
              />
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  Address (Aadhaar)
                </p>
                <div className="text-xs text-gray-700 font-semibold bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {currentCustomer.address}
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Mandatory Checklist
                </h3>
                <div className="space-y-3.5">
                  <CheckItem label="Physical Presence Check" checked />
                  <CheckItem label="Original PAN Visibility" checked />
                  <CheckItem label="Aadhaar Bio-Auth Process" />
                  <CheckItem label="Digital Signature Match" />
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 shadow-sm shadow-amber-900/5">
                <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                <p className="text-[11px] text-amber-800 font-medium">
                  Secondary verification recommended (Poor lighting).
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3.5 bg-white border border-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors">
                  Reject
                </button>
                <button className="py-3.5 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 shadow-lg shadow-green-900/10 transition-colors">
                  Approve
                </button>
              </div>
              <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors">
                Refer to Supervisor
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* HELPER COMPONENTS */

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 border-b-2 transition-all ${active ? "border-orange-600 text-orange-600 bg-orange-50/30" : "border-transparent text-gray-400 hover:text-gray-600"}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tight">
        {label}
      </span>
    </button>
  );
}

function ControlButton({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-all group"
    >
      <div
        className={`w-10 h-10 lg:w-12 lg:h-12 ${active ? "bg-red-500" : "bg-white/10 group-hover:bg-white/20"} rounded-xl lg:rounded-[1.25rem] flex items-center justify-center transition-all border border-white/5`}
      >
        {icon}
      </div>
      <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest opacity-80">
        {label}
      </span>
    </button>
  );
}

function DataRow({ label, value, matched }) {
  return (
    <div className="flex justify-between items-end border-b border-gray-100 pb-3">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">
          {label}
        </p>
        <p className="text-sm font-bold text-gray-900">{value}</p>
      </div>
      {matched && (
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
          <CheckCircle2 size={12} /> MATCH
        </span>
      )}
    </div>
  );
}

function CheckItem({ label, checked }) {
  return (
    <label className="flex items-center gap-4 cursor-pointer group">
      <div
        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? "bg-orange-600 border-orange-600 shadow-md shadow-orange-900/10" : "border-gray-200 bg-white group-hover:border-orange-200"}`}
      >
        {checked && <CheckCircle2 size={14} className="text-white" />}
      </div>
      <span
        className={`text-[13px] font-semibold transition-colors ${checked ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"}`}
      >
        {label}
      </span>
    </label>
  );
}

export default AgentVideokyc;
