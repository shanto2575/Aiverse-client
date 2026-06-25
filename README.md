# Aiverse 

Aiverse is an AI Prompt Sharing Platform where users can create, share, bookmark, and manage AI prompts for different AI engines like ChatGPT, Claude, Gemini, and Midjourney. It also includes premium subscriptions, community reviews, and prompt moderation features.

##  Live URL

https://aiverse-client-rose.vercel.app

---

##  Project Purpose

The purpose of Aiverse is to build a centralized platform for discovering and sharing high-quality AI prompts. Users can explore prompts, save favorites, review community content, and unlock premium/private prompts through subscription.

---

##  Key Features

*  **Authentication System**

  * Secure login & registration using Better Auth
  * Protected routes with Next.js Proxy

*  **Prompt Management**

  * Add new prompts
  * Edit existing prompts
  * Delete prompts
  * Filter prompts by category, difficulty, and AI engine

*  **Bookmark System**

  * Save favorite prompts
  * View saved prompts in dashboard

*  **Community Reviews**

  * Rate prompts
  * Leave reviews
  * Average rating calculation

*  **Premium Subscription**

  * Stripe payment integration
  * Unlock private prompts
  * User plan upgrade system

*  **Role-based Dashboard**

  * User dashboard
  * Creator dashboard
  * Admin moderation panel

*  **Analytics**

  * Total prompts
  * Total copies
  * User activity overview

---

##  Tech Stack

### Frontend:

* Next.js 16
* React 19
* Tailwind CSS
* HeroUI
* Lucide React

### Backend:

* Node.js
* Express.js
* MongoDB

### Authentication:

* Better Auth
* JWT

### Payment:

* Stripe

---

##  NPM Packages Used

```bash
npm install next react react-dom
npm install mongodb
npm install better-auth
npm install stripe
npm install react-hot-toast
npm install lucide-react
npm install @heroui/react
npm install @gravity-ui/icons
npm install axios
npm install swiper
npm install react-icons
npm install framer-motion
```

---

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_uri
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

---

##  Run Locally

Clone the project:

```bash
git clone https://github.com/your-username/aiverse.git
```

Go to the project directory:

```bash
cd aiverse
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 👨‍💻 Author

**Shanto Dev Sharma**

---
