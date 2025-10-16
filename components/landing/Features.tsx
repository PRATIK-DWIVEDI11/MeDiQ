// 'use client'
// import { motion } from 'framer-motion'
// import { 
//   Zap, Target, Shield, Clock, 
//   Brain, Heart, Globe, BarChart3,
//   CheckCircle, TrendingUp 
// } from 'lucide-react'

// export default function Features() {
//   const features = [
//     {
//       icon: Brain,
//       title: 'AI Urgency Scoring',
//       description: 'Intelligent patient prioritization with 87.5% accuracy based on symptoms and vitals',
//       stats: '87.5% Accuracy',
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-50'
//     },
//     {
//       icon: Clock,
//       title: 'Queue Optimization', 
//       description: 'Real-time queue management reduces wait times by 42% with predictive analytics',
//       stats: '42% Time Reduction',
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-50'
//     },
//     {
//       icon: Heart,
//       title: 'Blockchain Organ Donation',
//       description: 'Transparent organ matching with 2340 verified donors and zero fraud cases',
//       stats: '2340 Donors',
//       color: 'text-red-600',
//       bgColor: 'bg-red-50'
//     },
//     {
//       icon: Zap,
//       title: 'Automated Scheduling',
//       description: 'Agentic AI handles appointment booking with smart doctor matching',
//       stats: '91% Match Accuracy',
//       color: 'text-yellow-600',
//       bgColor: 'bg-yellow-50'
//     },
//     {
//       icon: Shield,
//       title: 'Secure Records',
//       description: 'Blockchain-secured medical records with patient-controlled access',
//       stats: '100% Security',
//       color: 'text-green-600',
//       bgColor: 'bg-green-50'
//     },
//     {
//       icon: BarChart3,
//       title: 'Real-time Analytics',
//       description: 'Live hospital metrics and performance tracking for optimal resource management',
//       stats: '99.9% Uptime',
//       color: 'text-indigo-600',
//       bgColor: 'bg-indigo-50'
//     }
//   ]

//   const domains = [
//     {
//       title: 'Web Development',
//       subtitle: 'Next.js Frontend',
//       description: 'Modern, responsive, and accessible healthcare interface built with Next.js 14',
//       technologies: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
//       icon: Globe,
//       color: 'blue'
//     },
//     {
//       title: 'Agentic AI',
//       subtitle: 'Automated Healthcare',
//       description: 'Intelligent agents for appointment automation and clinical decision support',
//       technologies: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Clinical AI'],
//       icon: Brain,
//       color: 'purple'
//     },
//     {
//       title: 'Blockchain',
//       subtitle: 'Organ Donation',
//       description: 'Transparent and secure organ donation management with smart contracts',
//       technologies: ['Ethereum', 'Smart Contracts', 'Decentralized Storage', 'Cryptographic Security'],
//       icon: Shield,
//       color: 'green'
//     }
//   ]

//   return (
//     <div className="space-y-24">
//       <section className="py-24 bg-gray-50" id="features">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Core Features
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Advanced healthcare technology powered by AI and blockchain
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 className="group"
//               >
//                 <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:scale-105">
//                   <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
//                     <feature.icon className={`h-8 w-8 ${feature.color}`} />
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
//                   <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  
//                   <div className="flex items-center justify-between">
//                     <div className={`${feature.bgColor} px-4 py-2 rounded-full`}>
//                       <span className={`text-sm font-bold ${feature.color}`}>{feature.stats}</span>
//                     </div>
//                     <CheckCircle className="h-5 w-5 text-green-500" />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-white" id="domains">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-20">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//               Technology Domains
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Three cutting-edge technologies integrated for revolutionary healthcare
//             </p>
//           </div>

//           <div className="grid lg:grid-cols-3 gap-12">
//             {domains.map((domain, index) => (
//               <motion.div
//                 key={domain.title}
//                 initial={{ opacity: 0, x: index === 0 ? -30 : index === 2 ? 30 : 0, y: index === 1 ? -30 : 0 }}
//                 animate={{ opacity: 1, x: 0, y: 0 }}
//                 transition={{ duration: 0.8, delay: index * 0.2 }}
//                 className="relative group"
//               >
//                 <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:scale-105">
//                   <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 mx-auto
//                     ${domain.color === 'blue' ? 'bg-blue-100' : 
//                       domain.color === 'purple' ? 'bg-purple-100' : 'bg-green-100'}
//                     group-hover:scale-110 transition-transform`}>
//                     <domain.icon className={`h-10 w-10 
//                       ${domain.color === 'blue' ? 'text-blue-600' : 
//                         domain.color === 'purple' ? 'text-purple-600' : 'text-green-600'}`} />
//                   </div>

