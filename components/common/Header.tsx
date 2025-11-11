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
          {/* LOGO clickable to Home */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <div className="bg-red-600 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-600">MeDiQ</h1>
              <p className="text-xs text-gray-600">Smart Hospital System</p>
            </div>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Features
            </a>
            <a href="#domains" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Technology
            </a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Contact
            </a>
            {/* LOGIN button, always right-aligned */}
            <Link href="/auth" className="ml-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          </nav>
          {/* Hamburger Mobile Menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-b z-20">
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
              <Link href="/auth">
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

