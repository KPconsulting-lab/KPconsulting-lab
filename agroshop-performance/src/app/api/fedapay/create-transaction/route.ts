import { NextRequest, NextResponse } from 'next/server'
import { createFedaPayTransaction } from '@/lib/fedapay'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      amount,
      description,
      customer,
    } = body

    // Validation
    if (!amount || !description || !customer) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Créer la transaction Fedapay
    const transaction = await createFedaPayTransaction({
      amount,
      description,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      customer: {
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone_number: {
          number: customer.phone,
          country: 'TG', // Togo
        },
      },
      currency: {
        iso: 'XOF', // Franc CFA
      },
    })

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        status: transaction.status,
        payment_url: transaction.url,
        token: transaction.token,
      },
    })
  } catch (error: any) {
    console.error('Erreur création transaction:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors de la création de la transaction',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
