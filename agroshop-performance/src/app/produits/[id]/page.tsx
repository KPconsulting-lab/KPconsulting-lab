import { notFound } from 'next/navigation'
import Link from 'next/link'
import productsData from '@/data/products.json'
import { Product } from '@/types'
import { FaArrowLeft, FaShoppingCart, FaLeaf, FaClock, FaSeedling, FaCheckCircle } from 'react-icons/fa'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: {
    id: string
  }
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = productsData as Product[]
  return products.map((product) => ({
    id: product.id,
  }))
}

// Generate metadata for each product
export async function generateMetadata({ params }: PageProps) {
  const products = productsData as Product[]
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return {
      title: 'Produit non trouvé | AgroShop TG',
    }
  }

  return {
    title: `${product.name} | AgroShop TG`,
    description: product.description,
    keywords: `${product.name}, ${product.category}, semences, ${product.plantingSeason.join(', ')}`,
  }
}

export default function ProductDetailPage({ params }: PageProps) {
  const products = productsData as Product[]
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(product.price)

  // Produits similaires
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/produits"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <FaArrowLeft />
            <span>Retour aux produits</span>
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Image */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                  <FaLeaf className="text-primary-400 text-9xl" />
                </div>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.stock > 0 ? `✓ En Stock (${product.stock} unités)` : '✗ Rupture de stock'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="border-t border-b border-gray-200 py-6 mb-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaClock className="text-primary-500 text-xl" />
                    <div>
                      <span className="text-sm text-gray-500">Temps de récolte</span>
                      <p className="font-medium text-gray-800">{product.harvestTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaSeedling className="text-primary-500 text-xl" />
                    <div>
                      <span className="text-sm text-gray-500">Saisons de plantation</span>
                      <p className="font-medium text-gray-800">
                        {product.plantingSeason.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                    <FaCheckCircle className="text-primary-500" />
                    <span>Caractéristiques</span>
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-sm text-gray-500 block mb-1">Prix</span>
                    <span className="text-4xl font-bold text-primary-600">
                      {formattedPrice}
                    </span>
                  </div>
                </div>

                <button
                  className="w-full bg-primary-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition flex items-center justify-center space-x-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart className="text-2xl" />
                  <span>Ajouter au Panier</span>
                </button>

                {product.stock === 0 && (
                  <p className="text-center text-red-600 mt-4 font-medium">
                    Ce produit sera bientôt disponible
                  </p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Guide de Culture
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-primary-600 mb-3">🌱 Plantation</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Préparez un sol bien drainé et enrichi</li>
                    <li>• Respectez les distances de plantation</li>
                    <li>• Arrosez délicatement après semis</li>
                    <li>• Choisissez un emplacement ensoleillé</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-primary-600 mb-3">💧 Entretien</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Arrosage régulier mais modéré</li>
                    <li>• Désherbage fréquent</li>
                    <li>• Fertilisation selon les besoins</li>
                    <li>• Surveillance des maladies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-primary-600 mb-3">🌾 Récolte</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Respectez le temps de maturation</li>
                    <li>• Récoltez tôt le matin</li>
                    <li>• Utilisez des outils propres</li>
                    <li>• Stockez correctement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-primary-600 mb-3">📝 Conseils</h3>
                  <ul className="text-gray-700 space-y-2 text-sm">
                    <li>• Rotation des cultures recommandée</li>
                    <li>• Associez avec des plantes compagnes</li>
                    <li>• Paillage pour conserver l'humidité</li>
                    <li>• Consultez nos guides détaillés</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Produits Similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin de Conseils ?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Nos experts sont là pour vous aider à choisir les bonnes semences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blogs"
                className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition"
              >
                Lire nos Guides
              </Link>
              <Link
                href="/contact"
                className="bg-primary-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-900 transition"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
