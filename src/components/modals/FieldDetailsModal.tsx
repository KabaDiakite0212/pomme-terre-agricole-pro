
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Sprout, Target, Activity, Calculator, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface FieldDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: any;
}

const FieldDetailsModal = ({ isOpen, onClose, field }: FieldDetailsModalProps) => {
  const [investmentData, setInvestmentData] = useState({
    perimetre: '',
    ligneMere: '',
    ligneSecondaire: '',
    distanceSourceEau: '',
    prixMotoPompe: '15000000',
    prixMarche: '1500'
  });

  if (!field) return null;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prêt à récolter':
        return 'bg-green-100 text-green-800';
      case 'Croissance':
        return 'bg-amber-100 text-amber-800';
      case 'Jeune plant':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateInvestments = () => {
    const perimetre = parseFloat(investmentData.perimetre) || 0;
    const ligneMere = parseFloat(investmentData.ligneMere) || 0;
    const ligneSecondaire = parseFloat(investmentData.ligneSecondaire) || 0;
    const distanceSourceEau = parseFloat(investmentData.distanceSourceEau) || 0;
    const prixMotoPompe = parseFloat(investmentData.prixMotoPompe) || 15000000;
    const prixMarche = parseFloat(investmentData.prixMarche) || 1500;
    const surface = field.area || 0;

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
    if (field.variety?.includes('Petit calibre')) {
      semencesQuantite = surface * 2;
    } else if (field.variety?.includes('Calibre moyen')) {
      semencesQuantite = surface * 2.5;
    } else if (field.variety?.includes('Gros calibre')) {
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
      semences: semencesQuantite * 1000 * prixUnitaires.semenceKg * 0.7, // 70% pour replantation
      fertilisants: engraisTonnes * 1000 * prixUnitaires.engraisKg * 0.5,
      traitements: surface * 200000,
      mainOeuvreSaisonniere: surface * 300000,
      irrigation: surface * 150000
    };

    const totalCoutsRecurrents = Object.values(coutsRecurrents).reduce((a, b) => a + b, 0);

    // Revenus
    const rendementTonnes = surface * 15; // 15 tonnes par hectare
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span>Détails - {field.name}</span>
          </DialogTitle>
          <DialogDescription>
            Informations complètes et prévisions financières du champ
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Informations du champ</TabsTrigger>
            <TabsTrigger value="previsions">Prévisions & Investissements</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* En-tête avec statut */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">{field.name}</h3>
                  <p className="text-green-600">{field.surface} • {field.area} ha</p>
                </div>
                <Badge className={getStageColor(field.stage)}>
                  {field.stage}
                </Badge>
              </div>
            </div>

            {/* Informations générales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Surface agricole</p>
                    <p className="font-medium">{field.surface}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Target className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Superficie</p>
                    <p className="font-medium">{field.area} hectares</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Date de plantation</p>
                    <p className="font-medium">{new Date(field.plantDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Sprout className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Densité de semis</p>
                    <p className="font-medium">{field.density}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations de culture */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-blue-600" />
                Informations de culture
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Calibre des pommes de terre</p>
                    <p className="font-medium text-blue-800">{field.variety}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progression</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${field.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{field.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistiques estimées */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Estimations</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(field.area * 25)} tonnes
                  </p>
                  <p className="text-sm text-blue-700">Rendement estimé</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round((100 - field.progress) * 0.5)} jours
                  </p>
                  <p className="text-sm text-green-700">Jusqu'à récolte</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">
                    {Math.round(field.area * 25 * 20000).toLocaleString()} GNF
                  </p>
                  <p className="text-sm text-amber-700">Valeur estimée</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="previsions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulaire de paramètres */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <span>Paramètres de calcul</span>
                  </CardTitle>
                  <CardDescription>
                    Saisissez les données spécifiques à votre champ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="perimetre">Périmètre du champ (m)</Label>
                      <Input
                        id="perimetre"
                        type="number"
                        value={investmentData.perimetre}
                        onChange={(e) => setInvestmentData({...investmentData, perimetre: e.target.value})}
                        placeholder="Ex: 800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ligneMere">Ligne mère (m)</Label>
                      <Input
                        id="ligneMere"
                        type="number"
                        value={investmentData.ligneMere}
                        onChange={(e) => setInvestmentData({...investmentData, ligneMere: e.target.value})}
                        placeholder="Ex: 200"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="ligneSecondaire">Ligne secondaire (m)</Label>
                      <Input
                        id="ligneSecondaire"
                        type="number"
                        value={investmentData.ligneSecondaire}
                        onChange={(e) => setInvestmentData({...investmentData, ligneSecondaire: e.target.value})}
                        placeholder="Ex: 100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="distanceSourceEau">Distance source d'eau (m)</Label>
                      <Input
                        id="distanceSourceEau"
                        type="number"
                        value={investmentData.distanceSourceEau}
                        onChange={(e) => setInvestmentData({...investmentData, distanceSourceEau: e.target.value})}
                        placeholder="Ex: 50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="prixMotoPompe">Prix moto-pompe (GNF)</Label>
                      <Input
                        id="prixMotoPompe"
                        type="number"
                        value={investmentData.prixMotoPompe}
                        onChange={(e) => setInvestmentData({...investmentData, prixMotoPompe: e.target.value})}
                        placeholder="15000000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="prixMarche">Prix marché (GNF/kg)</Label>
                      <Input
                        id="prixMarche"
                        type="number"
                        value={investmentData.prixMarche}
                        onChange={(e) => setInvestmentData({...investmentData, prixMarche: e.target.value})}
                        placeholder="1500"
                      />
                    </div>
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FieldDetailsModal;
