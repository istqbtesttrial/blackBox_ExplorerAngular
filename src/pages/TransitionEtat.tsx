
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

const TransitionEtat = () => {
  const [currentState, setCurrentState] = useState('Locked');
  const [transitionLog, setTransitionLog] = useState<string[]>([]);

  const logTransition = (event: string, oldState: string, newState: string) => {
    const logEntry = `[Event: ${event}] ${oldState} -> ${newState}`;
    setTransitionLog(prev => [...prev, logEntry]);
  };

  const handleCoin = () => {
    const oldState = currentState;
    // Locked + coin => Unlocked, Unlocked + coin => Unlocked
    const newState = currentState === 'Locked' ? 'Unlocked' : 'Unlocked';
    setCurrentState(newState);
    logTransition('coin', oldState, newState);
  };

  const handlePush = () => {
    const oldState = currentState;
    // Locked + push => Locked, Unlocked + push => Locked
    setCurrentState('Locked');
    logTransition('push', oldState, 'Locked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-gray-50 via-calm-blue-50 to-calm-green-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-scale">
            <ArrowRightLeft className="w-16 h-16 mx-auto mb-6 animate-pulse-soft" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Test de transition d'état
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Vérifier chaque état possible et ses transitions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-grow space-y-12">
        
        <AnimatedSection delay={200}>
          <Card className="border-calm-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Pourquoi tester les transitions d'état ?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">
                Le test de transition d'état modélise un logiciel ou un système sous forme
                d'<strong className="text-calm-blue-600">automate à états finis</strong>. Chaque événement peut faire passer
                le système d'un <em>état</em> à un autre, et certaines transitions peuvent être
                invalides ou interdites.
              </p>
              <p className="mb-4">Pour mesurer la <strong className="text-calm-blue-600">couverture</strong> :</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Couverture des états</strong> : Chaque état doit être visité au moins une fois.</li>
                <li><strong>Couverture des transitions valides</strong> : Chaque transition autorisée doit être utilisée au moins une fois.</li>
                <li><strong>Couverture de toutes les transitions</strong> (valides + non valides) : On tente également les transitions interdites pour vérifier la robustesse.</li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <Card className="border-calm-green-200 bg-calm-green-50">
            <CardHeader>
              <CardTitle className="text-2xl text-calm-gray-800">Exercice 1 : Tourniquet (Locked / Unlocked)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* State Diagram using ASCII art/text representation */}
              <div className="bg-white p-6 rounded-lg mb-4 font-mono text-sm border">
                <div className="text-center text-calm-gray-700">
                  <div className="mb-4">
                    <strong>Diagramme d'état : Tourniquet</strong>
                  </div>
                  <div className="space-y-2">
                    <div>[Locked] --coin--{'>'}  [Unlocked]</div>
                    <div>[Locked] --push--{'>'}  [Locked]</div>
                    <div>[Unlocked] --coin--{'>'}  [Unlocked]</div>
                    <div>[Unlocked] --push--{'>'}  [Locked]</div>
                  </div>
                </div>
              </div>

              <p className="text-calm-gray-700 mb-4">
                Le tourniquet a deux états (<code>Locked</code>, <code>Unlocked</code>).
                Les événements (<code>coin</code>, <code>push</code>) changent ou non l'état.
                Ci-dessous, un petit simulateur pour enchaîner les événements.
              </p>

              {/* Interactive Simulator */}
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="mb-4 font-semibold text-calm-gray-700">
                  État actuel :
                  <span className={`ml-2 px-3 py-1 rounded ${
                    currentState === 'Locked' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {currentState}
                  </span>
                </div>
                
                <div className="flex gap-4 mb-4">
                  <Button 
                    onClick={handleCoin}
                    className="bg-calm-green-500 hover:bg-calm-green-600"
                  >
                    coin
                  </Button>
                  <Button 
                    onClick={handlePush}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    push
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-calm-gray-800">Historique :</h4>
                  <div className="max-h-40 overflow-y-auto bg-calm-gray-50 p-3 rounded">
                    {transitionLog.length === 0 ? (
                      <p className="text-calm-gray-500 italic">Aucune transition pour l'instant</p>
                    ) : (
                      <ul className="space-y-1">
                        {transitionLog.map((log, index) => (
                          <li key={index} className="text-calm-gray-700 text-sm">
                            • {log}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <Card className="border-calm-blue-200 bg-calm-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-calm-gray-800">Exercice 2 : Distributeur de Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              {/* State Diagram using ASCII art/text representation */}
              <div className="bg-white p-6 rounded-lg mb-4 font-mono text-sm border">
                <div className="text-center text-calm-gray-700">
                  <div className="mb-4">
                    <strong>Diagramme d'état : Distributeur</strong>
                  </div>
                  <div className="space-y-2">
                    <div>[Inactif] --start--{'>'}  [Selection]</div>
                    <div>[Selection] --cancel--{'>'} [Inactif]</div>
                    <div>[Selection] --ok--{'>'}  [Payer]</div>
                    <div>[Payer] --timeout--{'>'}  [Inactif]</div>
                    <div>[Payer] --pay--{'>'}  [Distribution]</div>
                    <div>[Distribution] --done--{'>'} [Inactif]</div>
                  </div>
                </div>
              </div>

              <p className="text-calm-gray-700 mb-4">
                Dans cet automate, un <strong>distributeur de tickets</strong> possède les états :
                <code>Inactif</code>, <code>Selection</code>, <code>Payer</code>,
                <code>Distribution</code>. Les événements (<code>start</code>, <code>cancel</code>,
                <code>ok</code>, <code>pay</code>, <code>timeout</code>, <code>done</code>)
                dictent les transitions.
              </p>

              <div className="bg-white rounded-lg p-6 shadow">
                <h4 className="text-lg font-semibold mb-3 text-calm-gray-800">Comment calculer la couverture ?</h4>
                <ul className="list-disc list-inside text-calm-gray-700 space-y-2">
                  <li><strong>État Inactif :</strong> doit être visité, par exemple au début et via <code>cancel</code>, <code>timeout</code>, etc.</li>
                  <li><strong>État Selection :</strong> atteint via <code>start</code>, puis transition possible vers <code>Inactif</code> ou <code>Payer</code>.</li>
                  <li><strong>État Payer :</strong> transition <code>pay</code> ou <code>timeout</code>.</li>
                  <li><strong>État Distribution :</strong> transition <code>done</code> pour revenir à <code>Inactif</code>.</li>
                </ul>
                <p className="text-calm-gray-700 mt-4">
                  Pour couvrir <em>toutes les transitions valides</em>, il faut au moins déclencher
                  chaque événement sur l'état correspondant (ex: <code>start</code> en <code>Inactif</code>,
                  <code>ok</code> en <code>Selection</code>, etc.). Pour tenter les transitions
                  <em>invalides</em>, on essaierait par exemple <code>cancel</code> alors qu'on est
                  en <code>Payer</code>, etc., pour vérifier la bonne gestion d'erreur.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={800}>
          <Card className="border-calm-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-calm-gray-800">Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-calm-gray-700 mb-4">
                Les <strong className="text-calm-blue-600">tests de transition d'état</strong> permettent de valider non seulement
                les entrées/sorties, mais aussi l'<em>enchaînement</em> correct de ces entrées sur
                plusieurs étapes. Pour un haut niveau de confiance, on vérifie :
              </p>
              <ul className="list-disc list-inside text-calm-gray-700 space-y-1">
                <li>Que chaque <em>état</em> peut être atteint et fonctionne correctement.</li>
                <li>Que chaque <em>transition</em> autorisée est testée.</li>
                <li>Que les <em>transitions non autorisées</em> renvoient des erreurs (ou sont ignorées).</li>
              </ul>
            </CardContent>
          </Card>
        </AnimatedSection>

      </main>

      <Footer />
    </div>
  );
};

export default TransitionEtat;
