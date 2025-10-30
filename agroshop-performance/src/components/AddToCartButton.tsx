'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { FaShoppingCart, FaMinus, FaPlus, FaCheckCircle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push('/panier')
  }

  return (
    <div>
      {/* Toast de confirmation */}
      {showToast && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-slide-down">
          <FaCheckCircle className="text-2xl" />
          <div>
            <p className="font-bold">Ajouté au panier!</p>
            <p className="text-sm text-green-100">{quantity} x {product.name}</p>
          </div>
        </div>
      )}

      {/* Sélecteur de quantité */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quantité
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-3 transition"
            aria-label="Diminuer quantité"
          >
            <FaMinus />
          </button>
          <span className="text-2xl font-bold w-16 text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-3 transition"
            disabled={quantity >= product.stock}
            aria-label="Augmenter quantité"
          >
            <FaPlus />
          </button>
          {quantity >= product.stock && (
            <span className="text-sm text-orange-600">
              Maximum disponible
            </span>
          )}
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-primary-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition flex items-center justify-center space-x-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          <FaShoppingCart className="text-2xl" />
          <span>Ajouter au Panier</span>
        </button>

        <button
          onClick={handleBuyNow}
          className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          Acheter Maintenant
        </button>
      </div>

      {product.stock === 0 && (
        <p className="text-center text-red-600 mt-4 font-medium">
          Ce produit sera bientôt disponible
        </p>
      )}
    </div>
  )
}
