import { useState, useEffect, useRef } from "react";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import auLogo from "../assets/AU-Logo_H30px-1.svg";
import {
  Video,
  Camera as CameraIcon,
  FileCheck,
  PhoneOff,
  CheckCircle2,
  AlertTriangle,
  ArrowRightCircle,
  Mic,
  Users,
  ClipboardCheck,
  Search,
  RefreshCw,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AgentVideokyc() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("call"); // 'queue', 'call', 'data'
  const [pendingKycRequests, setPendingKycRequests] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [callStarted, setCallStarted] = useState(false);
  const callStartedRef = useRef(false);
  const agentVideoRef = useRef(null);
  const peerRef = useRef(null);
  const customerVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const processingVideoRef = useRef(null);
  const logoRef = useRef(null);
  const [data, setdata] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const img = new Image();
    img.src = auLogo;
    logoRef.current = img;
  }, []);


 

  const [isMuted, setIsMuted] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [captureLabel, setCaptureLabel] = useState("");
  const [instruction, setInstruction] = useState("");
  const localStreamRef = useRef(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionNotes, setRejectionNotes] = useState("");

  const handleCapture = async (label) => {
    if (!customerVideoRef.current || !roomId) {
      alert("No active session to capture.");
      return;
    }

    setIsCapturing(true);

    if (label === "Customer Face") {
      setInstruction("Please look LEFT...");
      await new Promise((r) => setTimeout(r, 1000));
      setInstruction("Please look RIGHT...");
      await new Promise((r) => setTimeout(r, 1000));
      setInstruction("Look STRAIGHT and SMILE!");
      await new Promise((r) => setTimeout(r, 800));
    } else {
      setInstruction("Capturing PAN Card...");
      await new Promise((r) => setTimeout(r, 500));
    }

    try {
      const video = customerVideoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg", 0.9);

      setCapturedImage(imageData);
      setCaptureLabel(label);
      setShowPopup(true);

      const agentToken = localStorage.getItem("access_token");
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/session/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${agentToken}`,
        },
        body: JSON.stringify({
          room_id: roomId,
          label: label,
          image_data: imageData,
        }),
      });
    } catch (error) {
      console.error("Error capturing image:", error);
    } finally {
      setIsCapturing(false);
      setInstruction("");
    }
  };

  const wsRef = useRef(null);

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  const endCall = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "call-ended" }));
      setTimeout(() => {
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (peerRef.current) {
          peerRef.current.close();
          peerRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        setCallStarted(false);
        setIsCallActive(false);
        setCurrentCustomer(null);
        setRoomId("");
        setdata(null); // Clear customer data on call end
      }, 200);
    } else {
      setCallStarted(false);
      setIsCallActive(false);
      setCurrentCustomer(null);
      setRoomId("");
    }
  };

  const startWebRTC = async (stream, roomId) => {
    console.log("Joining room:", roomId);

    const agentToken = localStorage.getItem("access_token");
    const clientId = `cl-${Math.random().toString(36).substr(2, 5)}`;

    const wsBaseUrl = import.meta.env.VITE_BACKEND_URL.replace(
      /^http/,
      "ws",
    ).replace(/\/$/, "");
    const ws = new WebSocket(`${wsBaseUrl}/ws/${roomId}/${clientId}`);
    wsRef.current = ws;

    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    stream.getTracks().forEach((track) => {
      peerRef.current.addTrack(track, stream);
    });

    peerRef.current.ontrack = (event) => {
      console.log("Customer video received!");
      customerVideoRef.current.srcObject = event.streams[0];
    };

    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        ws.send(
          JSON.stringify({ type: "ice-candidate", candidate: event.candidate }),
        );
      }
    };

    ws.onopen = async () => {
      console.log("WebSocket connected! Sending authentication...");
      // STEP 1: Mandatory Auth Handshake
      ws.send(
        JSON.stringify({
          type: "auth",
          token: agentToken,
        }),
      );
    };

    ws.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      console.log("Message received:", message);

      // STEP 2: Handle Auth Success
      if (message.type === "auth-success") {
        console.log("Agent authenticated! Creating offer for customer...");
        await new Promise((resolve) => setTimeout(resolve, 500));
        const offer = await peerRef.current.createOffer();
        await peerRef.current.setLocalDescription(offer);
        ws.send(JSON.stringify({ type: "offer", sdp: offer }));
        return;
      }

      if (message.type === "call-ended" || message.type === "close-session") {
        if (customerVideoRef.current) customerVideoRef.current.srcObject = null;
        if (agentVideoRef.current) agentVideoRef.current.srcObject = null;
        if (localStreamRef.current) {
          localStreamRef.current.getTracks().forEach((track) => track.stop());
          localStreamRef.current = null;
        }
        if (peerRef.current) {
          peerRef.current.close();
          peerRef.current = null;
        }
        if (wsRef.current) {
          wsRef.current.close();
          wsRef.current = null;
        }
        setCallStarted(false);
        setIsCallActive(false);
        setCurrentCustomer(null);
        setRoomId("");
        return;
      }

      if (message.type === "peer-joined") {
        console.log("Peer join ho gaya:", message.role);
        if (message.role === "customer") {
          const offer = await peerRef.current.createOffer();
          await peerRef.current.setLocalDescription(offer);
          ws.send(JSON.stringify({ type: "offer", sdp: offer }));
          console.log("Offer sent to Customer!");
        }
      } else if (message.type === "offer") {
        await peerRef.current.setRemoteDescription(
          new RTCSessionDescription(message.sdp),
        );
        const answer = await peerRef.current.createAnswer();
        await peerRef.current.setLocalDescription(answer);
        ws.send(JSON.stringify({ type: "answer", sdp: answer.sdp }));
      } else if (message.type === "answer") {
        await peerRef.current.setRemoteDescription(
          new RTCSessionDescription({ type: "answer", sdp: message.sdp }),
        );
      } else if (message.type === "ice-candidate") {
        await peerRef.current.addIceCandidate(
          new RTCIceCandidate(message.candidate),
        );
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = (event) => {
      if (event.code === 4001) alert("Session expired or invalid token.");
      console.log("WebSocket disconnected", event.code);
    };
  };

  useEffect(() => {
    if (!callStarted || !roomId) return;

    const joinAsAgent = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: true,
        });

        // Background replacement logic
        const videoElement = processingVideoRef.current;
        videoElement.srcObject = stream;
        await videoElement.play();

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");

        const selfieSegmentation = new SelfieSegmentation({
          locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
        });

        selfieSegmentation.setOptions({ modelSelection: 1 });

        selfieSegmentation.onResults((results) => {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          canvasCtx.drawImage(
            results.segmentationMask,
            0,
            0,
            canvasElement.width,
            canvasElement.height,
          );
          canvasCtx.globalCompositeOperation = "source-in";
          canvasCtx.drawImage(
            results.image,
            0,
            0,
            canvasElement.width,
            canvasElement.height,
          );
          canvasCtx.globalCompositeOperation = "destination-over";

          if (logoRef.current) {
            const logo = logoRef.current;
            const ratio = Math.max(
              canvasElement.width / logo.width,
              canvasElement.height / logo.height,
            );
            const w = logo.width * ratio;
            const h = logo.height * ratio;
            canvasCtx.drawImage(
              logo,
              (canvasElement.width - w) / 2,
              (canvasElement.height - h) / 2,
              w,
              h,
            );
          } else {
            canvasCtx.fillStyle = "#FB923C";
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
          }
          canvasCtx.restore();
        });

        const processFrame = async () => {
          if (videoElement.paused || videoElement.ended) return;
          await selfieSegmentation.send({ image: videoElement });
          requestAnimationFrame(processFrame);
        };
        processFrame();

        const processedStream = canvasElement.captureStream(30);
        stream
          .getAudioTracks()
          .forEach((track) => processedStream.addTrack(track));

        agentVideoRef.current.srcObject = processedStream;
        agentVideoRef.current.muted = true;
        localStreamRef.current = processedStream;
        await startWebRTC(processedStream, roomId);
        setIsCallActive(true);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    joinAsAgent();
  }, [callStarted, roomId]);

const fetchPendingKycRequests = async () => {
    const agentToken = localStorage.getItem("access_token");
    if (!agentToken) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/kyc/pending`,
        {
          headers: { Authorization: `Bearer ${agentToken}` },
        },
      );
      if (response.status === 401) {
        setCallStarted(false);
        return;
      }
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      console.log("Fetched pending requests:", result); // ✅ check karo
      setPendingKycRequests([...result]); // ✅ new array reference force React re-render
    } catch (error) {
      console.error("Error fetching pending KYC requests:", error);
    }
  };

