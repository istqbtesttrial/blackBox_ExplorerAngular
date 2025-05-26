
import { useEffect, useState } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-r from-calm-gray-50 to-calm-blue-50 border-t border-calm-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-calm-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-calm-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-calm-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-calm-gray-600 text-sm">
            © {currentYear} - Belhaj Ouajdi | Tous droits réservés
          </p>
          <p className="text-calm-gray-500 text-xs mt-2">
            Créé avec ❤️ pour l'apprentissage du test boîte noire
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
