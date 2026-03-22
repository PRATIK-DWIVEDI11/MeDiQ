import { Zap, Shield, Clock, Brain, Heart, Globe, BarChart3, CheckCircle } from 'lucide-react'

export default function Features() {
  const features = [
    { icon: Brain, title: 'AI Urgency Scoring', description: 'Intelligent patient prioritization with 87.5% accuracy based on symptoms and vitals', stats: '87.5% Accuracy', color: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/30' },
    { icon: Clock, title: 'Queue Optimization', description: 'Real-time queue management reduces wait times by 42% with predictive analytics', stats: '42% Time Reduction', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/30' },
    { icon: Heart, title: 'Blockchain Organ Donation', description: 'Transparent organ matching with 2340 verified donors and zero fraud cases', stats: '2340 Donors', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/30' },
    { icon: Zap, title: 'Automated Scheduling', description: 'Agentic AI handles appointment booking with smart doctor matching', stats: '91% Match Accuracy', color: 'text-yellow-600', bgColor: 'bg-yellow-50 dark:bg-yellow-900/30' },
    { icon: Shield, title: 'Secure Records', description: 'Blockchain-secured medical records with patient-controlled access', stats: '100% Security', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/30' },
    { icon: BarChart3, title: 'Real-time Analytics', description: 'Live hospital metrics and performance tracking for optimal resource management', stats: '99.9% Uptime', color: 'text-indigo-600', bgColor: 'bg-indigo-50 dark:bg-indigo-900/30' }
  ]

  return (
    <div className="space-y-24">
      {/* Core Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Core Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Advanced healthcare technology powered by AI and blockchain</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
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

      {/* Technology Domains */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300" id="domains">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Technology Domains</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Three cutting-edge technologies integrated for revolutionary healthcare</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { icon: Globe, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/40', label: 'Next.js Frontend', accent: 'text-blue-600', dot: 'bg-blue-500', title: 'Web Development', desc: 'Modern, responsive, and accessible healthcare interface built with Next.js 14', items: ['Next.js 14', 'Tailwind CSS', 'TypeScript', 'Responsive Design'] },
              { icon: Brain, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/40', label: 'Automated Healthcare', accent: 'text-purple-600', dot: 'bg-purple-500', title: 'Agentic AI', desc: 'Intelligent agents for appointment automation and clinical decision support', items: ['Machine Learning', 'Natural Language Processing', 'Predictive Analytics', 'Clinical AI'] },
              { icon: Shield, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/40', label: 'Organ Donation', accent: 'text-green-600', dot: 'bg-green-500', title: 'Blockchain', desc: 'Transparent and secure organ donation management with smart contracts', items: ['Ethereum', 'Smart Contracts', 'Decentralized Storage', 'Cryptographic Security'] }
            ].map((domain) => (
              <div key={domain.title} className="relative group">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-gray-100 dark:border-gray-700 h-full transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <div className={`w-20 h-20 ${domain.bg} rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:scale-110 transition-transform`}>
                    <domain.icon className={`h-10 w-10 ${domain.color}`} />
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{domain.title}</h3>
                    <p className={`text-sm font-medium ${domain.accent} mb-4`}>{domain.label}</p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{domain.desc}</p>
                  </div>
                  <div className="space-y-3">
                    {domain.items.map((item) => (
                      <div key={item} className="flex items-center">
                        <div className={`w-2 h-2 ${domain.dot} rounded-full mr-3`}></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Banner */}
          <div className="mt-20 bg-gradient-to-r from-red-600 to-blue-600 rounded-3xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-8">MeDiQ Impact</h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[['87.5%', 'AI Accuracy'], ['42%', 'Wait Time Reduced'], ['2340', 'Organ Donors'], ['94%', 'Patient Satisfaction']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-4xl font-bold mb-2">{val}</div>
                  <div className="text-blue-100">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

