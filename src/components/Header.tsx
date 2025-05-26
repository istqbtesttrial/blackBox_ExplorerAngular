import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, ClipboardList, Grid3x3, Ruler, ArrowRightLeft } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil', icon: Home },
    { path: '/techniques', label: 'Techniques', icon: ClipboardList },
    { path: '/partitions-equivalence', label: 'Partitions d\'équivalence', icon: Grid3x3 },
    { path: '/analyse-valeurs-limites', label: 'Valeurs limites', icon: Ruler },
    { path: '/tables-decisions', label: 'Tables de décisions', icon: ClipboardList },
    { path: '/transition-etat', label: 'Transition d\'état', icon: ArrowRightLeft },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-2xl font-bold text-calm-gray-800 hover:text-calm-blue-600 transition-all duration-300 animate-fade-in-scale"
          >
            <Search className="w-8 h-8 animate-pulse-soft" />
            <span className="bg-gradient-to-r from-calm-blue-600 to-calm-green-600 bg-clip-text text-transparent">
              BlackBox Explorer
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-calm-blue-100 text-calm-blue-700 shadow-md' 
                      : 'text-calm-gray-600 hover:bg-calm-blue-50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-calm-blue-50 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