useEffect(() => {
  fetchPendingKycRequests();

  // const interval = setInterval(() => {
  //   fetchPendingKycRequests();
  // }, 10000); // 10 seconds — server pe load bhi kam, updates bhi milenge

  // return () => clearInterval(interval);
}, []);

  // customer data fetchign for chekcin verification
  useEffect(() => {
    if (!roomId) return;

    const fetchCustomerData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/kyc/customer-details/${roomId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const result = await response.json();
          setdata(result);
        }
      } catch (error) {
        console.error("Customer data fetch error:", error);
      }
    };

    fetchCustomerData();
  }, [roomId]);

  // console.log("AgentVideokyc: showRejectDialog is", showRejectDialog); // Added console.log here

  return (
    <div className="flex h-full flex-col overflow-hidden bg-gray-50">
      <video ref={processingVideoRef} className="hidden" playsInline muted />
      <canvas ref={canvasRef} className="hidden" width="1280" height="720" />

      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>
        <div className="flex items-center justify-between md:justify-end gap-6">
          <div className="flex items-center gap-3">
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
        <aside
          className={`w-full lg:w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 ${activeTab === "queue" ? "flex" : "hidden lg:flex"}`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-pulse"></span>
              <h2 className="font-bold text-gray-800 text-sm tracking-wider uppercase">
                Live Queue
              </h2>
            </div>
            <button
              onClick={fetchPendingKycRequests}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-orange-600 transition-all"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={async () => {
                try {
                  const agentToken = localStorage.getItem("access_token");
                  const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/kyc/clear-all`,
                    {
                      method: "DELETE", // Changed from POST to DELETE
                      headers: {
                        Authorization: `Bearer ${agentToken}`,
                      },
                    },
                  );
                  if (response.status === 401) {
                    alert("Session expired.");
                    navigate("/login");
                    return;
                  }
                  if (!response.ok) {
                    throw new Error(`Failed to clear all requests: ${response.status}`);
                  }
                  setToastMessage("All processed requests cleared!");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 10000);
                  fetchPendingKycRequests(); // Refresh the queue
                } catch (error) {
                  console.error("Error clearing all requests:", error);
                  setToastMessage("Failed to clear processed requests.");
                  setShowToast(true);
                  setTimeout(() => setShowToast(false), 10000);
                }
              }}
              className="p-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-white transition-all text-xs font-bold"
            >
              Clear All
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {callStarted && currentCustomer ? (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
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
                <p className="text-[11px] text-gray-600">
                  Room ID: {currentCustomer.room_id}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center text-gray-500 text-xs">
                No active session.
              </div>
            )}

            {pendingKycRequests.map((item) => (
              <div
                key={item.room_id}
                className={`p-3 rounded-xl border transition-all ${roomId === item.room_id ? "bg-orange-50 border-orange-200" : "border-gray-100 bg-white"}`}
              >
                <h4 className="font-semibold text-sm">
                  KYC Request: {item.customer_id || item.room_id}
                </h4>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const agentToken = localStorage.getItem("access_token");
                        const response = await fetch(
                          `${import.meta.env.VITE_BACKEND_URL}/api/kyc/accept/${item.room_id}`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${agentToken}`,
                            },
                          },
                        );
                        if (response.status === 401) {
                          alert("Session expired.");
                          navigate("/login");
                          return;
                        }
                        if (!response.ok)
                          throw new Error(
                            `Failed to accept: ${response.status}`,
                          );
                        setRoomId(item.room_id);
                        setCallStarted(true);
                        setCurrentCustomer({
                          name: item.customer_id
                            ? `Customer ${item.customer_id}`
                            : "Guest",
                          ...item,
                        });
                        setActiveTab("call"); // Automatically switch to the call tab
                      } catch (error) {
                        console.error("Error:", error);
                      }
                    }}
                    className="flex-1 py-1.5 bg-green-600 text-white text-[10px] font-bold rounded-lg transition-all"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      setPendingKycRequests((prev) =>
                        prev.filter((r) => r.room_id !== item.room_id),
                      )
                    }
                    className="flex-1 py-1.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-lg transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main
          className={`flex-1 flex flex-col min-w-0 bg-gray-100 ${activeTab === "call" ? "flex" : "hidden lg:flex"}`}
        >
          <div className="flex-1 p-2 sm:p-4 lg:p-6 overflow-hidden flex flex-col">
            <div className="flex-1 bg-gray-900 rounded-2xl lg:rounded-[2.5rem] relative overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 flex items-center justify-center">
                {!callStarted ? (
                  <div className="text-center">
                    <Video className="text-gray-600/30" size={48} />
                  </div>
                ) : (
                  <video
                    ref={customerVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                {instruction && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-lg animate-bounce">
                    {instruction}
                  </div>
                )}
              </div>
              <div className="absolute top-4 right-4 lg:top-8 lg:right-8 w-28 h-40 lg:w-44 lg:h-60 bg-gray-800 rounded-2xl border-2 border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm z-20">
                <video
                  ref={agentVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/5 backdrop-blur-2xl p-3 lg:p-4 rounded-[2.5rem] border border-white/10 shadow-2xl z-30">
                <ControlButton
                  icon={<CameraIcon size={20} />}
                  label={isCapturing ? "..." : "Capture"}
                  onClick={() => handleCapture("Customer Face")}
                />
                <ControlButton
                  icon={<FileCheck size={20} />}
                  label={isCapturing ? "..." : "PAN"}
                  onClick={() => handleCapture("PAN Card")}
                />
                <ControlButton
                  icon={<Mic size={20} />}
                  label={isMuted ? "Unmute" : "Mute"}
                  onClick={toggleMute}
                  active={isMuted}
                />
                <div className="h-10 w-1 bg-white/10 mx-1"></div>
                <button
                  onClick={endCall}
                  className="w-12 h-12 lg:w-16 lg:h-16 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl hover:rotate-90 transition-all"
                >
                  <PhoneOff size={24} />
                </button>
              </div>
            </div>
          </div>
        </main>

        <aside
          className={`w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 ${activeTab === "data" ? "flex" : "hidden lg:flex"}`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-sm tracking-wider uppercase">
              Verification
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-6">
              <DataRow
                label="Full Name"
                value={data?.full_name || "N/A"}
                matched={!!data?.full_name}
              />
              <DataRow
                label="Mobile Number"
                value={data?.mobile_number || "N/A"}
                matched={!!data?.mobile_number}
              />
              <DataRow
                label="Aadhar Number"
                value={data?.aadhar_number || "N/A"}
                matched={!!data?.aadhar_number}
              />
              <DataRow
                label="PAN Number"
                value={data?.pan_number || "N/A"}
                matched={!!data?.pan_number}
              />
              <DataRow
                label="Date of Birth"
                value={data?.dob || "N/A"}
                matched={!!data?.dob}
              />
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  Address (Aadhaar)
                </p>
                <div className="text-xs text-gray-700 font-semibold bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {data?.address || "N/A"}
                </div>
              </div>
              <div className="pt-2">
                <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Mandatory Checklist
                </h3>
                <div className="space-y-3.5">
                  <CheckItem
                    label="Mobile Verified"
                    checked={data?.is_mobile_verified ?? false}
                  />
                  <CheckItem
                    label="Aadhaar Verified"
                    checked={data?.is_aadhar_verified ?? false}
                  />
                  <CheckItem
                    label="PAN Verified"
                    checked={data?.is_pan_verified ?? false}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3.5 bg-white border border-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors"
                  onClick={() => {
                    if (!roomId) return;
                    setShowRejectDialog(true);
                  }}
                >
                  Reject
                </button>
                <button
                  onClick={async () => {
                    if (!roomId) return;
                    try {
                      const agentToken = localStorage.getItem("access_token");
                      const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/api/agent/service/decision`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${agentToken}`,
                          },
                          body: JSON.stringify({
                            room_id: roomId,
                            status: "Approved",
                            notes: "",
                          }),
                        },
                      );

                      if (response.status === 401) {
                        alert("Session expired.");
                        navigate("/login");
                        return;
                      }

                      if (!response.ok)
                        throw new Error(`Failed to approve: ${response.status}`);

                      setToastMessage("Your video KYC is successfully approved!");
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 10000);
                      endCall(); // End the current call session
                      fetchPendingKycRequests(); // Refresh the queue
                    } catch (error) {
                      console.error("Error approving KYC:", error);
                      setToastMessage("Failed to approve video KYC.");
                      setShowToast(true);
                      setTimeout(() => setShowToast(false), 10000);
                    }
                  }}
                  className="py-3.5 bg-green-600 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {captureLabel}
              </h3>
              <button
                onClick={() => setShowPopup(false)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 bg-gray-100">
              <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden border-4 border-white shadow-inner relative">
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6 bg-white flex gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 py-4 text-gray-500 font-bold text-sm"
              >
                Discard
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="flex-0.5 py-4 bg-orange-600 text-white font-bold text-sm rounded-2xl"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <ToastNotification message={toastMessage} onClose={() => setShowToast(false)} />
      )}

      {showRejectDialog && (
        <RejectDialog
          onCancel={() => setShowRejectDialog(false)}
          onSubmit={async (notes) => {
            if (!notes) {
              setToastMessage("Rejection cancelled. Notes are required.");
              setShowToast(true);
              setTimeout(() => setShowToast(false), 10000);
              return;
            }

            try {
              const agentToken = localStorage.getItem("access_token");
              const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/agent/service/decision`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${agentToken}`,
                  },
                  body: JSON.stringify({
                    room_id: roomId,
                    status: "Rejected",
                    notes: notes,
                  }),
                },
              );

              if (response.status === 401) {
                alert("Session expired.");
                navigate("/login");
                return;
              }

              if (!response.ok)
                throw new Error(`Failed to reject: ${response.status}`);

              setToastMessage("Your video KYC is successfully rejected!");
              setShowToast(true);
              setTimeout(() => setShowToast(false), 10000);
              endCall(); // End the current call session
              fetchPendingKycRequests(); // Refresh the queue
            } catch (error) {
              console.error("Error rejecting KYC:", error);
              setToastMessage("Failed to reject video KYC.");
              setShowToast(true);
              setTimeout(() => setShowToast(false), 10000);
            } finally {
              setShowRejectDialog(false); // Close dialog
            }
          }}
        />
      )}
    </div>
  );
}

