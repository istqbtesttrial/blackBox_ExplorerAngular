
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Calculator, AlertTriangle } from 'lucide-react';

const AnalyseValeursLimites = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10);
  const [boundaryB, setBoundaryB] = useState(10);
  const [boundaryResults, setBoundaryResults] = useState<string>('');
  const [bugResults, setBugResults] = useState<string>('');
  const [boundaryError, setBoundaryError] = useState<string>('');
  const [bugError, setBugError] = useState<string>('');

  const handleBoundaryCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setBoundaryError('');

    if (isNaN(minVal) || isNaN(maxVal)) {
      setBoundaryError('Veuillez saisir des nombres valides.');
      return;
    }

    if (minVal >= maxVal) {
      setBoundaryError('Le min doit être strictement inférieur au max.');
      return;
    }

    const resultHtml = `
      <div class="space-y-6">
        <p class="font-semibold text-calm-gray-800 text-lg">
          Intervalle choisi : ${minVal} ≤ x ≤ ${maxVal}
        </p>

        <div class="bg-calm-blue-50 p-6 rounded-lg border border-calm-blue-200">
          <h4 class="font-semibold mb-3 text-calm-blue-800 text-lg">Technique à 2 valeurs :</h4>
          <div class="space-y-2 text-calm-gray-700">
            <p><strong>Limite min :</strong> ${minVal} et ${minVal - 1}</p>
            <p><strong>Limite max :</strong> ${maxVal} et ${maxVal + 1}</p>
          </div>
        </div>

        <div class="bg-calm-green-50 p-6 rounded-lg border border-calm-green-200">
          <h4 class="font-semibold mb-3 text-calm-green-800 text-lg">Technique à 3 valeurs :</h4>
          <div class="space-y-2 text-calm-gray-700">
            <p><strong>Limite min :</strong> ${minVal - 1}, ${minVal} et ${minVal + 1}</p>
            <p><strong>Limite max :</strong> ${maxVal - 1}, ${maxVal} et ${maxVal + 1}</p>
          </div>
        </div>
      </div>
    `;

    setBoundaryResults(resultHtml);
  };

  const handleBugTest = (e: React.FormEvent) => {
    e.preventDefault();
    setBugError('');

    if (isNaN(boundaryB)) {
      setBugError('Veuillez saisir un nombre valide.');
      return;
    }

    const resultHtml = `
      <div class="space-y-6">
        <div class="bg-calm-gray-50 p-4 rounded-lg border border-calm-gray-200">
          <p class="font-semibold text-calm-gray-800 mb-2">Scénario :</p>
          <p class="text-calm-gray-700"><strong>Condition voulue :</strong> x ≤ ${boundaryB}</p>
          <p class="text-red-600"><strong>Code erroné :</strong> x = ${boundaryB}</p>
        </div>

        <div class="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h4 class="font-semibold mb-3 text-yellow-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
            <span>Technique à 2 valeurs</span>
          </h4>
          <p class="text-calm-gray-700 mb-3">
            Teste x = ${boundaryB} et x = ${boundaryB + 1}.
          </p>
          <p class="text-yellow-700">
            Ne teste pas x = ${boundaryB - 1}, donc le bug peut passer inaperçu.
          </p>
        </div>

        <div class="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 class="font-semibold mb-3 text-green-800 flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Technique à 3 valeurs</span>
          </h4>
          <p class="text-calm-gray-700 mb-3">
            Teste x = ${boundaryB - 1}, x = ${boundaryB} et x = ${boundaryB + 1}.
          </p>
          <p class="text-green-700">
            Détecte que x = ${boundaryB - 1} n'est pas accepté (ce qui est anormal), révélant ainsi le bug.
          </p>
        </div>

        <div class="bg-calm-blue-50 p-6 rounded-lg border border-calm-blue-200">
          <p class="font-semibold text-calm-blue-800 text-lg">
            Conclusion : La technique à 3 valeurs détecte mieux ce type d'erreur.
          </p>
        </div>
      </div>
    `;

    setBugResults(resultHtml);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-gray-50 via-calm-blue-50 to-calm-green-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-scale">
            <Target className="w-16 h-16 mx-auto mb-6 animate-pulse-soft" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Analyse des valeurs limites
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Tester les frontières pour mieux détecter les erreurs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-grow space-y-12">
        
        {/* Introduction */}
        <AnimatedSection delay={200}>
          <Card className="border-calm-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Pourquoi tester les limites ?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">
                L'<strong className="text-calm-blue-600">analyse des valeurs limites</strong> se concentre sur les points 
                frontaliers d'un intervalle (ou d'une partition) de valeurs. Les limites (ou frontières) sont des endroits 
                particulièrement sensibles où les développeurs ont tendance à faire des erreurs d'implémentation.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-4">
                <p className="text-yellow-800 font-medium">
                  Exemples d'erreurs courantes : un "≤" mal codé en "=", une borne omise, etc.
                </p>
              </div>
              <p>
                Cette technique vient en complément des partitions d'équivalence, car elle cible 
                spécifiquement les cas extrêmes ou de transition.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Techniques 2 vs 3 valeurs */}
        <AnimatedSection delay={300}>
          <Card className="border-calm-green-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Techniques à 2 valeurs et à 3 valeurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-calm-blue-50 p-6 rounded-lg border border-calm-blue-200">
                  <h4 className="font-semibold text-calm-blue-800 mb-3 text-lg">Technique à 2 valeurs</h4>
                  <p className="text-calm-gray-700 mb-3">
                    Pour chaque limite, on teste <em>la valeur limite</em> elle-même et <em>sa voisine la plus proche</em>.
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm text-calm-blue-700">Exemple : limite = 10</code><br />
                    <code className="text-sm text-calm-blue-700">Tests : 10, 11</code>
                  </div>
                </div>

                <div className="bg-calm-green-50 p-6 rounded-lg border border-calm-green-200">
                  <h4 className="font-semibold text-calm-green-800 mb-3 text-lg">Technique à 3 valeurs</h4>
                  <p className="text-calm-gray-700 mb-3">
                    Pour chaque limite, on teste <em>la valeur limite</em> et ses <em>deux voisines</em> (en dessous et au-dessus).
                  </p>
                  <div className="bg-white p-3 rounded border">
                    <code className="text-sm text-calm-green-700">Exemple : limite = 10</code><br />
                    <code className="text-sm text-calm-green-700">Tests : 9, 10, 11</code>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-calm-green-100 rounded-lg border border-calm-green-300">
                <p className="text-calm-green-800 font-medium">
                  💡 La technique à 3 valeurs est plus rigoureuse et détecte mieux certains types d'erreurs.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Exercices */}
        <AnimatedSection delay={400}>
          <Card className="border-calm-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Exercices pratiques</CardTitle>
              <CardDescription>
                Expérimentez avec les deux techniques pour mieux comprendre leurs différences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="generation" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="generation" className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4" />
                    <span>Génération de limites</span>
                  </TabsTrigger>
                  <TabsTrigger value="detection" className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Détection de bugs</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="generation" className="space-y-6">
                  <div className="bg-calm-blue-50 p-6 rounded-lg border border-calm-blue-200">
                    <h4 className="font-semibold text-calm-blue-800 mb-4">Exercice 1 : Génération de limites</h4>
                    <p className="text-calm-gray-700 mb-6">
                      Choisissez un intervalle [min, max]. L'outil générera les valeurs de test pour 
                      les techniques à 2 et 3 valeurs.
                    </p>

                    <form onSubmit={handleBoundaryCalculate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minVal">Valeur min</Label>
                          <Input
                            id="minVal"
                            type="number"
                            value={minVal}
                            onChange={(e) => setMinVal(parseInt(e.target.value) || 0)}
                            placeholder="Ex: 0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxVal">Valeur max</Label>
                          <Input
                            id="maxVal"
                            type="number"
                            value={maxVal}
                            onChange={(e) => setMaxVal(parseInt(e.target.value) || 10)}
                            placeholder="Ex: 10"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-calm-blue-500 hover:bg-calm-blue-600 transition-all duration-300 hover:scale-105"
                      >
                        Générer les valeurs de test
                      </Button>
                    </form>

                    {boundaryError && (
                      <Alert className="mt-6 border-red-200 bg-red-50">
                        <AlertDescription className="text-red-700">{boundaryError}</AlertDescription>
                      </Alert>
                    )}

                    {boundaryResults && (
                      <div 
                        className="mt-6 animate-fade-in"
                        dangerouslySetInnerHTML={{ __html: boundaryResults }}
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="detection" className="space-y-6">
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-4">Exercice 2 : Détection d'un bug</h4>
                    <p className="text-calm-gray-700 mb-6">
                      Supposons qu'un développeur ait mal codé la condition <em>x ≤ B</em> en <em>x = B</em>. 
                      Découvrez quelle technique détecterait l'erreur.
                    </p>

                    <form onSubmit={handleBugTest} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="boundaryB">Borne (B)</Label>
                        <Input
                          id="boundaryB"
                          type="number"
                          value={boundaryB}
                          onChange={(e) => setBoundaryB(parseInt(e.target.value) || 10)}
                          placeholder="Ex: 10"
                          className="max-w-xs"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-105"
                      >
                        Analyser la détection
                      </Button>
                    </form>

                    {bugError && (
                      <Alert className="mt-6 border-red-200 bg-red-50">
                        <AlertDescription className="text-red-700">{bugError}</AlertDescription>
                      </Alert>
                    )}

                    {bugResults && (
                      <div 
                        className="mt-6 animate-fade-in"
                        dangerouslySetInnerHTML={{ __html: bugResults }}
                      />
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Conclusion */}
        <AnimatedSection delay={600}>
          <Card className="border-calm-green-200 bg-calm-green-50">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-calm-gray-700 text-lg leading-relaxed">
                L'analyse des valeurs limites est un <strong className="text-calm-green-600">complément essentiel</strong> 
                aux partitions d'équivalence. Elle cible les frontières, là où les défauts sont les plus susceptibles d'apparaître. 
                En combinant ces deux approches (et éventuellement d'autres), on renforce la robustesse de nos tests et on minimise 
                le risque de bugs en production.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

      </main>

      <Footer />
    </div>
  );
};

export default AnalyseValeursLimites;
