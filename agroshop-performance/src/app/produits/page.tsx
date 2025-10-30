'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import productsData from '@/data/products.json'
import { Product } from '@/types'
import { FaFilter, FaSeedling } from 'react-icons/fa'

export default function ProduitsPage() {
  const products = productsData as Product[]
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)))
    return ['all', ...cats]
  }, [products])

  // Filtrer les produits
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      all: 'Tous les produits',
      legumes: 'Légumes',
      fruits: 'Fruits',
      cereales: 'Céréales',
    }
    return labels[cat] || cat
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FaSeedling className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Semences de Qualité
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Découvrez notre catalogue complet de semences certifiées
            </p>
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <FaFilter />
              <span className="font-medium">Catégories:</span>
            </div>
            <div className="text-sm text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-500 mb-6">
                Essayez de modifier vos critères de recherche
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium hover:bg-primary-700 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Pourquoi Choisir Nos Semences ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-3">
                  ✓ Qualité Certifiée
                </h3>
                <p className="text-gray-700">
                  Toutes nos semences sont testées et certifiées pour garantir un taux de germination optimal.
                </p>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-3">
                  ✓ Adaptées au Climat
                </h3>
                <p className="text-gray-700">
                  Sélection spécifique pour les conditions climatiques togolaises et ouest-africaines.
                </p>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-3">
                  ✓ Support Technique
                </h3>
                <p className="text-gray-700">
                  Nos agronomes sont disponibles pour vous conseiller dans vos choix et techniques culturales.
                </p>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary-700 mb-3">
                  ✓ Prix Compétitifs
                </h3>
                <p className="text-gray-700">
                  Meilleur rapport qualité-prix du marché avec possibilité d'achats en gros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
