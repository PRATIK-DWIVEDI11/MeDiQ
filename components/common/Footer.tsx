export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-red-400">MeDiQ</h3>
              <p className="text-gray-300 text-sm">
                AI-Driven Smart Hospital & Organ Donation Management System
              </p>
              <div className="flex space-x-4">
                <div className="bg-red-600 px-3 py-1 rounded text-xs font-medium">Web</div>
                <div className="bg-purple-600 px-3 py-1 rounded text-xs font-medium">AI</div>
                <div className="bg-green-600 px-3 py-1 rounded text-xs font-medium">Blockchain</div>
              </div>
            </div>
  
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Core Features</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• AI Appointment Booking</li>
                <li>• Queue Optimization</li>
                <li>• Blockchain Organ Donation</li>
                <li>• Real-time Analytics</li>
              </ul>
            </div>
  
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Technology Stack</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Next.js 14</li>
                <li>• Agentic AI</li>
                <li>• Ethereum Blockchain</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
  
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Info</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>📧 contact@mediq.health</p>
                <p>📞 +91-22-12345678</p>
                <p>📍 Medical Valley, Smart City</p>
              </div>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 MeDiQ Hospital System. Built with Next.js, Agentic AI & Blockchain.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  