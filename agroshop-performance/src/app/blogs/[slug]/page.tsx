import { notFound } from 'next/navigation'
import Link from 'next/link'
import blogsData from '@/data/blogs.json'
import { BlogPost } from '@/types'
import { FaArrowLeft, FaClock, FaUser, FaCalendar, FaTag } from 'react-icons/fa'
import BlogCard from '@/components/BlogCard'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = blogsData as BlogPost[]
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: PageProps) {
  const blogs = blogsData as BlogPost[]
  const post = blogs.find((b) => b.slug === params.slug)

  if (!post) {
    return {
      title: 'Article non trouvé | AgroShop TG',
    }
  }

  return {
    title: `${post.title} | AgroShop TG Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const blogs = blogsData as BlogPost[]
  const post = blogs.find((b) => b.slug === params.slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Articles connexes (autres articles de la même catégorie)
  const relatedPosts = blogs
    .filter((b) => b.category === post.category && b.id !== post.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            <FaArrowLeft />
            <span>Retour aux articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <FaUser className="text-primary-500" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendar className="text-primary-500" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-primary-500" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 h-96 flex items-center justify-center">
              <div className="text-white text-8xl opacity-30">
                📰
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <FaTag className="text-primary-500" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share section */}
            <div className="bg-primary-50 rounded-xl p-6 mb-12">
              <p className="text-center text-gray-700 font-medium">
                Cet article vous a été utile ? Partagez-le avec d'autres agriculteurs ! 🌱
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Articles Connexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
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
              Prêt à Commencer ?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Découvrez notre sélection de semences de qualité
            </p>
            <Link
              href="/produits"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-50 transition shadow-lg"
            >
              Voir nos Produits
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
