# AuBank API Flow Documentation

This document outlines the API integration and communication flows for key modules in the AuBank application.

## 1. Video KYC (Customer & Agent)

The Video KYC system uses a combination of REST APIs for session management and WebSockets for real-time WebRTC signaling.

### Customer Flow (`VideoKyc.jsx`)
1.  **Initiate Session:**
    *   **Endpoint:** `POST /api/services/apply/account`
    *   **Payload:** `{ "account_type": "savings" }`
    *   **Auth:** Bearer Token
    *   **Response:** `{ "room_id": "unique-room-id" }`
2.  **Establish Signaling:**
    *   **Protocol:** WebSocket
    *   **URL:** `ws://{BACKEND_URL}/ws/{room_id}/1?token={access_token}`
    *   **Events:** Sends `offer` (SDP), `ice-candidate`, and `call-ended`. Receives `answer`, `peer-joined`, and `ice-candidate`.

### Agent Flow (`AgentVideokyc.jsx`)
1.  **Fetch Queue:**
    *   **Endpoint:** `GET /api/kyc/pending` (Polled every 10s or manual refresh)
    *   **Auth:** Bearer Token
2.  **Accept Request:**
    *   **Endpoint:** `POST /api/kyc/accept/{room_id}`
    *   **Auth:** Bearer Token
3.  **Capture Verification Data:**
    *   **Endpoint:** `POST /api/session/capture`
    *   **Payload:** `{ "room_id": "...", "label": "Customer Face" | "PAN Card", "image_data": "base64-string" }`
    *   **Auth:** Bearer Token

---

## 2. Service Requests (Customer Side)

### Raise New Request (`ServiceRequestForm.jsx`)
*   **Endpoint:** `POST /api/customer/raise-ticket`
*   **Payload:**
    ```json
    {
      "subject": "String",
      "description": "String"
    }
    ```
*   **Auth:** Bearer Token
*   **Purpose:** Submits a new service inquiry or issue report.

### Track Requests (`ServiceReuestTracking.jsx`)
*   **Endpoint:** `GET /api/customer/my-tickets`
*   **Auth:** Bearer Token
*   **Response:** Array of ticket objects containing `id`, `subject`, `description`, `status`, `created_at`, and `agent_feedback`.

---

## 3. Operational Console (Agent Side)

### Manage Ticket Queue (`OperationDashboard.jsx`)
1.  **Fetch Pending Tickets:**
    *   **Endpoint:** `GET /api/agent/tickets/pending`
    *   **Auth:** Bearer Token
    *   **Purpose:** Retrieves all active customer service requests awaiting resolution.
2.  **Resolve Ticket:**
    *   **Endpoint:** `POST /api/agent/tickets/resolve`
    *   **Payload:**
        ```json
        {
          "ticket_id": "Integer",
          "feedback": "String",
          "status": "resolved"
        }
        ```
    *   **Auth:** Bearer Token

---

## Global Technical Standards
*   **Base URL:** Defined via `import.meta.env.VITE_BACKEND_URL`.
*   **Authentication:** All protected routes require an `Authorization: Bearer <token>` header. Tokens are retrieved from `localStorage.getItem("access_token")`.
*   **Data Format:** JSON for REST APIs; Stringified JSON for WebSockets.
