
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Grid3X3, Calculator, Target } from 'lucide-react';

const PartitionsEquivalence = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(120);
  const [results, setResults] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isNaN(minValue) || isNaN(maxValue)) {
      setError('Veuillez saisir des nombres valides.');
      return;
    }

    if (minValue >= maxValue) {
      setError('La valeur min doit être strictement inférieure à la valeur max.');
      return;
    }

    const testInvalidLow = minValue - 1;
    const testInvalidHigh = maxValue + 1;
    const randomValid = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

    const resultHtml = `
      <div class="space-y-4">
        <p class="font-semibold text-calm-gray-800">
          Intervalle valide : ${minValue} ≤ x ≤ ${maxValue}
        </p>
        
        <div class="bg-calm-blue-50 p-4 rounded-lg border border-calm-blue-200">
          <h4 class="font-semibold mb-2 text-calm-blue-800">Partitions identifiées :</h4>
          <ul class="space-y-1 text-calm-gray-700">
            <li>• Partition invalide 1 : x < ${minValue}</li>
            <li>• Partition valide : ${minValue} ≤ x ≤ ${maxValue}</li>
            <li>• Partition invalide 2 : x > ${maxValue}</li>
          </ul>
        </div>

        <div class="bg-calm-green-50 p-4 rounded-lg border border-calm-green-200">
          <h4 class="font-semibold mb-2 text-calm-green-800">Valeurs de test recommandées :</h4>
          <ul class="space-y-1 text-calm-gray-700">
            <li>• <strong>${testInvalidLow}</strong> (partition invalide x < ${minValue})</li>
            <li>• <strong>${randomValid}</strong> (partition valide ${minValue} ≤ x ≤ ${maxValue})</li>
            <li>• <strong>${testInvalidHigh}</strong> (partition invalide x > ${maxValue})</li>
          </ul>
        </div>
      </div>
    `;

    setResults(resultHtml);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-gray-50 via-calm-blue-50 to-calm-green-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-scale">
            <Grid3X3 className="w-16 h-16 mx-auto mb-6 animate-pulse-soft" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Partitions d'équivalence
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Diviser intelligemment les données pour un testing efficace.
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
              <CardTitle className="text-3xl text-calm-gray-800">Définition</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">
                Les <strong className="text-calm-blue-600">partitions d'équivalence</strong> divisent les données en partitions 
                (ou ensembles) dans l'idée que toutes les valeurs appartenant à une même partition sont traitées 
                de manière similaire par le système sous test.
              </p>
              <p>
                L'idée est la suivante : si <em className="text-calm-green-600">une</em> valeur d'une partition déclenche un 
                comportement particulier (correct ou incorrect), alors les autres valeurs de cette même partition auront 
                le même effet. Ainsi, il suffit de tester <em className="text-calm-green-600">une</em> valeur représentative 
                de chaque partition, plutôt que toutes les valeurs possibles.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Partitions valides vs invalides */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-calm-green-200 bg-calm-green-50">
              <CardHeader>
                <CardTitle className="text-calm-green-700 flex items-center space-x-2">
                  <Target className="w-6 h-6" />
                  <span>Partitions valides</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-calm-gray-700">
                  Valeurs attendues par le système et qui doivent être correctement prises en charge.
                  Ces valeurs représentent l'utilisation normale du système.
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center space-x-2">
                  <Target className="w-6 h-6" />
                  <span>Partitions invalides</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-calm-gray-700">
                  Valeurs imprévues ou hors du périmètre normal, qui doivent être soit rejetées, 
                  ignorées ou traitées différemment par le système.
                </p>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Couverture */}
        <AnimatedSection delay={400}>
          <Card className="border-calm-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Notion de couverture</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">
                Dans la technique des partitions d'équivalence, le but est d'atteindre{' '}
                <strong className="text-calm-blue-600">100% de couverture</strong> en testant au moins une valeur 
                de chaque partition identifiée.
              </p>
              <div className="bg-calm-blue-50 p-4 rounded-lg border border-calm-blue-200">
                <p className="font-semibold text-calm-blue-800 mb-2">Formule de couverture :</p>
                <p className="text-calm-gray-700">
                  <em>(partitions testées / partitions totales) × 100</em>
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Exercice interactif */}
        <AnimatedSection delay={500}>
          <Card className="border-calm-green-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800 flex items-center space-x-3">
                <Calculator className="w-8 h-8 text-calm-green-600" />
                <span>Exercice interactif</span>
              </CardTitle>
              <CardDescription>
                Saisissez un intervalle valide (min et max) pour le champ d'âge. 
                L'outil affichera les partitions et des valeurs de test suggérées.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minValue">Valeur minimum</Label>
                    <Input
                      id="minValue"
                      type="number"
                      value={minValue}
                      onChange={(e) => setMinValue(parseInt(e.target.value) || 0)}
                      placeholder="Ex: 0"
                      className="border-calm-gray-300 focus:border-calm-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxValue">Valeur maximum</Label>
                    <Input
                      id="maxValue"
                      type="number"
                      value={maxValue}
                      onChange={(e) => setMaxValue(parseInt(e.target.value) || 120)}
                      placeholder="Ex: 120"
                      className="border-calm-gray-300 focus:border-calm-blue-500"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-calm-blue-500 hover:bg-calm-blue-600 transition-all duration-300 hover:scale-105"
                >
                  Calculer les partitions
                </Button>
              </form>

              {error && (
                <Alert className="mt-6 border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {results && (
                <div 
                  className="mt-6 p-6 bg-white rounded-lg border border-calm-gray-200 shadow-sm animate-fade-in"
                  dangerouslySetInnerHTML={{ __html: results }}
                />
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Exemple illustratif */}
        <AnimatedSection delay={600}>
          <Card className="border-calm-blue-200 bg-calm-blue-50">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Exemple illustratif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none text-calm-gray-700">
                <p className="mb-4">
                  Imaginons un champ de saisie d'âge avec la contrainte <code className="bg-white px-2 py-1 rounded">0 ≤ age ≤ 120</code> :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2">Partition invalide 1</h4>
                    <p className="text-red-600">age &lt; 0</p>
                    <p className="text-sm text-red-500 mt-2">Exemple: -1</p>
                  </div>
                  
                  <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-700 mb-2">Partition valide</h4>
                    <p className="text-green-600">0 ≤ age ≤ 120</p>
                    <p className="text-sm text-green-500 mt-2">Exemple: 30</p>
                  </div>
                  
                  <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-700 mb-2">Partition invalide 2</h4>
                    <p className="text-red-600">age &gt; 120</p>
                    <p className="text-sm text-red-500 mt-2">Exemple: 200</p>
                  </div>
                </div>

                <p>
                  En testant ces trois valeurs, nous couvrons toutes les partitions identifiées, 
                  atteignant ainsi une couverture de 100%.
                </p>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Conclusion */}
        <AnimatedSection delay={700}>
          <Card className="border-calm-green-200 bg-calm-green-50">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-calm-gray-700 text-lg leading-relaxed">
                Les partitions d'équivalence offrent un moyen efficace de{' '}
                <strong className="text-calm-green-600">réduire</strong> le nombre de tests nécessaires, 
                tout en maintenant une couverture satisfaisante. Elles restent toutefois plus puissantes 
                quand on les combine avec d'autres techniques, comme l'<em className="text-calm-blue-600">analyse des valeurs limites</em> 
                ou encore les <em className="text-calm-blue-600">tests de transition d'état</em>.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

      </main>

      <Footer />
    </div>
  );
};

export default PartitionsEquivalence;
