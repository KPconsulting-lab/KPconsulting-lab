'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowRight } from 'react-icons/fa'

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  const formattedTotal = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(getTotalPrice())

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-16">
            <FaShoppingCart className="text-gray-300 text-8xl mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Votre Panier est Vide
            </h1>
            <p className="text-gray-600 mb-8">
              Vous n'avez pas encore ajouté de produits à votre panier
            </p>
            <Link
              href="/produits"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition"
            >
              Découvrir nos Produits
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Mon Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemTotal = item.price * item.quantity
              const formattedPrice = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF',
                minimumFractionDigits: 0,
              }).format(item.price)

              const formattedItemTotal = new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'XOF',
                minimumFractionDigits: 0,
              }).format(itemTotal)

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row gap-4"
                >
                  {/* Image placeholder */}
                  <div className="w-full sm:w-32 h-32 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400 text-4xl">🌱</span>
                  </div>

                  {/* Info produit */}
                  <div className="flex-grow">
                    <Link
                      href={`/produits/${item.id}`}
                      className="text-xl font-bold text-gray-800 hover:text-primary-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <p className="text-primary-600 font-bold text-lg mt-2">
                      {formattedPrice} <span className="text-sm text-gray-500">/ unité</span>
                    </p>

                    {/* Contrôles quantité */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition"
                          aria-label="Diminuer quantité"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="text-lg font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-2 transition"
                          disabled={item.quantity >= item.stock}
                          aria-label="Augmenter quantité"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 transition flex items-center gap-2"
                      >
                        <FaTrash />
                        <span className="text-sm">Supprimer</span>
                      </button>
                    </div>

                    {item.quantity >= item.stock && (
                      <p className="text-orange-600 text-sm mt-2">
                        Stock maximum atteint ({item.stock} disponibles)
                      </p>
                    )}
                  </div>

                  {/* Total item */}
                  <div className="text-right sm:text-left">
                    <p className="text-sm text-gray-500 mb-1">Total</p>
                    <p className="text-2xl font-bold text-primary-600">{formattedItemTotal}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Résumé</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Articles ({getTotalItems()})</span>
                  <span className="font-medium">{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="font-medium text-green-600">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-primary-600">{formattedTotal}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition flex items-center justify-center gap-2"
              >
                <span>Passer la Commande</span>
                <FaArrowRight />
              </Link>

              <Link
                href="/produits"
                className="block text-center text-primary-600 hover:text-primary-700 mt-4 font-medium"
              >
                Continuer mes Achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
