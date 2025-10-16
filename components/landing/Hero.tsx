// 'use client'
// import { motion } from 'framer-motion'
// import { Brain, Shield, Globe, CheckCircle } from 'lucide-react'

// export default function Hero() {
//   return (
//     <section className="bg-gradient-to-br from-red-50 via-white to-blue-50 py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div 
//           className="text-center"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
//             Welcome to <span className="text-red-600">MeDiQ</span>
//           </h1>
          
//           <p className="text-2xl md:text-3xl text-gray-700 mb-4 max-w-4xl mx-auto font-semibold">
//             AI-Driven Smart Hospital System
//           </p>
          
//           <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
//             Integrating <span className="font-semibold text-blue-600">Web Development</span>, 
//             <span className="font-semibold text-purple-600"> Agentic AI</span>, and 
//             <span className="font-semibold text-green-600"> Blockchain</span> for transparent healthcare
//           </p>

//           <div className="flex justify-center space-x-8 mb-16 text-center">
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
//               <p className="text-2xl font-bold text-red-600">87.5%</p>
//               <p className="text-sm text-gray-600">AI Accuracy</p>
//             </div>
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
//               <p className="text-2xl font-bold text-blue-600">42%</p>
//               <p className="text-sm text-gray-600">Wait Time Reduced</p>
//             </div>
//             <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
//               <p className="text-2xl font-bold text-green-600">2340</p>
//               <p className="text-sm text-gray-600">Organ Donors</p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
//             <motion.div 
//               className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100"
//               whileHover={{ scale: 1.05, y: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Globe className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development</h3>
//               <p className="text-gray-600 text-center mb-4">Next.js accessible healthcare interface</p>
//               <div className="space-y-2">
//                 <div className="flex items-center text-sm text-gray-700">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Responsive Design
//                 </div>
//                 <div className="flex items-center text-sm text-gray-700">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Real-time Updates
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div 
//               className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100"
//               whileHover={{ scale: 1.05, y: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Brain className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Agentic AI</h3>
//               <p className="text-gray-600 text-center mb-4">Automated appointment & queue management</p>
//               <div className="space-y-2">
//                 <div className="flex items-center text-sm text-gray-700">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   87.5% Accuracy
//                 </div>
//                 <div className="flex items-center text-sm text-gray-700">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Automated Scheduling
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div 
//               className="bg-white rounded-2xl p-8 shadow-xl border border-green-100"
//               whileHover={{ scale: 1.05, y: -5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Shield className="h-12 w-12 text-green-600 mb-4 mx-auto" />
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Blockchain</h3>
//               <p className="text-gray-600 text-center mb-4">Transparent organ donation system</p>
//               <div className="space-y-2">
//                 <div className="flex items-center text-sm text-gray-700">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   100% Transparency
//                 </div>
//                 <div className="flex items-center text-sm text-gray-700">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                   Zero Fraud
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

import { Brain, Shield, Globe, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-blue-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-red-600">MeDiQ</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 max-w-4xl mx-auto font-semibold">
            AI-Driven Smart Hospital System
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Integrating <span className="font-semibold text-blue-600">Web Development</span>, 
            <span className="font-semibold text-purple-600"> Agentic AI</span>, and 
            <span className="font-semibold text-green-600"> Blockchain</span> for transparent healthcare
          </p>

          <div className="flex justify-center space-x-8 mb-16 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-2xl font-bold text-red-600">87.5%</p>
              <p className="text-sm text-gray-600">AI Accuracy</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-2xl font-bold text-blue-600">42%</p>
              <p className="text-sm text-gray-600">Wait Time Reduced</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-2xl font-bold text-green-600">2340</p>
              <p className="text-sm text-gray-600">Organ Donors</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 hover:scale-105 hover:-translate-y-1 transition-all">
              <Globe className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Web Development</h3>
              <p className="text-gray-600 text-center mb-4">Next.js accessible healthcare interface</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Responsive Design
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time Updates
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:scale-105 hover:-translate-y-1 transition-all">
              <Brain className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Agentic AI</h3>
              <p className="text-gray-600 text-center mb-4">Automated appointment & queue management</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  87.5% Accuracy
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Automated Scheduling
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 hover:scale-105 hover:-translate-y-1 transition-all">
              <Shield className="h-12 w-12 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Blockchain</h3>
              <p className="text-gray-600 text-center mb-4">Transparent organ donation system</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  100% Transparency
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Zero Fraud
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
