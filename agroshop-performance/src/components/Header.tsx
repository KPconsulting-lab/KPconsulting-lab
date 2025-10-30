'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaSeedling, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-primary-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-primary-100 transition">
            <FaSeedling className="text-3xl" />
            <span>AgroShop TG</span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary-100 transition font-medium">
              Accueil
            </Link>
            <Link href="/produits" className="hover:text-primary-100 transition font-medium">
              Produits
            </Link>
            <Link href="/blogs" className="hover:text-primary-100 transition font-medium">
              Blog
            </Link>
            <Link href="/blogs/semences" className="hover:text-primary-100 transition font-medium">
              Semences
            </Link>
            <Link href="/contact" className="hover:text-primary-100 transition font-medium">
              Contact
            </Link>
          </nav>

          {/* Panier et Menu Mobile */}
          <div className="flex items-center space-x-4">
            <button className="relative hover:text-primary-100 transition" aria-label="Panier">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Bouton Menu Mobile */}
            <button
              className="md:hidden text-2xl hover:text-primary-100 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Navigation Mobile */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3 border-t border-primary-500 pt-4">
            <Link
              href="/"
              className="block hover:text-primary-100 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/produits"
              className="block hover:text-primary-100 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </Link>
            <Link
              href="/blogs"
              className="block hover:text-primary-100 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/blogs/semences"
              className="block hover:text-primary-100 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Semences
            </Link>
            <Link
              href="/contact"
              className="block hover:text-primary-100 transition font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
