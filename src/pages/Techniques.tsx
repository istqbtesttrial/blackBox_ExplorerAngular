
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';
import { ChevronRight, Target, BarChart3, Grid3X3, GitBranch } from 'lucide-react';

const Techniques = () => {
  const techniques = [
    {
      id: 'partitions-equivalence',
      title: 'Partitions d\'équivalence',
      icon: Grid3X3,
      description: 'Divisez intelligemment les données en groupes homogènes pour optimiser vos tests.',
      details: 'Apprenez à identifier et créer des partitions logiques qui permettent de réduire le nombre de tests tout en maintenant une couverture optimale.',
      color: 'calm-blue',
      link: '/partitions-equivalence'
    },
    {
      id: 'valeurs-limites',
      title: 'Analyse des valeurs limites',
      icon: Target,
      description: 'Concentrez-vous sur les frontières critiques où les erreurs sont les plus fréquentes.',
      details: 'Maîtrisez les techniques à 2 et 3 valeurs pour détecter les bugs aux limites des intervalles de données.',
      color: 'calm-green',
      link: '/analyse-valeurs-limites'
    },
    {
      id: 'tables-decisions',
      title: 'Tables de décisions',
      icon: BarChart3,
      description: 'Structurez vos tests avec des tables logiques pour couvrir tous les scénarios.',
      details: 'Créez des matrices de test exhaustives pour valider toutes les combinaisons de conditions et d\'actions.',
      color: 'calm-blue',
      link: '/tables-decisions'
    },
    {
      id: 'transition-etat',
      title: 'Tests de transition d\'état',
      icon: GitBranch,
      description: 'Validez les changements d\'état et les transitions dans vos systèmes.',
      details: 'Apprenez à modéliser et tester les machines à états finis pour des applications robustes.',
      color: 'calm-green',
      link: '/transition-etat'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-gray-50 via-calm-blue-50 to-calm-green-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-scale">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Techniques de Test
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Maîtrisez les méthodes essentielles du test boîte noire avec nos guides détaillés et exercices pratiques.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-grow">
        {/* Introduction */}
        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-12 border border-calm-gray-200">
            <h2 className="text-3xl font-bold mb-6 text-calm-gray-800">
              Pourquoi ces techniques ?
            </h2>
            <div className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">
                Le test boîte noire nécessite des approches méthodiques pour être efficace. 
                Chaque technique présentée ici répond à des besoins spécifiques et peut être 
                combinée avec les autres pour une stratégie de test complète.
              </p>
              <p>
                Nos guides incluent la théorie, des exemples concrets et des exercices 
                interactifs pour vous permettre de pratiquer immédiatement.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {techniques.map((technique, index) => {
            const IconComponent = technique.icon;
            
            return (
              <AnimatedSection key={technique.id} delay={300 + index * 100}>
                <Link
                  to={technique.link}
                  className="group block bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-calm-gray-200"
                >
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-${technique.color}-100 rounded-xl flex items-center justify-center group-hover:bg-${technique.color}-200 transition-colors duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${technique.color}-600`} />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className={`text-2xl font-bold mb-3 text-${technique.color}-700 group-hover:text-${technique.color}-800 transition-colors`}>
                        {technique.title}
                      </h3>
                      <p className="text-calm-gray-600 mb-4 group-hover:text-calm-gray-700 transition-colors">
                        {technique.description}
                      </p>
                      <p className="text-sm text-calm-gray-500 mb-6 group-hover:text-calm-gray-600 transition-colors">
                        {technique.details}
                      </p>
                      
                      <div className={`inline-flex items-center space-x-2 text-${technique.color}-600 group-hover:text-${technique.color}-700 font-medium`}>
                        <span>Explorer cette technique</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={800}>
          <div className="mt-16 text-center bg-gradient-to-br from-calm-blue-50 to-calm-green-50 rounded-2xl p-12 border border-calm-blue-200">
            <h2 className="text-3xl font-bold mb-4 text-calm-gray-800">
              Commencez votre apprentissage
            </h2>
            <p className="text-xl text-calm-gray-600 mb-8 max-w-2xl mx-auto">
              Chaque technique peut être apprise indépendamment. Commencez par celle qui vous intéresse le plus !
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {techniques.map((technique) => (
                <Link
                  key={technique.id}
                  to={technique.link}
                  className={`bg-${technique.color}-500 hover:bg-${technique.color}-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  {technique.title}
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  );
};

export default Techniques;
