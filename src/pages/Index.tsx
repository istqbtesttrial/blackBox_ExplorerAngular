
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

const Index = () => {
  const scrollToContent = () => {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-gray-50 via-calm-blue-50 to-calm-green-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient flex-grow flex items-center justify-center text-white pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-in-scale">
            <div className="inline-flex items-center space-x-2 bg-white/20 glass-effect rounded-full px-6 py-2 mb-8">
              <Sparkles className="w-5 h-5 animate-pulse-soft" />
              <span className="text-sm font-medium">Techniques de test avancées</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-calm-gray-100 bg-clip-text text-transparent">
              Bienvenue sur<br />
              <span className="animate-float inline-block">BlackBox Explorer</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed">
              Découvrez les techniques essentielles du{' '}
              <span className="font-semibold bg-white/20 px-3 py-1 rounded-lg">test boîte noire</span>
              {' '}et assurez la qualité de vos projets avec des méthodes éprouvées.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={scrollToContent}
                className="group bg-white text-calm-blue-600 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span className="font-semibold">Découvrir les techniques</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link
                to="/techniques"
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-calm-blue-600 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
              >
                <span className="font-semibold">Voir toutes les techniques</span>
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Main Content */}
      <main id="intro" className="container mx-auto px-4 py-16 flex flex-col gap-12">
        {/* Introduction */}
        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-calm-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-calm-gray-800">
              Qu'est-ce que le test boîte noire ?
            </h2>
            <div className="prose prose-lg max-w-none text-calm-gray-700 leading-relaxed">
              <p className="mb-4">
                Le <strong className="text-calm-blue-600">test boîte noire</strong> est une approche consistant à vérifier les{' '}
                <em className="text-calm-green-600">entrées</em> et les <em className="text-calm-green-600">sorties</em> d'un système 
                sans connaître sa logique interne. Vous n'avez pas besoin d'accéder au code source : seules les spécifications 
                fonctionnelles et les résultats observables priment.
              </p>
              <p>
                Dans ce projet, vous découvrirez plusieurs techniques de test boîte noire, comme les{' '}
                <em className="text-calm-blue-600">partitions d'équivalence</em>, l'<em className="text-calm-blue-600">analyse des valeurs limites</em>, 
                les <em className="text-calm-blue-600">tables de décisions</em> et les <em className="text-calm-blue-600">tests de transition d'état</em>. 
                Chaque technique est expliquée avec des exemples simples et des exercices interactifs.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Techniques Overview */}
        <AnimatedSection delay={400}>
          <div className="bg-gradient-to-br from-calm-blue-50 to-calm-green-50 rounded-2xl p-8 shadow-lg border border-calm-blue-200">
            <h2 className="text-3xl font-bold mb-6 text-calm-gray-800">
              Aperçu rapide des techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Partitions d'équivalence",
                  description: "Découper les données en ensembles homogènes pour optimiser les tests.",
                  link: "/partitions-equivalence",
                  color: "calm-blue"
                },
                {
                  title: "Analyse des valeurs limites",
                  description: "Se concentrer sur les frontières entre différentes partitions.",
                  link: "/analyse-valeurs-limites",
                  color: "calm-green"
                },
                {
                  title: "Tables de décisions",
                  description: "Vérifier toutes les combinaisons de règles pour couvrir tous les scénarios.",
                  link: "/tables-decisions",
                  color: "calm-blue"
                },
                {
                  title: "Transition d'état",
                  description: "Tester chaque état d'un système et les passages entre ces états.",
                  link: "/transition-etat",
                  color: "calm-green"
                }
              ].map((technique, index) => (
                <Link
                  key={technique.title}
                  to={technique.link}
                  className={`group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-l-4 border-${technique.color}-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className={`text-xl font-semibold mb-3 text-${technique.color}-700 group-hover:text-${technique.color}-800`}>
                    {technique.title}
                  </h3>
                  <p className="text-calm-gray-600 group-hover:text-calm-gray-700 transition-colors">
                    {technique.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-calm-blue-600 group-hover:text-calm-blue-700">
                    <span>En savoir plus</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={600}>
          <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-calm-gray-200">
            <h2 className="text-3xl font-bold mb-4 text-calm-gray-800">
              Prêt à commencer votre apprentissage ?
            </h2>
            <p className="text-xl text-calm-gray-600 mb-8 max-w-2xl mx-auto">
              Explorez chaque technique en détail avec des exemples pratiques et des exercices interactifs.
            </p>
            <Link
              to="/techniques"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-calm-blue-500 to-calm-green-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="font-semibold">Commencer l'exploration</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
