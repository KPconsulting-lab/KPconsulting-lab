'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface PendingOrder {
  orderNumber: string
  transactionId: string
  transactionRef: string
  customer: {
    nom: string
    prenom: string
    email: string
    numeroMobile: string
    adresse: string
  }
  cart: any[]
  total: number
}

interface TransactionStatus {
  id: string
  reference: string
  amount: number
  status: string
  description: string
  customer: any
}

export default function PaymentVerify() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()

  const [status, setStatus] = useState<'loading' | 'success' | 'failed' | 'pending' | 'error'>('loading')
  const [transaction, setTransaction] = useState<TransactionStatus | null>(null)
  const [pendingOrder, setPendingOrder] = useState<PendingOrder | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Récupérer la commande en attente depuis localStorage
        const orderData = localStorage.getItem('pending_order')
        if (!orderData) {
          setStatus('error')
          setErrorMessage('Aucune commande en attente trouvée')
          return
        }

        const order: PendingOrder = JSON.parse(orderData)
        setPendingOrder(order)

        // Récupérer l'ID de transaction depuis l'URL ou depuis la commande
        const transactionId = searchParams.get('id') || order.transactionId

        if (!transactionId) {
          setStatus('error')
          setErrorMessage('ID de transaction manquant')
          return
        }

        // Vérifier le statut de la transaction
        const response = await fetch(`/api/fedapay/verify-transaction?id=${transactionId}`)

        if (!response.ok) {
          throw new Error('Erreur lors de la vérification de la transaction')
        }

        const data = await response.json()

        if (data.success && data.transaction) {
          setTransaction(data.transaction)

          // Déterminer le statut basé sur la réponse Fedapay
          switch (data.transaction.status) {
            case 'approved':
              setStatus('success')
              // Nettoyer le panier et localStorage
              clearCart()
              localStorage.removeItem('pending_order')
              break
            case 'pending':
              setStatus('pending')
              break
            case 'canceled':
            case 'declined':
              setStatus('failed')
              break
            default:
              setStatus('error')
              setErrorMessage('Statut de transaction inconnu')
          }
        } else {
          setStatus('error')
          setErrorMessage(data.message || 'Erreur lors de la vérification')
        }
      } catch (error: any) {
        console.error('Erreur vérification paiement:', error)
        setStatus('error')
        setErrorMessage(error.message || 'Une erreur est survenue')
      }
    }

    verifyPayment()
  }, [searchParams, clearCart])

  // Affichage pendant le chargement
  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600 mx-auto mb-6"></div>
          <h1 className="text-2xl font-bold mb-4">Vérification du paiement...</h1>
          <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre paiement.</p>
        </div>
      </div>
    )
  }

  // Affichage en cas de succès
  if (status === 'success' && transaction && pendingOrder) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center mb-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-green-800 mb-4">Paiement réussi !</h1>
            <p className="text-green-700 mb-2">
              Votre commande <strong>#{pendingOrder.orderNumber}</strong> a été confirmée.
            </p>
            <p className="text-green-600">
              Transaction: {transaction.reference}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Informations client</h3>
              <p className="text-gray-700">{pendingOrder.customer.prenom} {pendingOrder.customer.nom}</p>
              <p className="text-gray-600">{pendingOrder.customer.email}</p>
              <p className="text-gray-600">{pendingOrder.customer.numeroMobile}</p>
              <p className="text-gray-600">{pendingOrder.customer.adresse}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Articles commandés</h3>
              <div className="space-y-2">
                {pendingOrder.cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total payé</span>
                <span className="text-green-600">{pendingOrder.total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              📧 Un email de confirmation a été envoyé à <strong>{pendingOrder.customer.email}</strong>
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/produits"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Affichage en cas de paiement en attente
  if (status === 'pending' && transaction && pendingOrder) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center mb-8">
            <div className="text-yellow-600 text-6xl mb-4">⏳</div>
            <h1 className="text-3xl font-bold text-yellow-800 mb-4">Paiement en cours...</h1>
            <p className="text-yellow-700 mb-2">
              Votre paiement pour la commande <strong>#{pendingOrder.orderNumber}</strong> est en cours de traitement.
            </p>
            <p className="text-yellow-600 text-sm">
              Transaction: {transaction.reference}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <p className="text-gray-700 mb-4">
              Votre paiement est en cours de validation. Cela peut prendre quelques minutes.
            </p>
            <p className="text-gray-600 text-sm">
              Vous recevrez un email de confirmation dès que le paiement sera confirmé.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Actualiser le statut
            </button>
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Affichage en cas d'échec
  if (status === 'failed' && transaction && pendingOrder) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center mb-8">
            <div className="text-red-600 text-6xl mb-4">✗</div>
            <h1 className="text-3xl font-bold text-red-800 mb-4">Paiement échoué</h1>
            <p className="text-red-700 mb-2">
              Le paiement pour la commande <strong>#{pendingOrder.orderNumber}</strong> n'a pas pu être traité.
            </p>
            <p className="text-red-600 text-sm">
              Transaction: {transaction.reference} - Statut: {transaction.status}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Que faire maintenant ?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Vérifiez que vous avez suffisamment de solde</li>
              <li>Assurez-vous que votre numéro Mobile Money est actif</li>
              <li>Réessayez le paiement</li>
              <li>Contactez notre service client si le problème persiste</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Link
              href="/checkout"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
            >
              Réessayer le paiement
            </Link>
            <Link
              href="/"
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Affichage en cas d'erreur
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center mb-8">
          <div className="text-red-600 text-6xl mb-4">⚠</div>
          <h1 className="text-3xl font-bold text-red-800 mb-4">Erreur</h1>
          <p className="text-red-700">
            {errorMessage || 'Une erreur est survenue lors de la vérification du paiement.'}
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/panier"
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
          >
            Voir mon panier
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors text-center font-medium"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