//                   <div className="text-center mb-8">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2">{domain.title}</h3>
//                     <p className={`text-sm font-medium mb-4 
//                       ${domain.color === 'blue' ? 'text-blue-600' : 
//                         domain.color === 'purple' ? 'text-purple-600' : 'text-green-600'}`}>
//                       {domain.subtitle}
//                     </p>
//                     <p className="text-gray-600 leading-relaxed">{domain.description}</p>
//                   </div>

//                   <div className="space-y-3">
//                     {domain.technologies.map((tech, idx) => (
//                       <div key={idx} className="flex items-center">
//                         <div className={`w-2 h-2 rounded-full mr-3 
//                           ${domain.color === 'blue' ? 'bg-blue-500' : 
//                             domain.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'}`}></div>
//                         <span className="text-sm text-gray-700 font-medium">{tech}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300
//                     from-blue-600 via-purple-600 to-green-600"></div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <div className="mt-20 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-12 text-white text-center">
//             <h3 className="text-3xl font-bold mb-8">MeDiQ Impact</h3>
//             <div className="grid md:grid-cols-4 gap-8">
//               <div>
//                 <div className="text-4xl font-bold mb-2">87.5%</div>
//                 <div className="text-blue-100">AI Accuracy</div>
//               </div>
//               <div>
//                 <div className="text-4xl font-bold mb-2">42%</div>
//                 <div className="text-blue-100">Wait Time Reduced</div>
//               </div>
//               <div>
//                 <div className="text-4xl font-bold mb-2">2340</div>
//                 <div className="text-blue-100">Organ Donors</div>
//               </div>
//               <div>
//                 <div className="text-4xl font-bold mb-2">94%</div>
//                 <div className="text-blue-100">Patient Satisfaction</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }


import { 
  Zap, Target, Shield, Clock, 
  Brain, Heart, Globe, BarChart3,
  CheckCircle, TrendingUp 
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI Urgency Scoring',
      description: 'Intelligent patient prioritization with 87.5% accuracy based on symptoms and vitals',
      stats: '87.5% Accuracy',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Clock,
      title: 'Queue Optimization', 
      description: 'Real-time queue management reduces wait times by 42% with predictive analytics',
      stats: '42% Time Reduction',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      title: 'Blockchain Organ Donation',
      description: 'Transparent organ matching with 2340 verified donors and zero fraud cases',
      stats: '2340 Donors',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Zap,
      title: 'Automated Scheduling',
      description: 'Agentic AI handles appointment booking with smart doctor matching',
      stats: '91% Match Accuracy',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Shield,
      title: 'Secure Records',
      description: 'Blockchain-secured medical records with patient-controlled access',
      stats: '100% Security',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Live hospital metrics and performance tracking for optimal resource management',
      stats: '99.9% Uptime',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ]

  return (
    <div className="space-y-24">
      <section className="py-24 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced healthcare technology powered by AI and blockchain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`${feature.bgColor} px-4 py-2 rounded-full`}>
                      <span className={`text-sm font-bold ${feature.color}`}>{feature.stats}</span>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white" id="domains">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Technology Domains
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three cutting-edge technologies integrated for revolutionary healthcare
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="relative group">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:scale-105">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <Globe className="h-10 w-10 text-blue-600" />
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Web Development</h3>
                  <p className="text-sm font-medium text-blue-600 mb-4">Next.js Frontend</p>
                  <p className="text-gray-600 leading-relaxed">Modern, responsive, and accessible healthcare interface built with Next.js 14</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Next.js 14</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Tailwind CSS</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">TypeScript</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Responsive Design</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:scale-105">
                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <Brain className="h-10 w-10 text-purple-600" />
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Agentic AI</h3>
                  <p className="text-sm font-medium text-purple-600 mb-4">Automated Healthcare</p>
                  <p className="text-gray-600 leading-relaxed">Intelligent agents for appointment automation and clinical decision support</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Machine Learning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Natural Language Processing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Predictive Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Clinical AI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 h-full transition-all duration-500 hover:shadow-2xl hover:scale-105">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Blockchain</h3>
                  <p className="text-sm font-medium text-green-600 mb-4">Organ Donation</p>
                  <p className="text-gray-600 leading-relaxed">Transparent and secure organ donation management with smart contracts</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Ethereum</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Smart Contracts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Decentralized Storage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700 font-medium">Cryptographic Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-8">MeDiQ Impact</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">87.5%</div>
                <div className="text-blue-100">AI Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">42%</div>
                <div className="text-blue-100">Wait Time Reduced</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">2340</div>
                <div className="text-blue-100">Organ Donors</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">94%</div>
                <div className="text-blue-100">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
