// 'use client'
// import Link from 'next/link'
// import { motion } from 'framer-motion'
// import { User, UserCheck, Shield } from 'lucide-react'

// export default function LoginPortals() {
//   const portals = [
//     {
//       title: 'Patient Portal',
//       description: 'AI-powered appointment booking, queue status, and medical records access',
//       icon: User,
//       href: '/patient',
//       color: 'from-blue-500 to-blue-600',
//       hoverColor: 'hover:from-blue-600 hover:to-blue-700',
//       features: [
//         'AI Doctor Matching',
//         'Real-time Queue Status', 
//         'Medical Records Access',
//         'Telemedicine Support'
//       ]
//     },
//     {
//       title: 'Doctor Portal', 
//       description: 'Agentic AI clinical dashboard with automated patient management',
//       icon: UserCheck,
//       href: '/doctor',
//       color: 'from-green-500 to-green-600',
//       hoverColor: 'hover:from-green-600 hover:to-green-700',
//       features: [
//         'AI Clinical Tools',
//         'Automated Scheduling',
//         'Urgency Scoring (87.5% accuracy)',
//         'Patient Management'
//       ]
//     },
//     {
//       title: 'Admin Dashboard',
//       description: 'Hospital analytics, staff management, and blockchain organ donation',
//       icon: Shield,
//       href: '/admin',
//       color: 'from-red-500 to-red-600', 
//       hoverColor: 'hover:from-red-600 hover:to-red-700',
//       features: [
//         'Hospital Analytics',
//         'Staff Management',
//         'Blockchain Organ Donation (2340 donors)',
//         'Real-time Monitoring'
//       ]
//     }
//   ]

//   return (
//     <section className="py-24 bg-white" id="portals">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-20">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//             Choose Your Portal
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Access your personalized healthcare dashboard with AI-powered features
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {portals.map((portal, index) => (
//             <motion.div
//               key={portal.title}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               className="group"
//             >
//               <Link href={portal.href}>
//                 <div className="h-full cursor-pointer">
//                   <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 group-hover:border-gray-200">
//                     <div className={`bg-gradient-to-r ${portal.color} ${portal.hoverColor} p-8 text-center transition-all duration-300`}>
//                       <portal.icon className="h-16 w-16 text-white mx-auto mb-4" />
//                       <h3 className="text-2xl font-bold text-white mb-2">{portal.title}</h3>
//                       <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 inline-block">
//                         <span className="text-white text-sm font-medium">Access Now →</span>
//                       </div>
//                     </div>
                    
//                     <div className="p-8">
//                       <p className="text-gray-600 mb-6 text-center leading-relaxed">{portal.description}</p>
                      
//                       <ul className="space-y-3 mb-8">
//                         {portal.features.map((feature, idx) => (
//                           <li key={idx} className="flex items-start text-sm text-gray-700">
//                             <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
//                             <span>{feature}</span>
//                           </li>
//                         ))}
//                       </ul>
                      
//                       <div className="text-center">
//                         <div className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors group-hover:bg-red-600">
//                           Enter Portal
//                           <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         <div className="text-center mt-16">
//           <p className="text-lg text-gray-600 mb-4">
//             Experience the future of healthcare management
//           </p>
//           <div className="flex justify-center space-x-4 text-sm">
//             <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">Web Development</span>
//             <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Agentic AI</span>
//             <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Blockchain</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import Link from 'next/link'
import { User, UserCheck, Shield } from 'lucide-react'

export default function LoginPortals() {
  const portals = [
    {
      title: 'Patient Portal',
      description: 'AI-powered appointment booking, queue status, and medical records access',
      icon: User,
      href: '/patient',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      features: [
        'AI Doctor Matching',
        'Real-time Queue Status', 
        'Medical Records Access',
        'Telemedicine Support'
      ]
    },
    {
      title: 'Doctor Portal', 
      description: 'Agentic AI clinical dashboard with automated patient management',
      icon: UserCheck,
      href: '/doctor',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      features: [
        'AI Clinical Tools',
        'Automated Scheduling',
        'Urgency Scoring (87.5% accuracy)',
        'Patient Management'
      ]
    },
    {
      title: 'Admin Dashboard',
      description: 'Hospital analytics, staff management, and blockchain organ donation',
      icon: Shield,
      href: '/admin',
      color: 'from-red-500 to-red-600', 
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      features: [
        'Hospital Analytics',
        'Staff Management',
        'Blockchain Organ Donation (2340 donors)',
        'Real-time Monitoring'
      ]
    }
  ]

  return (
    <section className="py-24 bg-white" id="portals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Portal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access your personalized healthcare dashboard with AI-powered features
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {portals.map((portal, index) => (
            <div key={portal.title} className="group">
              <Link href={portal.href}>
                <div className="h-full cursor-pointer">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 group-hover:border-gray-200">
                    <div className={`bg-gradient-to-r ${portal.color} ${portal.hoverColor} p-8 text-center transition-all duration-300`}>
                      <portal.icon className="h-16 w-16 text-white mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">{portal.title}</h3>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 inline-block">
                        <span className="text-white text-sm font-medium">Access Now →</span>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <p className="text-gray-600 mb-6 text-center leading-relaxed">{portal.description}</p>
                      
                      <ul className="space-y-3 mb-8">
                        {portal.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="text-center">
                        <div className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors group-hover:bg-red-600">
                          Enter Portal
                          <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-4">
            Experience the future of healthcare management
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">Web Development</span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Agentic AI</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Blockchain</span>
          </div>
        </div>
      </div>
    </section>
  )
}
