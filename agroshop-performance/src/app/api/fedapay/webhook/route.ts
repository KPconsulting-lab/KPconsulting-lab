import { NextRequest, NextResponse } from 'next/server'
import { verifyFedaPayTransaction } from '@/lib/fedapay'

// Webhook Fedapay pour les notifications de paiement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('Webhook Fedapay reçu:', body)

    // Fedapay envoie les événements suivants:
    // - transaction.approved (paiement approuvé)
    // - transaction.canceled (paiement annulé)
    // - transaction.declined (paiement refusé)

    const { entity, event } = body

    if (!entity || !event) {
      return NextResponse.json(
        { error: 'Données webhook invalides' },
        { status: 400 }
      )
    }

    // Vérifier la transaction pour s'assurer de son authenticité
    const transaction = await verifyFedaPayTransaction(entity.id)

    // Traiter selon le type d'événement
    switch (event) {
      case 'transaction.approved':
        // Paiement réussi
        console.log(`✅ Paiement approuvé: ${transaction.reference}`)
        // Ici, vous pouvez:
        // - Marquer la commande comme payée dans votre base de données
        // - Envoyer un email de confirmation au client
        // - Déclencher le processus de livraison
        // - Mettre à jour le stock
        break

      case 'transaction.canceled':
        // Paiement annulé
        console.log(`❌ Paiement annulé: ${transaction.reference}`)
        // Ici, vous pouvez:
        // - Marquer la commande comme annulée
        // - Envoyer une notification au client
        break

      case 'transaction.declined':
        // Paiement refusé
        console.log(`⛔ Paiement refusé: ${transaction.reference}`)
        // Ici, vous pouvez:
        // - Marquer la commande comme échouée
        // - Proposer une autre méthode de paiement
        break

      default:
        console.log(`Événement non géré: ${event}`)
    }

    // Répondre à Fedapay pour confirmer la réception du webhook
    return NextResponse.json({
      success: true,
      message: 'Webhook traité avec succès',
    })
  } catch (error: any) {
    console.error('Erreur traitement webhook:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors du traitement du webhook',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
