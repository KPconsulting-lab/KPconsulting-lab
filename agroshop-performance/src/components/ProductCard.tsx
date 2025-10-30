'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { FaShoppingCart, FaClock, FaLeaf, FaCheckCircle } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [showToast, setShowToast] = useState(false)

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(product.price)

  const handleAddToCart = () => {
    addToCart(product)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group relative">
      {/* Toast de confirmation */}
      {showToast && (
        <div className="absolute top-2 left-2 right-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10 flex items-center gap-2 animate-slide-down">
          <FaCheckCircle />
          <span className="text-sm font-medium">Ajouté au panier!</span>
        </div>
      )}
      {/* Image */}
      <Link href={`/produits/${product.id}`}>
        <div className="relative h-48 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <FaLeaf className="text-primary-200 text-6xl" />
          </div>
          <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.stock > 0 ? 'En Stock' : 'Rupture'}
          </div>
        </div>
      </Link>

      {/* Contenu */}
      <div className="p-4">
        <Link href={`/produits/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Informations */}
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
          <div className="flex items-center space-x-1">
            <FaClock />
            <span>{product.harvestTime}</span>
          </div>
          <div className="bg-primary-100 text-primary-700 px-2 py-1 rounded">
            {product.category}
          </div>
        </div>

        {/* Prix et action */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formattedPrice}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            <FaShoppingCart />
            <span className="text-sm font-medium">Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  )
}
