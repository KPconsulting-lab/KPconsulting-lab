'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { FaLock, FaArrowLeft, FaCheckCircle } from 'react-icons/fa'

export default function CheckoutPage() {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: '',
    prenom: '',
    email: '',
    telephone: '',

    // Adresse de livraison
    adresse: '',
    ville: '',
    codePostal: '',
    region: '',

    // Paiement
    modePaiement: 'mobile',
    numeroMobile: '',

    // Notes
    notes: '',
  })

  const formattedTotal = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(getTotalPrice())

  // Rediriger si le panier est vide
  if (cart.length === 0 && !orderCompleted) {
    router.push('/panier')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError('')

    try {
      // Générer un numéro de commande
      const orderNum = 'CMD-' + Date.now().toString().slice(-8)
      setOrderNumber(orderNum)

      // Si paiement Mobile Money via Fedapay
      if (formData.modePaiement === 'mobile') {
        // Préparer la description de la commande
        const description = `Commande ${orderNum} - ${getTotalItems()} article(s)`

        // Créer la transaction Fedapay
        const response = await fetch('/api/fedapay/create-transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: getTotalPrice(),
            description,
            customer: {
              firstname: formData.prenom,
              lastname: formData.nom,
              email: formData.email,
              phone: formData.numeroMobile,
            },
          }),
        })

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Erreur lors de la création du paiement')
        }

        // Sauvegarder les infos de commande avant redirection
        localStorage.setItem('pending_order', JSON.stringify({
          orderNumber: orderNum,
          transactionId: data.transaction.id,
          transactionRef: data.transaction.reference,
          customer: formData,
          cart: cart,
          total: getTotalPrice(),
        }))

        // Rediriger vers la page de paiement Fedapay
        window.location.href = data.transaction.payment_url

      } else {
        // Paiement à la livraison (Cash) - traitement classique
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Sauvegarder la commande (en production: envoyer vers API backend)
        localStorage.setItem('completed_order', JSON.stringify({
          orderNumber: orderNum,
          customer: formData,
          cart: cart,
          total: getTotalPrice(),
          paymentMethod: 'cash',
          date: new Date().toISOString(),
        }))

        setOrderCompleted(true)
        clearCart()
      }
    } catch (error: any) {
      console.error('Erreur:', error)
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.')
      setIsProcessing(false)
    }
  }

  // Page de confirmation (pour paiement à la livraison uniquement)
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Commande Confirmée!
              </h1>
              <p className="text-gray-600 mb-2">
                Merci pour votre commande. Votre numéro de commande est:
              </p>
              <p className="text-2xl font-bold text-primary-600 mb-6">{orderNumber}</p>

              <div className="bg-primary-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-3">Prochaines Étapes</h3>
                <ul className="text-left text-gray-700 space-y-2">
                  <li>✅ Confirmation envoyée par email</li>
                  <li>📦 Préparation de votre commande</li>
                  <li>🚚 Livraison sous 24-48h</li>
                  <li>💵 Paiement à la livraison</li>
                  <li>📞 Suivi par SMS/WhatsApp</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/produits"
                  className="block bg-primary-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-primary-700 transition"
                >
                  Continuer mes Achats
                </Link>
                <Link
                  href="/"
                  className="block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Retour à l'Accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/panier"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium mb-4"
            >
              <FaArrowLeft />
              <span>Retour au Panier</span>
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">Finaliser la Commande</h1>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium">⚠️ {error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Informations Personnelles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        required
                        placeholder="+228 XX XX XX XX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Adresse de Livraison
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse complète *
                      </label>
                      <input
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleInputChange}
                        required
                        placeholder="Rue, quartier, numéro..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="ville"
                          value={formData.ville}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code Postal
                        </label>
                        <input
                          type="text"
                          name="codePostal"
                          value={formData.codePostal}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Région *
                        </label>
                        <select
                          name="region"
                          value={formData.region}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Sélectionner</option>
                          <option value="Maritime">Maritime</option>
                          <option value="Plateaux">Plateaux</option>
                          <option value="Centrale">Centrale</option>
                          <option value="Kara">Kara</option>
                          <option value="Savanes">Savanes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paiement */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FaLock className="text-green-600" />
                    <span>Mode de Paiement</span>
                  </h2>
                  <div className="space-y-4">
                    <div className="border border-primary-200 rounded-lg p-4 bg-primary-50">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="modePaiement"
                          value="mobile"
                          checked={formData.modePaiement === 'mobile'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary-600 mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">Mobile Money (TMoney, Flooz)</div>
                          <div className="text-sm text-gray-600 mt-1">
                            💳 Paiement sécurisé via Fedapay
                          </div>
                          <div className="text-xs text-primary-700 mt-2 font-medium">
                            ✅ Paiement instantané • ✅ 100% sécurisé
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="modePaiement"
                          value="livraison"
                          checked={formData.modePaiement === 'livraison'}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-primary-600 mt-1"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-800">Paiement à la Livraison (Cash)</div>
                          <div className="text-sm text-gray-600 mt-1">
                            💵 Payez en espèces à la réception
                          </div>
                        </div>
                      </label>
                    </div>

                    {formData.modePaiement === 'mobile' && (
                      <div className="mt-4 border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Numéro Mobile Money *
                        </label>
                        <input
                          type="tel"
                          name="numeroMobile"
                          value={formData.numeroMobile}
                          onChange={handleInputChange}
                          required={formData.modePaiement === 'mobile'}
                          placeholder="+228 XX XX XX XX"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          ℹ️ Vous serez redirigé vers la page de paiement sécurisée Fedapay
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Notes (Optionnel)
                  </h2>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Instructions spéciales pour la livraison..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Résumé */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Résumé Commande</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  {cart.map((item) => {
                    const itemTotal = item.price * item.quantity
                    const formattedItemTotal = new Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'XOF',
                      minimumFractionDigits: 0,
                    }).format(itemTotal)

                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium text-gray-800">{formattedItemTotal}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total ({getTotalItems()} articles)</span>
                    <span className="font-medium">{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span className="font-medium text-green-600">Gratuite</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-800">Total</span>
                      <span className="text-primary-600">{formattedTotal}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {formData.modePaiement === 'mobile' ? 'Redirection...' : 'Traitement...'}
                    </span>
                  ) : (
                    formData.modePaiement === 'mobile'
                      ? '💳 Payer avec Mobile Money'
                      : 'Confirmer la Commande'
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  <FaLock className="inline mr-1" />
                  {formData.modePaiement === 'mobile'
                    ? 'Paiement 100% sécurisé par Fedapay'
                    : 'Paiement 100% sécurisé'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
