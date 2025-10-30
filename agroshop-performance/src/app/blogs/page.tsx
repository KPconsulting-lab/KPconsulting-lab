import BlogCard from '@/components/BlogCard'
import SearchBar from '@/components/SearchBar'
import blogsData from '@/data/blogs.json'
import { BlogPost } from '@/types'
import { FaNewspaper } from 'react-icons/fa'

export const metadata = {
  title: 'Blog - Conseils & Guides Agricoles | AgroShop TG',
  description: 'Découvrez nos articles, guides et conseils pour réussir vos cultures. Techniques de plantation, calendriers, et astuces d\'experts.',
}

export default function BlogsPage() {
  const blogs = blogsData as BlogPost[]

  // Grouper par catégories
  const categories = Array.from(new Set(blogs.map((blog) => blog.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <FaNewspaper className="text-6xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & Conseils Agricoles
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Guides pratiques, astuces et conseils d'experts pour réussir vos cultures
            </p>
            <SearchBar placeholder="Rechercher un article..." />
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-6 py-2 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition">
              Tous
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} post={blog} />
            ))}
          </div>

          {/* Message si aucun article */}
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun article trouvé</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Restez Informé
            </h2>
            <p className="text-primary-100 mb-6">
              Recevez nos derniers articles et conseils directement dans votre boîte mail
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
              <button
                type="submit"
                className="bg-white text-primary-600 px-8 py-3 rounded-full font-bold hover:bg-primary-50 transition"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
