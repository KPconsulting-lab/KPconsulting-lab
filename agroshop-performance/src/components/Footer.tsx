import Link from 'next/link'
import { FaSeedling, FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center space-x-2 text-xl font-bold text-white mb-4">
              <FaSeedling className="text-primary-500 text-2xl" />
              <span>AgroShop TG</span>
            </div>
            <p className="text-sm leading-relaxed">
              Votre partenaire de confiance pour des semences de qualité supérieure.
              Nous soutenons l'agriculture togolaise depuis plus de 10 ans.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produits" className="hover:text-primary-400 transition">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-primary-400 transition">
                  Blog & Conseils
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="text-white font-bold mb-4">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produits?cat=legumes" className="hover:text-primary-400 transition">
                  Légumes
                </Link>
              </li>
              <li>
                <Link href="/produits?cat=fruits" className="hover:text-primary-400 transition">
                  Fruits
                </Link>
              </li>
              <li>
                <Link href="/produits?cat=cereales" className="hover:text-primary-400 transition">
                  Céréales
                </Link>
              </li>
              <li>
                <Link href="/blogs/semences" className="hover:text-primary-400 transition">
                  Guide Semences
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contactez-nous</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <FaMapMarkerAlt className="text-primary-500" />
                <span>Lomé, Togo</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone className="text-primary-500" />
                <span>+228 XX XX XX XX</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-primary-500" />
                <span>contact@agroshoptg.com</span>
              </li>
            </ul>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-2xl hover:text-primary-400 transition" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-primary-400 transition" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-primary-400 transition" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AgroShop TG. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
