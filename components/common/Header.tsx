'use client'
import Link from 'next/link'
import { Stethoscope, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-red-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-600">MeDiQ</h1>
              <p className="text-xs text-gray-600">Smart Hospital System</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Features
            </a>
            <a href="#domains" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Technology
            </a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Contact
            </a>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-b">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block py-2 text-gray-700 hover:text-red-600 transition-colors">
                Features
              </a>
              <a href="#domains" className="block py-2 text-gray-700 hover:text-red-600 transition-colors">
                Technology
              </a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-red-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