function RejectDialog({ onCancel, onSubmit }) {
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSubmit(notes);
  };

  return (
    <div className="fixed inset-0 z-102 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* DialogHeader */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">Reject KYC Request</h3>
        </div>
        
        {/* DialogContent */}
        <div className="p-6">
          <label htmlFor="rejectionNotes" className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Rejection
          </label>
          <textarea
            id="rejectionNotes"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
            rows="4"
            placeholder="Enter detailed reason for rejection..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        {/* DialogFooter */}
        <div className="p-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  );
}

function ToastNotification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // Auto-hide after 10 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg z-101 flex items-center gap-3">
      <span>{message}</span>
      <button onClick={onClose} className="text-white/80 hover:text-white">
        <X size={18} />
      </button>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 border-b-2 transition-all ${active ? "border-orange-600 text-orange-600 bg-orange-50/30" : "border-transparent text-gray-400"}`}
    >
      {icon}{" "}
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
        className={`w-10 h-10 lg:w-12 lg:h-12 ${active ? "bg-red-500" : "bg-white/10 group-hover:bg-white/20"} rounded-xl flex items-center justify-center transition-all border border-white/5`}
      >
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">
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
    <label className="flex justify-between items-center cursor-pointer group">
      <div className="flex items-center gap-4">
        <div
          className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? "bg-orange-600 border-orange-600" : "border-gray-200 bg-white"}`}
        >
          {checked && <CheckCircle2 size={14} className="text-white" />}
        </div>
        <span
          className={`text-[13px] font-semibold transition-colors ${checked ? "text-gray-900" : "text-gray-500"}`}
        >
          {label}
        </span>
      </div>
      {checked && (
        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
          <CheckCircle2 size={12} /> MATCH
        </span>
      )}
    </label>
  );
}

export default AgentVideokyc;
