
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClipboardList } from 'lucide-react';
import { useState } from 'react';

const TablesDecisions = () => {
  const [showTable, setShowTable] = useState(false);
  const [depA, setDepA] = useState('oui');
  const [depB, setDepB] = useState('oui');
  const [minimizeResult, setMinimizeResult] = useState('');

  const generateTable = () => {
    setShowTable(true);
  };

  const minimizeTable = () => {
    let result = '';
    
    if (depA === 'oui' && depB === 'oui') {
      result = `L'action dépend à la fois de A et de B. Vous devez conserver 4 colonnes (R1, R2, R3, R4) pour couvrir (V, V), (V, F), (F, V), (F, F).`;
    } else if (depA === 'oui' && depB === 'non') {
      result = `L'action ne dépend que de A (mais pas de B). Vous pouvez fusionner les valeurs de B, et n'avez besoin que de 2 règles : (A=V) et (A=F).`;
    } else if (depA === 'non' && depB === 'oui') {
      result = `L'action ne dépend que de B (mais pas de A). Vous pouvez fusionner les valeurs de A, et n'avez besoin que de 2 règles : (B=V) et (B=F).`;
    } else {
      result = `L'action ne dépend ni de A, ni de B. Théoriquement, vous n'avez qu'une seule règle (tout résultat est identique, quel que soit A ou B).`;
    }
    
    setMinimizeResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-gray-50 via-calm-blue-50 to-calm-green-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-scale">
            <ClipboardList className="w-16 h-16 mx-auto mb-6 animate-pulse-soft" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Tests par tables de décisions
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
              Couvrir toutes les combinaisons de conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-grow space-y-12">
        
        <AnimatedSection delay={200}>
          <Card className="border-calm-blue-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Pourquoi utiliser les tables de décisions ?</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">
                Les <strong className="text-calm-blue-600">tables de décisions</strong> sont un moyen systématique de représenter
                toutes les <em>combinaisons</em> de conditions logiques, et de vérifier les
                <em>actions/résultats</em> attendus pour chacune. C'est particulièrement utile
                quand les <em>règles métier</em> sont complexes ou nombreuses, et qu'on veut
                s'assurer de ne rien omettre.
              </p>
              <p>
                On l'emploie souvent pour les règles tarifaires, l'attribution de droits,
                les enchaînements d'options, etc.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <Card className="border-calm-green-200">
            <CardHeader>
              <CardTitle className="text-3xl text-calm-gray-800">Construction d'une table</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none text-calm-gray-700">
              <p className="mb-4">Une table de décisions comporte :</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Des <strong className="text-calm-blue-600">conditions</strong> (lignes) pouvant être Vrai (V) ou Faux (F), parfois étendues à plusieurs valeurs</li>
                <li>Des <strong className="text-calm-blue-600">actions</strong> (lignes) qui peuvent se produire ou non (X ou vide)</li>
                <li>Des <strong className="text-calm-blue-600">colonnes</strong> (règles) représentant les combinaisons réalisables de conditions</li>
              </ul>
              <p className="mt-4">
                Chaque colonne indique les valeurs (V/F/-, etc.) de chaque condition, et
                les actions (X ou non) à déclencher dans ce scénario.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <Card className="border-calm-blue-200 bg-calm-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-calm-gray-800">Exercice 1 : Création d'une table de décisions simplifiée</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-calm-gray-700 mb-4">
                Pour cet exemple, nous avons 2 conditions booléennes :
                <strong> A</strong> (oui/non) et <strong> B</strong> (oui/non).
                Le script va générer les 4 règles (colonnes) possibles (V/F pour A, V/F pour B).
              </p>

              <Button 
                onClick={generateTable}
                className="bg-calm-blue-500 hover:bg-calm-blue-600 mb-4"
              >
                Générer la table
              </Button>

              {showTable && (
                <div className="animate-fade-in">
                  <Table className="bg-white">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Règle</TableHead>
                        <TableHead>Condition A</TableHead>
                        <TableHead>Condition B</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>R1</TableCell>
                        <TableCell>V</TableCell>
                        <TableCell>V</TableCell>
                        <TableCell>?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>R2</TableCell>
                        <TableCell>V</TableCell>
                        <TableCell>F</TableCell>
                        <TableCell>?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>R3</TableCell>
                        <TableCell>F</TableCell>
                        <TableCell>V</TableCell>
                        <TableCell>?</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>R4</TableCell>
                        <TableCell>F</TableCell>
                        <TableCell>F</TableCell>
                        <TableCell>?</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <p className="text-sm text-calm-gray-600 mt-2">
                    Remplacez "?" par les actions prévues (X ou vide, ou plus complexe)
                    selon chaque règle.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={800}>
          <Card className="border-calm-green-200 bg-calm-green-50">
            <CardHeader>
              <CardTitle className="text-2xl text-calm-gray-800">Exercice 2 : Minimisation de la table</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-calm-gray-700 mb-4">
                Parfois, certaines conditions sont <em>indépendantes</em> d'une action, et peuvent
                être fusionnées dans la table. Essayez d'indiquer ci-dessous si l'action dépend de A,
                de B, ou des deux, et voyez comment la table peut être réduite.
              </p>

              <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                <div className="flex flex-col">
                  <label className="text-calm-gray-600 mb-1">Action dépend de A ?</label>
                  <Select value={depA} onValueChange={setDepA}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col">
                  <label className="text-calm-gray-600 mb-1">Action dépend de B ?</label>
                  <Select value={depB} onValueChange={setDepB}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oui">Oui</SelectItem>
                      <SelectItem value="non">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={minimizeTable}
                  className="bg-calm-green-500 hover:bg-calm-green-600 mt-4 md:mt-6"
                >
                  Minimiser
                </Button>
              </div>

              {minimizeResult && (
                <div className="bg-white p-4 rounded shadow mt-4 animate-fade-in">
                  <p className="text-calm-gray-700">{minimizeResult}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={1000}>
          <Card className="border-calm-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-calm-gray-800">Conclusion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-calm-gray-700 leading-relaxed">
                Les <strong className="text-calm-blue-600">tests par tables de décisions</strong> offrent une vision globale
                des <em>conditions</em> et <em>actions</em>, et aident à couvrir toutes les
                combinaisons réalisables. Si le nombre de conditions est important, on peut
                recourir à la <em>simplification</em> ou au <em>risque-based testing</em>
                pour restreindre le nombre de règles à tester.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

      </main>

      <Footer />
    </div>
  );
};

export default TablesDecisions;
