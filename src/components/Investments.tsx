
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

const Investments = () => {
  const [formData, setFormData] = useState({
    surface: '',
    perimetre: '',
    ligneMere: '',
    ligneSecondaire: '',
    distanceSourceEau: '',
    calibre: 'moyen',
    prixMotoPompe: '15000000',
    prixMarche: '1500',
    region: 'conakry'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateInvestments = () => {
    const surface = parseFloat(formData.surface) || 0;
    const perimetre = parseFloat(formData.perimetre) || 0;
    const ligneMere = parseFloat(formData.ligneMere) || 0;
    const ligneSecondaire = parseFloat(formData.ligneSecondaire) || 0;
    const distanceSourceEau = parseFloat(formData.distanceSourceEau) || 0;
    const prixMotoPompe = parseFloat(formData.prixMotoPompe) || 15000000;
    const prixMarche = parseFloat(formData.prixMarche) || 1500;

    // Calculs pour la clôture
    const rouleauxGrillage = Math.ceil(perimetre / 25);
    const piquets = Math.ceil(perimetre / 2);

    // Calculs pour l'irrigation
    const tuyauxGalvanises = Math.ceil((ligneMere + distanceSourceEau) / 6);
    const vannes = Math.ceil(ligneMere / 18);
    const tuyauxNoirs = Math.ceil((ligneSecondaire / 9) * vannes);
    const semelles = Math.ceil((ligneSecondaire / 18) * vannes);

    // Calculs des semences selon le calibre
    let semencesQuantite = 0;
    if (formData.calibre === 'petit') {
      semencesQuantite = surface * 2;
    } else if (formData.calibre === 'moyen') {
      semencesQuantite = surface * 2.5;
    } else if (formData.calibre === 'gros') {
      semencesQuantite = surface * 3;
    }

    // Quantités fixes
    const fienteSacs = surface * 300;
    const engraisTonnes = surface * 2;

    // Coûts unitaires (en GNF)
    const prixUnitaires = {
      rouleauGrillage: 150000,
      piquet: 5000,
      tuyauGalvanise: 45000,
      vanne: 25000,
      tuyauNoir: 8000,
      semelle: 12000,
      semenceKg: 2500,
      fienteSac: 15000,
      engraisKg: 1200,
      mainOeuvre: surface * 500000,
      preparationTerrain: surface * 300000
    };

    // Investissements initiaux
    const investissementsInitiaux = {
      cloture: (rouleauxGrillage * prixUnitaires.rouleauGrillage) + (piquets * prixUnitaires.piquet),
      irrigation: (tuyauxGalvanises * prixUnitaires.tuyauGalvanise) + 
                 (vannes * prixUnitaires.vanne) + 
                 (tuyauxNoirs * prixUnitaires.tuyauNoir) + 
                 (semelles * prixUnitaires.semelle) + 
                 prixMotoPompe,
      semences: semencesQuantite * 1000 * prixUnitaires.semenceKg,
      fiente: fienteSacs * prixUnitaires.fienteSac,
      engrais: engraisTonnes * 1000 * prixUnitaires.engraisKg,
      mainOeuvre: prixUnitaires.mainOeuvre,
      preparationTerrain: prixUnitaires.preparationTerrain
    };

    const totalInvestissement = Object.values(investissementsInitiaux).reduce((a, b) => a + b, 0);

    // Coûts récurrents par cycle
    const coutsRecurrents = {
      semences: semencesQuantite * 1000 * prixUnitaires.semenceKg * 0.7,
      fertilisants: engraisTonnes * 1000 * prixUnitaires.engraisKg * 0.5,
      traitements: surface * 200000,
      mainOeuvreSaisonniere: surface * 300000,
      irrigation: surface * 150000
    };

    const totalCoutsRecurrents = Object.values(coutsRecurrents).reduce((a, b) => a + b, 0);

    // Revenus
    const rendementTonnes = surface * 15;
    const revenus = {
      bruts: rendementTonnes * 1000 * prixMarche,
      nets: (rendementTonnes * 1000 * prixMarche) - totalCoutsRecurrents
    };

    // Indicateurs financiers
    const roi = ((revenus.nets / totalInvestissement) * 100);
    const margeBeneficiaire = ((revenus.nets / revenus.bruts) * 100);
    const periodeRecuperation = totalInvestissement / revenus.nets;

    return {
      quantites: {
        rouleauxGrillage,
        piquets,
        tuyauxGalvanises,
        vannes,
        tuyauxNoirs,
        semelles,
        semencesQuantite,
        fienteSacs,
        engraisTonnes,
        rendementTonnes
      },
      investissementsInitiaux,
      totalInvestissement,
      coutsRecurrents,
      totalCoutsRecurrents,
      revenus,
      indicateurs: {
        roi,
        margeBeneficiaire,
        periodeRecuperation
      }
    };
  };

  const calculations = calculateInvestments();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Calculator className="mr-3 h-6 w-6" />
          Prévision des Investissements & Rendements
        </h1>
        <p className="text-green-100">
          Calculez la rentabilité de votre projet de culture de pommes de terre
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulaire de paramètres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Paramètres du projet</span>
            </CardTitle>
            <CardDescription>
              Saisissez les données spécifiques à votre terrain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="surface">Surface (hectares)</Label>
                <Input
                  id="surface"
                  type="number"
                  value={formData.surface}
                  onChange={(e) => handleInputChange('surface', e.target.value)}
                  placeholder="Ex: 2.5"
                />
              </div>
              <div>
                <Label htmlFor="perimetre">Périmètre du champ (m)</Label>
                <Input
                  id="perimetre"
                  type="number"
                  value={formData.perimetre}
                  onChange={(e) => handleInputChange('perimetre', e.target.value)}
                  placeholder="Ex: 800"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="ligneMere">Ligne mère (m)</Label>
                <Input
                  id="ligneMere"
                  type="number"
                  value={formData.ligneMere}
                  onChange={(e) => handleInputChange('ligneMere', e.target.value)}
                  placeholder="Ex: 200"
                />
              </div>
              <div>
                <Label htmlFor="ligneSecondaire">Ligne secondaire (m)</Label>
                <Input
                  id="ligneSecondaire"
                  type="number"
                  value={formData.ligneSecondaire}
                  onChange={(e) => handleInputChange('ligneSecondaire', e.target.value)}
                  placeholder="Ex: 100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="distanceSourceEau">Distance source d'eau (m)</Label>
                <Input
                  id="distanceSourceEau"
                  type="number"
                  value={formData.distanceSourceEau}
                  onChange={(e) => handleInputChange('distanceSourceEau', e.target.value)}
                  placeholder="Ex: 50"
                />
              </div>
              <div>
                <Label>Calibre des pommes de terre</Label>
                <Select value={formData.calibre} onValueChange={(value) => handleInputChange('calibre', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petit">Petit calibre (2T/ha)</SelectItem>
                    <SelectItem value="moyen">Calibre moyen (2.5T/ha)</SelectItem>
                    <SelectItem value="gros">Gros calibre (3T/ha)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="prixMotoPompe">Prix moto-pompe (GNF)</Label>
                <Input
                  id="prixMotoPompe"
                  type="number"
                  value={formData.prixMotoPompe}
                  onChange={(e) => handleInputChange('prixMotoPompe', e.target.value)}
                  placeholder="15000000"
                />
              </div>
              <div>
                <Label htmlFor="prixMarche">Prix marché (GNF/kg)</Label>
                <Input
                  id="prixMarche"
                  type="number"
                  value={formData.prixMarche}
                  onChange={(e) => handleInputChange('prixMarche', e.target.value)}
                  placeholder="1500"
                />
              </div>
            </div>

            <div>
              <Label>Région</Label>
              <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conakry">Conakry</SelectItem>
                  <SelectItem value="kindia">Kindia</SelectItem>
                  <SelectItem value="boke">Boké</SelectItem>
                  <SelectItem value="faranah">Faranah</SelectItem>
                  <SelectItem value="kankan">Kankan</SelectItem>
                  <SelectItem value="mamou">Mamou</SelectItem>
                  <SelectItem value="labe">Labé</SelectItem>
                  <SelectItem value="nzerekore">N'Zérékoré</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Indicateurs clés */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Indicateurs financiers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-sm text-green-600">ROI (Retour sur investissement)</p>
                <p className="text-2xl font-bold text-green-800">
                  {calculations.indicateurs.roi.toFixed(1)}%
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-sm text-blue-600">Bénéfice net par cycle</p>
                <p className="text-2xl font-bold text-blue-800">
                  {calculations.revenus.nets.toLocaleString()} GNF
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg">
                <p className="text-sm text-amber-600">Période de récupération</p>
                <p className="text-2xl font-bold text-amber-800">
                  {calculations.indicateurs.periodeRecuperation.toFixed(1)} cycles
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                <p className="text-sm text-purple-600">Marge bénéficiaire</p>
                <p className="text-2xl font-bold text-purple-800">
                  {calculations.indicateurs.margeBeneficiaire.toFixed(1)}%
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-lg">
                <p className="text-sm text-indigo-600">Rendement attendu</p>
                <p className="text-2xl font-bold text-indigo-800">
                  {calculations.quantites.rendementTonnes.toFixed(1)} tonnes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détail des investissements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investissements initiaux</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Clôture ({calculations.quantites.rouleauxGrillage} rouleaux, {calculations.quantites.piquets} piquets)</span>
                <span className="font-medium">{calculations.investissementsInitiaux.cloture.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Système d'irrigation</span>
                <span className="font-medium">{calculations.investissementsInitiaux.irrigation.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Semences ({calculations.quantites.semencesQuantite}T)</span>
                <span className="font-medium">{calculations.investissementsInitiaux.semences.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Fiente ({calculations.quantites.fienteSacs} sacs)</span>
                <span className="font-medium">{calculations.investissementsInitiaux.fiente.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Engrais ({calculations.quantites.engraisTonnes}T)</span>
                <span className="font-medium">{calculations.investissementsInitiaux.engrais.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Main d'œuvre</span>
                <span className="font-medium">{calculations.investissementsInitiaux.mainOeuvre.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Préparation terrain</span>
                <span className="font-medium">{calculations.investissementsInitiaux.preparationTerrain.toLocaleString()} GNF</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total investissement</span>
                <span>{calculations.totalInvestissement.toLocaleString()} GNF</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenus et bénéfices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Rendement attendu</span>
                <span className="font-medium">{calculations.quantites.rendementTonnes} tonnes</span>
              </div>
              <div className="flex justify-between">
                <span>Revenus bruts</span>
                <span className="font-medium">{calculations.revenus.bruts.toLocaleString()} GNF</span>
              </div>
              <div className="flex justify-between">
                <span>Coûts récurrents</span>
                <span className="font-medium">{calculations.totalCoutsRecurrents.toLocaleString()} GNF</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-green-600">
                <span>Bénéfice net par cycle</span>
                <span>{calculations.revenus.nets.toLocaleString()} GNF</span>
              </div>
            </div>

            {calculations.indicateurs.roi < 20 && (
              <div className="mt-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
                  <p className="text-sm text-amber-700">
                    ROI faible. Considérez optimiser les coûts ou améliorer le rendement.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Investments;
