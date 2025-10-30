import BlogCard from '@/components/BlogCard'
import ProductCard from '@/components/ProductCard'
import blogsData from '@/data/blogs.json'
import productsData from '@/data/products.json'
import { BlogPost, Product } from '@/types'
import { FaSeedling, FaBook, FaLightbulb, FaChartLine } from 'react-icons/fa'
import Link from 'next/link'

export const metadata = {
  title: 'Guide des Semences - Tout Savoir sur les Semences | AgroShop TG',
  description: 'Guide complet sur les semences: choix, plantation, entretien. Découvrez nos meilleurs produits et conseils d\'experts pour réussir vos cultures.',
}

export default function SemencesPage() {
  const blogs = blogsData as BlogPost[]
  const products = productsData as Product[]

  // Filtrer les articles liés aux semences
  const semencesBlogs = blogs.filter((blog) =>
    blog.tags.includes('semences') || blog.tags.includes('plantation')
  )

  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaSeedling className="text-7xl mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tout Savoir sur les Semences
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Guide complet pour choisir, planter et entretenir vos semences
            </p>
          </div>
        </div>
      </section>

      {/* Points clés */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Guides Pratiques</h3>
              <p className="text-gray-600">
                Instructions détaillées pour chaque type de semence
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conseils d'Experts</h3>
              <p className="text-gray-600">
                Astuces et recommandations d'agronomes professionnels
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-primary-100 text-primary-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Optimisation</h3>
              <p className="text-gray-600">
                Techniques pour maximiser vos rendements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guide principal */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Comment Choisir les Bonnes Semences ?
            </h2>

            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-primary-600 mt-8 mb-4">
                1. Connaître Votre Sol
              </h3>
              <p className="text-gray-700 mb-4">
                Avant de choisir vos semences, il est essentiel d'analyser votre sol. Chaque type de sol
                (argileux, sableux, limoneux) convient mieux à certaines cultures.
              </p>

              <h3 className="text-2xl font-bold text-primary-600 mt-8 mb-4">
                2. Considérer le Climat
              </h3>
              <p className="text-gray-700 mb-4">
                Le climat togolais varie selon les régions. Choisissez des semences adaptées à votre zone
                climatique et à la saison de plantation.
              </p>

              <h3 className="text-2xl font-bold text-primary-600 mt-8 mb-4">
                3. Définir Vos Objectifs
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Production commerciale ou consommation personnelle ?</li>
                <li>Culture en plein champ ou en jardin ?</li>
                <li>Préférence pour les variétés locales ou hybrides ?</li>
                <li>Besoin de résistance aux maladies spécifiques ?</li>
              </ul>

              <h3 className="text-2xl font-bold text-primary-600 mt-8 mb-4">
                4. Vérifier la Qualité
              </h3>
              <p className="text-gray-700 mb-4">
                Choisissez toujours des semences certifiées avec:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Taux de germination élevé (minimum 85%)</li>
                <li>Date de péremption valide</li>
                <li>Emballage intact et hermétique</li>
                <li>Certification officielle</li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-lg border-l-4 border-primary-600">
              <p className="text-gray-700 font-medium">
                💡 <strong>Conseil Pro:</strong> Commencez toujours par des petites quantités pour tester
                les semences dans vos conditions spécifiques avant d'investir dans de grandes quantités.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Produits recommandés */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Nos Semences Recommandées
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Sélection de semences de qualité supérieure adaptées au Togo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/produits"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition"
            >
              Voir Toutes les Semences
            </Link>
          </div>
        </div>
      </section>

      {/* Articles connexes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Articles sur les Semences
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Guides détaillés et conseils d'experts
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {semencesBlogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))}
          </div>
          {semencesBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun article disponible pour le moment</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Besoin de Conseils Personnalisés ?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Nos agronomes sont là pour vous aider à choisir les meilleures semences pour votre projet
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition shadow-lg"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
