# MeDiQ - Digital Healthcare Platform

<div align="center">

![MeDiQ Banner](https://img.shields.io/badge/MeDiQ-Healthcare%20Platform-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**[Live Demo](https://mediq-six.vercel.app/)** • **[Documentation](#features)** • **[Installation](#installation)**

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Key Features by Role](#key-features-by-role)
- [AI Integration](#ai-integration)
- [Blockchain Integration](#blockchain-integration)
- [Security Features](#security-features)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**MeDiQ** is a comprehensive digital healthcare platform designed to bridge the gap between patients, doctors, and administrators. Built with modern web technologies, it provides seamless appointment management, AI-powered symptom analysis, blockchain-based medical records, and real-time communication features.

The platform aims to revolutionize healthcare delivery by making it more accessible, efficient, and transparent through the integration of cutting-edge technologies like AI and blockchain.

---

## ✨ Features

### 🏥 Core Features

- **Multi-Role Authentication System**
  - Patient, Doctor, and Admin dashboards
  - Secure Firebase authentication
  - Role-based access control (RBAC)

- **AI-Powered Healthcare**
  - Intelligent symptom analysis
  - Smart doctor recommendation system
  - Automated appointment scheduling

- **Blockchain Integration**
  - Immutable medical records storage
  - Transparent transaction history
  - Secure data verification

- **Real-time Features**
  - Live appointment queue management
  - Instant notifications
  - Real-time dashboard updates

- **Comprehensive Medical Records**
  - Digital health records management
  - Prescription tracking
  - Test report uploads
  - Medical history maintenance

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 13.5 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Lucide React Icons
- **State Management:** Zustand

### Backend & Database
- **Authentication:** Firebase Auth
- **Database:** Cloud Firestore
- **Storage:** Firebase Storage
- **Hosting:** Vercel

### Blockchain
- **Network:** Ethereum (Sepolia Testnet)
- **Web3 Integration:** Ethers.js
- **Smart Contracts:** Solidity

### AI & ML
- **API:** Google Gemini AI / Groq API
- **Analysis:** Symptom checker and diagnosis assistant

---

## 🚀 Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Firebase account
- Ethereum wallet (MetaMask)
- Google AI API key

### Steps

1. **Clone the repository**
git clone https://github.com/PRATIK-DWIVEDI11/MeDiQ.git
cd MeDiQ


2. **Install dependencies**
npm install


3. **Set up environment variables**
Create a `.env.local` file in the root directory:

    Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    
    Google AI
    NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
    
    Blockchain
    NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
    NEXT_PUBLIC_ETHEREUM_NETWORK=sepolia


4. **Run the development server**
npm run dev


5. **Open your browser**
Navigate to `http://localhost:3000`

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Ethereum smart contract address | Optional |
| `NEXT_PUBLIC_ETHEREUM_NETWORK` | Ethereum network (mainnet/sepolia) | Optional |

---

## 📁 Project Structure

MeDiQ/
├── app/ # Next.js app directory
│ ├── admin/ # Admin dashboard routes
│ ├── doctor/ # Doctor dashboard routes
│ ├── patient/ # Patient dashboard routes
│ ├── auth/ # Authentication pages
│ └── page.tsx # Landing page
├── components/ # React components
│ ├── admin/ # Admin-specific components
│ ├── auth/ # Authentication components
│ ├── common/ # Shared components
│ ├── doctor/ # Doctor-specific components
│ └── patient/ # Patient-specific components
├── lib/ # Utility functions and services
│ ├── aiService.ts # Gemini AI integration
│ ├── authContext.ts # Authentication context
│ ├── blockchainService.ts # Blockchain integration
│ ├── firebase.ts # Firebase configuration
│ └── firebaseServices.ts # Firebase service functions
├── hooks/ # Custom React hooks
├── public/ # Static assets
├── styles/ # Global styles
└── next.config.js # Next.js configuration


---

## 👥 User Roles

### 1. **Patient**
- Primary users seeking medical consultation
- Can book appointments, view records, and communicate with doctors and req to donate organ

### 2. **Doctor**
- Medical professionals providing healthcare services
- Manage appointments, prescriptions, and patient records and also req to submit organ

### 3. **Admin**
- Platform administrators
- Oversee system operations, manage users, and view analytics

---

## 🎯 Key Features by Role

### Patient Features

| Feature | Description |
|---------|-------------|
| **AI Symptom Checker** | Analyze symptoms and get doctor recommendations |
| **Appointment Booking** | Schedule appointments with recommended doctors |
| **Medical Records** | Access complete health history and documents |
| **Queue Tracking** | Real-time appointment queue status |
| **Organ Donation** | Request admin to donate organ |

### Doctor Features

| Feature | Description |
|---------|-------------|
| **Patient Queue** | Manage daily appointment queue |
| **Appointment Management** | Accept/decline appointment requests |
| **Analytics Dashboard** | View patient statistics and trends |
| **Schedule Management** | Set availability and working hours |
| **Organ Donation** | Request admin to donate organ |


### Admin Features

| Feature | Description |
|---------|-------------|
| **User Management** | Manage patients and doctors |
| **System Analytics** | View platform usage statistics |
| **Blockchain Monitor** | Track blockchain transactions |
| **Appointment Oversight** | Monitor all appointments |
| **System Configuration** | Manage platform settings |

---

## 🤖 AI Integration

MeDiQ leverages **Groq AI API** for intelligent healthcare assistance:

### Symptom Analysis
- Natural language processing of patient symptoms
- Context-aware medical analysis
- Severity assessment (Low/Medium/High)

### Doctor Recommendation
- AI-powered matching based on:
  - Symptom analysis
  - Doctor specialization
  - Availability
  - Patient history

### Smart Scheduling
- Optimal appointment time suggestions
- Urgency-based prioritization
- Conflict resolution

---

## 🔗 Blockchain Integration

### Ethereum Smart Contracts

MeDiQ uses blockchain technology for:

1. **Medical Record Security for donated Organ**
   - Immutable storage of medical records
   - Tamper-proof data verification
   - Decentralized access control

2. **Transaction Transparency**
   - Audit trail for all medical interactions
   - Transparent payment records
   - Verifiable consent management

3. **Data Integrity**
   - Cryptographic hashing of documents
   - Blockchain-verified authenticity
   - Distributed storage redundancy


---

## 🔒 Security Features

### Authentication & Authorization
- Firebase Authentication with multi-factor support
- Role-based access control (RBAC)
- Secure session management
- JWT token validation

### Data Protection
- End-to-end encryption for sensitive data
- HIPAA-compliant data handling
- Secure file upload/download
- Regular security audits

### Privacy Measures
- User consent management
- Data anonymization
- Privacy policy compliance
- Secure API endpoints

---

## 🌐 Deployment

### Vercel Deployment (Current)

The application is deployed on Vercel with automatic CI/CD:

1. **Production URL:** [https://mediq-six.vercel.app/](https://mediq-six.vercel.app/)
2. **Automatic deployments** on push to `main` branch
3. **Preview deployments** for pull requests

### Manual Deployment

Build the application
npm run build

Deploy to Vercel
vercel --prod


### Environment Setup

Ensure all environment variables are configured in Vercel:
- Project Settings → Environment Variables
- Add all required keys from `.env.local`

---

## 🚀 Future Enhancements

  1. Give docotrs the features to take online sessions with client
  2. Better Queue management
  3. Convert the web app into an functional mobile app
  4. More interactive UI design


---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

### Coding Standards
- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure all tests pass before PR

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pratik Dwivedi**

- GitHub: [@PRATIK-DWIVEDI11](https://github.com/PRATIK-DWIVEDI11)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/pratik-dwivedi11/)
- Email: pratikdwivedi107@gmail.com

---

## 🙏 Acknowledgments

- **Next.js** team for the amazing framework
- **Firebase** for backend services
- **Google AI** for Gemini API
- **Vercel** for hosting platform
- **Open Source Community** for various libraries used

---

## 📞 Support

For support, email dwivedipratik1123@gmail.com or open an issue in the repository.

---

<div align="center">

Made with ❤️ for better healthcare and medical industry

**[⬆ Back to Top](#mediq---digital-healthcare-platform)**

</div>
