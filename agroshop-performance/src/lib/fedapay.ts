// Service Fedapay pour les paiements
import FedaPay from 'fedapay'

// Configuration Fedapay
export const initFedaPay = () => {
  FedaPay.setApiKey(process.env.FEDAPAY_SECRET_KEY || '')
  FedaPay.setEnvironment(
    process.env.FEDAPAY_SECRET_KEY?.startsWith('sk_live') ? 'live' : 'sandbox'
  )
}

// Types pour les transactions
export interface FedaPayTransaction {
  amount: number
  description: string
  callback_url: string
  customer: {
    firstname: string
    lastname: string
    email: string
    phone_number: {
      number: string
      country: string
    }
  }
  currency: {
    iso: string
  }
}

export interface FedaPayTransactionResponse {
  id: number
  reference: string
  amount: number
  status: string
  token: string
  url: string
  description: string
  callback_url: string
  customer: {
    id: number
    firstname: string
    lastname: string
    email: string
  }
  currency: {
    iso: string
  }
  mode: string
  operation: string
  created_at: string
  updated_at: string
}

// Créer une transaction Fedapay
export const createFedaPayTransaction = async (
  data: FedaPayTransaction
): Promise<FedaPayTransactionResponse> => {
  try {
    initFedaPay()

    const transaction = await FedaPay.Transaction.create({
      description: data.description,
      amount: data.amount,
      currency: data.currency,
      callback_url: data.callback_url,
      customer: data.customer,
    })

    // Générer le token de paiement
    const token = await transaction.generateToken()

    return {
      id: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      status: transaction.status,
      token: token.token,
      url: token.url,
      description: transaction.description,
      callback_url: transaction.callback_url,
      customer: transaction.customer,
      currency: transaction.currency,
      mode: transaction.mode,
      operation: transaction.operation,
      created_at: transaction.created_at,
      updated_at: transaction.updated_at,
    }
  } catch (error: any) {
    console.error('Erreur Fedapay:', error)
    throw new Error(error.message || 'Erreur lors de la création de la transaction')
  }
}

// Vérifier le statut d'une transaction
export const verifyFedaPayTransaction = async (
  transactionId: string
): Promise<any> => {
  try {
    initFedaPay()

    const transaction = await FedaPay.Transaction.retrieve(transactionId)

    return {
      id: transaction.id,
      reference: transaction.reference,
      amount: transaction.amount,
      status: transaction.status,
      description: transaction.description,
      customer: transaction.customer,
      currency: transaction.currency,
      mode: transaction.mode,
      created_at: transaction.created_at,
      updated_at: transaction.updated_at,
    }
  } catch (error: any) {
    console.error('Erreur vérification Fedapay:', error)
    throw new Error(error.message || 'Erreur lors de la vérification')
  }
}
