import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa'

export const metadata = {
  title: 'Contact - Contactez-nous | AgroShop TG',
  description: 'Contactez AgroShop TG pour toutes vos questions sur nos semences et produits agricoles. Nous sommes là pour vous aider.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-primary-100">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Envoyez-nous un Message
                </h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+228 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <select
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option>Information produit</option>
                      <option>Commande</option>
                      <option>Conseil technique</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Votre message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition"
                  >
                    Envoyer le Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Informations de Contact
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                        <FaMapMarkerAlt className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Adresse</h3>
                        <p className="text-gray-600">
                          123 Avenue de la République<br />
                          Lomé, Togo
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                        <FaPhone className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Téléphone</h3>
                        <p className="text-gray-600">+228 XX XX XX XX</p>
                        <p className="text-gray-600">+228 YY YY YY YY</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                        <FaWhatsapp className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">WhatsApp</h3>
                        <p className="text-gray-600">+228 XX XX XX XX</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                        <FaEnvelope className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                        <p className="text-gray-600">contact@agroshoptg.com</p>
                        <p className="text-gray-600">info@agroshoptg.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
                        <FaClock className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">Horaires</h3>
                        <p className="text-gray-600">
                          Lundi - Vendredi: 8h00 - 18h00<br />
                          Samedi: 8h00 - 14h00<br />
                          Dimanche: Fermé
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-primary-600 text-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold mb-4">Besoin d'Aide Rapidement ?</h3>
                  <p className="text-primary-100 mb-6">
                    Consultez nos guides et FAQ pour des réponses immédiates
                  </p>
                  <div className="space-y-3">
                    <a
                      href="/blogs"
                      className="block bg-white text-primary-600 px-6 py-3 rounded-lg font-medium text-center hover:bg-primary-50 transition"
                    >
                      Voir les Guides
                    </a>
                    <a
                      href="/blogs/semences"
                      className="block bg-primary-700 text-white px-6 py-3 rounded-lg font-medium text-center hover:bg-primary-800 transition"
                    >
                      Guide des Semences
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
