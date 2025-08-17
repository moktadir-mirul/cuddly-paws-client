# 🐾 Cuddly Paws - Online Pet Adoption Platform

**Created by Mirul Moktadir Khan**

*Cuddly Paws* is a feature-rich **pet adoption platform** where users can browse, search, and adopt pets with ease. Admins have additional privileges like editing and managing campaigns. The platform also supports **donation campaigns**, **authentication**, and **secure transactions** using Stripe.

---

## ✨ Features

- 🔍 Search & Filter pets by name and category
- 🐶 Add, Edit, or Delete pets with image uploads (Imgbb)
- 👁️ View detailed pet descriptions with rich text using TipTap
- ✅ Adopt pets with toggleable status
- 💝 Create, pause/resume, and manage donation campaigns
- 💳 Stripe integration for secure donations
- 🔐 Firebase authentication with JWT-protected APIs
- 👨‍💼 Role-based access (user/admin)
- 🔄 Infinite scrolling for pet listings
- 🧑‍🤝‍🧑 Admin dashboard to manage users, roles, pets & donations
- 🌓 Responsive design with dark mode
- 🔔 SweetAlert2, toast notifications, and skeleton loaders

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- ⚛️ **React** – UI development
- ⚡ **Vite** – Fast bundling and development
- 🎨 **Tailwind CSS** – Utility-first CSS
- 🚦 **React Router** – Client-side routing
- 🌀 **Framer Motion** – UI animation
- 🧠 **TanStack Query** – Data fetching, caching
- 🔌 **Axios** + Interceptors – API requests with token support
- 📝 **React Hook Form** – Form handling
- 💬 **React TipTap** – Rich text editor
- 🦴 **React Loading Skeleton** – Skeleton loading states
- 📚 **Flowbite** – Component libraries

### 🔐 Auth & Role Management

- 🔥 **Firebase Auth** – Login via email/password, Google, GitHub
- 🛡️ **JWT Token** – Protected APIs
- ⚙️ **Custom Middleware** – Role verification (admin/user)

### 🗄️ Backend

- 🌐 **Node.js** – Backend runtime
- 🚂 **Express.js** – REST API framework
- 🍃 **MongoDB** – Database
- 🧪 **Firebase Admin SDK** – Token verification
- 🔁 **Pagination & Filtering** – Server-side query handling

### 💳 Payments

- 💰 **Stripe** – Secure donation payments

---

## ⚙️ Key Libraries

- [`@tanstack/react-query`](https://tanstack.com/query/latest)
- [`react-router`](https://reactrouter.com/)
- [`react-icons`](https://react-icons.github.io/react-icons/)
- [`sweetalert2`](https://sweetalert2.github.io/)
- [`react-toastify`](https://github.com/fkhadra/react-toastify)
- [`@tiptap/react`](https://tiptap.dev/)
- [`react-loading-skeleton`](https://www.npmjs.com/package/react-loading-skeleton)
- [`flowbite-react`](https://flowbite-react.com/)
- [`framer-motion`](https://www.framer.com/motion/)
- [`stripe/react-stripe-js`](https://stripe.com/docs/js)


## 🧑‍💻 How to Run This Project Locally
To run this project on your local machine, follow the steps below:

### 📁 1. Clone the Repository
- Use bash/powershell/cmd (any you want) -
git clone https://github.com/moktadir-mirul/cuddly-paws-client
### 📂 2. Navigate to the Project Directory
cd your-repo-name
### 📦 3. Install Dependencies
npm install
### 🔥 4. Start the Development Server
npm run dev

-The app should now be running at http://localhost:5173

**✅ Make sure you have Node.js and npm installed on your machine.**

## Live Link - ***https://cuddly-paws.web.app/***
## Server Link - ***https://cuddly-paws-server.vercel.app/***


