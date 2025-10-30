import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'AgroShop TG - Semences de Qualité au Togo',
  description: 'Découvrez notre sélection de semences de qualité supérieure pour vos cultures. Guides, conseils et produits pour une agriculture performante au Togo.',
  keywords: 'semences, agriculture, Togo, graines, légumes, fruits, céréales, agroshop',
  authors: [{ name: 'AgroShop TG' }],
  openGraph: {
    title: 'AgroShop TG - Semences de Qualité',
    description: 'Votre partenaire pour des semences de qualité supérieure au Togo',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="font-sans">
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
