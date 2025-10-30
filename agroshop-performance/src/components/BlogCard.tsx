import Link from 'next/link'
import { BlogPost } from '@/types'
import { FaClock, FaUser, FaArrowRight, FaNewspaper } from 'react-icons/fa'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <Link href={`/blogs/${post.slug}`}>
        <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <FaNewspaper className="text-white/20 text-6xl" />
          </div>
          <div className="absolute top-2 left-2 bg-white text-primary-700 text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </div>
        </div>
      </Link>

      {/* Contenu */}
      <div className="p-5">
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-1">
            <FaUser className="text-primary-500" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaClock className="text-primary-500" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Date et lien */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{formattedDate}</span>
          <Link
            href={`/blogs/${post.slug}`}
            className="text-primary-600 font-medium text-sm flex items-center space-x-2 hover:text-primary-700 transition group-hover:translate-x-1 duration-300"
          >
            <span>Lire plus</span>
            <FaArrowRight />
          </Link>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
