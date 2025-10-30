import Link from 'next/link'
import { FaSeedling, FaLeaf, FaChartLine, FaTruck, FaShieldAlt, FaUsers } from 'react-icons/fa'
import ProductCard from '@/components/ProductCard'
import BlogCard from '@/components/BlogCard'
import SearchBar from '@/components/SearchBar'
import productsData from '@/data/products.json'
import blogsData from '@/data/blogs.json'
import { Product, BlogPost } from '@/types'

export default function Home() {
  const products = productsData as Product[]
  const blogs = blogsData as BlogPost[]
  const featuredProducts = products.slice(0, 4)
  const recentBlogs = blogs.slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Semences de Qualité pour Votre Succès Agricole
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Découvrez notre sélection de semences certifiées et performantes adaptées au climat togolais
            </p>
            <div className="mb-8">
              <SearchBar />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produits"
                className="bg-white text-primary-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition shadow-lg"
              >
                Voir nos Produits
              </Link>
              <Link
                href="/blogs/semences"
                className="bg-primary-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-900 transition shadow-lg"
              >
                Guides & Conseils
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualité Certifiée</h3>
              <p className="text-gray-600">Semences testées et certifiées pour garantir les meilleurs rendements</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison dans tout le Togo en 24-48h</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Support Expert</h3>
              <p className="text-gray-600">Conseils personnalisés par nos agronomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produits Vedettes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Semences Populaires
            </h2>
            <p className="text-gray-600 text-lg">
              Découvrez nos semences les plus demandées par les agriculteurs togolais
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/produits"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition"
            >
              Voir Tous les Produits
            </Link>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Nos Catégories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/produits?cat=legumes" className="group">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-8 text-white hover:shadow-xl transition">
                <FaLeaf className="text-5xl mb-4 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-bold mb-2">Légumes</h3>
                <p className="text-green-100">Tomates, piments, gombo et plus</p>
              </div>
            </Link>
            <Link href="/produits?cat=fruits" className="group">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg p-8 text-white hover:shadow-xl transition">
                <FaSeedling className="text-5xl mb-4 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-bold mb-2">Fruits</h3>
                <p className="text-orange-100">Pastèques, melons et variétés tropicales</p>
              </div>
            </Link>
            <Link href="/produits?cat=cereales" className="group">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-8 text-white hover:shadow-xl transition">
                <FaChartLine className="text-5xl mb-4 group-hover:scale-110 transition" />
                <h3 className="text-2xl font-bold mb-2">Céréales</h3>
                <p className="text-yellow-100">Maïs, riz et cultures vivrières</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Derniers Articles du Blog
            </h2>
            <p className="text-gray-600 text-lg">
              Conseils, guides et astuces pour réussir vos cultures
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/blogs"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition"
            >
              Voir Tous les Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
