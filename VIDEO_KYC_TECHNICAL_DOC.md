# Video KYC Technical Documentation

This document provides a deep dive into the **Video KYC** (Know Your Customer) module of the AuBank application. It covers libraries, technical implementations, and the logic flow.

## 1. Core Libraries & Technologies

The Video KYC module relies on the following key technologies:

| Library/API | Purpose |
| :--- | :--- |
| **MediaPipe** (`@mediapipe/selfie_segmentation`) | Used by the **Agent** to perform real-time background replacement (privacy/professionalism). |
| **WebRTC API** (`RTCPeerConnection`) | Handles the peer-to-peer video and audio streaming between Customer and Agent. |
| **WebSocket API** | Acts as the "Signaling Server" to exchange connection metadata (Offers, Answers, ICE Candidates). |
| **lucide-react** | Provides the UI icons (Video, Mic, Camera, etc.). |
| **getUserMedia API** | Standard browser API to access the camera and microphone hardware. |

---

## 2. Customer Side Logic (`VideoKyc.jsx`)

The customer initiates the verification process through a clean, guided interface.

### Logical Steps:
1.  **Session Initiation:** When the "Start Video KYC" button is clicked, the app calls the `initiateVideoKyc` function.
    *   It POSTs to `/api/services/apply/account` to get a unique `room_id`.
2.  **Hardware Access:** The browser requests camera and microphone permissions via `navigator.mediaDevices.getUserMedia`.
3.  **Signaling Connection:** A WebSocket connection is opened using the `room_id`.
4.  **WebRTC Handshake:** 
    *   The customer's browser creates an **Offer** (SDP).
    *   This Offer is sent via WebSocket to the Agent.
    *   The browser listens for an **Answer** from the Agent to establish the peer-to-peer link.
5.  **Live View:** Two `<video>` elements are used:
    *   `customerVideoRef`: Shows the user's own local camera feed (PIP).
    *   `agentVideoRef`: Shows the remote feed from the Bank Agent (Main view).

---

## 3. Agent Side Logic (`AgentVideokyc.jsx`)

The agent manages a queue of customers and performs formal verification steps.

### Logical Steps:
1.  **Queue Management:** The agent's page polls `/api/kyc/pending` every 10 seconds to show active customers waiting in the "Live Queue".
2.  **Accepting a Call:** Clicking "Accept" calls `/api/kyc/accept/{room_id}` and begins the WebRTC signaling.
3.  **AI Background Processing (The "Pro" Look):**
    *   The raw camera stream is sent to **MediaPipe Selfie Segmentation**.
    *   A `canvas` element is used to "mask" the agent and draw a professional AU Bank background behind them.
    *   This processed canvas is then converted back into a stream (`canvas.captureStream()`) and sent to the customer.
4.  **Verification Actions:**
    *   **Capture Face:** Agent triggers a sequence ("Look Left", "Look Right", "Smile") and captures a frame from the customer's video.
    *   **Capture PAN:** Agent captures a clear image of the customer's identity card.
    *   **Data Sync:** Captured images are sent to `/api/session/capture` as Base64 strings for backend storage and OCR.
5.  **Checklist & Approval:** The agent uses a manual checklist to verify "Physical Presence" and "Original PAN" before clicking "Approve" or "Reject".

---

## 4. Troubleshooting & Constraints

*   **HTTPS Requirement:** `getUserMedia` and WebRTC will only work over `https://` or `localhost`.
*   **Signaling Server:** The WebSocket URL is derived from `VITE_BACKEND_URL` by replacing `http` with `ws`.
*   **MediaPipe CDN:** The agent side requires an active internet connection to download the MediaPipe WASM models from `cdn.jsdelivr.net`.
*   **Network Ports:** WebRTC requires STUN/TURN servers (currently using Google's public STUN server `stun.l.google.com:19302`).

---

## 5. Summary of UI States

*   **Idle:** Shows the "Start Video KYC" button.
*   **Calling:** Shows the local camera feed while waiting for a peer to join.
*   **Active Call:** Full bidirectional audio/video with control buttons (Mute, End Call).
*   **Capture Preview:** A popup modal showing the last captured image for agent verification.
