# travel-studio-intern-assignment

A full-stack system to log guest requests via WhatsApp using **n8n**, **NestJS**, and a **Next.js frontend**, deployed on **Vercel**. The system allows guests to send WhatsApp messages which are processed by an AI agent, logged into a database, and displayed in a mobile-first luxury UI for staff.

---

## 🌐 Tech Stack

- **WhatsApp API (Webhook)**
- **n8n** – AI processing workflow
- **NestJS + Prisma + PostgreSQL** – Backend API
- **Next.js + Tailwind CSS** – Frontend UI
- **Vercel** – Frontend deployment

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/chiragmukheja/travel-studio-intern-assignment.git
cd guest-request-logger
```

### 2. Install Dependencies
Backend:

```bash
  cd guest-request-api
npm install
```
Frontend:
```bash
cd admin-dashboard
npm install
```

### 3. Configure .env Files
Backend (guest-request-api/.env):
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

## 💬 WhatsApp Sandbox Setup
Make sure your WhatsApp API provider supports webhooks and message templates (e.g., Meta's WhatsApp Business API or Twilio Sandbox).

1. Register Webhook URL on your WhatsApp provider’s dashboard.
2. Use your n8n Cloud or self-hosted instance webhook node as the endpoint
3. Configure Verify Token and fields (e.g., message, phone_number) as required.
4. Send a test message from WhatsApp: Hi, I need towels in room 402.

n8n will extract the message and phone number, process it using OpenRouter (AI), and send it to the backend.

## ✅ Testing Instructions
1. Send a WhatsApp message from the sandbox or real number.
2. n8n Workflow:
- Triggered by WhatsApp webhook.
- Extracts phone + message.
- AI processes the request (summary, intent).
- Sends result to backend /api/requests.

3. Backend:
- Stores request with timestamp and "pending" status.

4. Frontend:
- Visit your Vercel frontend URL.
- You’ll see a table of pending requests.

## 📱 UI Design
- Mobile-first
- Card-based layout
- Displays:
 -- Guest phone number
 -- Request text
 -- Timestamp




