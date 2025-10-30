import { NextRequest, NextResponse } from 'next/server'
import { verifyFedaPayTransaction } from '@/lib/fedapay'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const transactionId = searchParams.get('id')

    if (!transactionId) {
      return NextResponse.json(
        { error: 'ID de transaction manquant' },
        { status: 400 }
      )
    }

    // Vérifier la transaction
    const transaction = await verifyFedaPayTransaction(transactionId)

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        status: transaction.status,
        description: transaction.description,
        customer: transaction.customer,
      },
    })
  } catch (error: any) {
    console.error('Erreur vérification transaction:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors de la vérification',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transaction_id } = body

    if (!transaction_id) {
      return NextResponse.json(
        { error: 'ID de transaction manquant' },
        { status: 400 }
      )
    }

    // Vérifier la transaction
    const transaction = await verifyFedaPayTransaction(transaction_id)

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount,
        status: transaction.status,
        description: transaction.description,
        customer: transaction.customer,
      },
    })
  } catch (error: any) {
    console.error('Erreur vérification transaction:', error)
    return NextResponse.json(
      {
        error: 'Erreur lors de la vérification',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
