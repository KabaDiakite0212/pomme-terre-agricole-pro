
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, User, Calendar } from 'lucide-react';

const ConservationAssignment = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    paysanId: '',
    dateLivraison: '',
    quantiteSemence: '',
    quantiteConsomable: '',
    typeConservation: '',
    caseId: '',
    tapisId: '',
    ligneId: ''
  });

  // Données mockées
  const paysans = [
    { id: '1', nom: 'Amadou Diallo' },
    { id: '2', nom: 'Fatou Kaba' },
    { id: '3', nom: 'Mamadou Bah' },
    { id: '4', nom: 'Aissatou Sow' }
  ];

  const cases = [
    { id: '1', nom: 'Case A1' },
    { id: '2', nom: 'Case A2' },
    { id: '3', nom: 'Case B1' },
    { id: '4', nom: 'Case B2' }
  ];

  const tapisByCase = {
    '1': [{ id: 't1', nom: 'Tapis A1-1' }, { id: 't2', nom: 'Tapis A1-2' }],
    '2': [{ id: 't3', nom: 'Tapis A2-1' }],
    '3': [{ id: 't4', nom: 'Tapis B1-1' }, { id: 't5', nom: 'Tapis B1-2' }],
    '4': [{ id: 't6', nom: 'Tapis B2-1' }]
  };

  const lignesByTapis = {
    't1': [{ id: 'l1', nom: 'Ligne A1-1-1' }, { id: 'l2', nom: 'Ligne A1-1-2' }],
    't2': [{ id: 'l3', nom: 'Ligne A1-2-1' }],
    't4': [{ id: 'l4', nom: 'Ligne B1-1-1' }, { id: 'l5', nom: 'Ligne B1-1-2' }]
  };

  const [conservations, setConservations] = useState([
    {
      id: '1',
      paysanNom: 'Amadou Diallo',
      dateLivraison: '2024-06-05',
      quantiteSemence: 500,
      quantiteConsomable: 1200,
      typeConservation: 'Consomable',
      emplacement: 'Case A1 - Tapis A1-1 - Ligne A1-1-1'
    },
    {
      id: '2',
      paysanNom: 'Fatou Kaba',
      dateLivraison: '2024-06-04',
      quantiteSemence: 300,
      quantiteConsomable: 800,
      typeConservation: 'Semence',
      emplacement: 'Case B1 - Tapis B1-1 - Ligne B1-1-2'
    }
  ]);

  const availableTapis = formData.caseId ? tapisByCase[formData.caseId] || [] : [];
  const availableLignes = formData.tapisId ? lignesByTapis[formData.tapisId] || [] : [];

  const handleCreateConservation = () => {
    if (formData.paysanId && formData.dateLivraison && (formData.quantiteSemence || formData.quantiteConsomable)) {
      const selectedPaysan = paysans.find(p => p.id === formData.paysanId);
      const selectedCase = cases.find(c => c.id === formData.caseId);
      const selectedTapis = availableTapis.find(t => t.id === formData.tapisId);
      const selectedLigne = availableLignes.find(l => l.id === formData.ligneId);

      const newConservation = {
        id: Date.now().toString(),
        paysanNom: selectedPaysan?.nom || '',
        dateLivraison: formData.dateLivraison,
        quantiteSemence: parseInt(formData.quantiteSemence) || 0,
        quantiteConsomable: parseInt(formData.quantiteConsomable) || 0,
        typeConservation: formData.typeConservation,
        emplacement: `${selectedCase?.nom} - ${selectedTapis?.nom} - ${selectedLigne?.nom}`
      };

      setConservations([...conservations, newConservation]);
      setFormData({
        paysanId: '',
        dateLivraison: '',
        quantiteSemence: '',
        quantiteConsomable: '',
        typeConservation: '',
        caseId: '',
        tapisId: '',
        ligneId: ''
      });
      setShowCreateForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Assignation des Conservations</h2>
          <p className="text-gray-600">Assignez les récoltes des paysans aux emplacements</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Assignation
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle conservation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="paysan">Paysan *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, paysanId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un paysan" />
                    </SelectTrigger>
                    <SelectContent>
                      {paysans.map((paysan) => (
                        <SelectItem key={paysan.id} value={paysan.id}>
                          {paysan.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateLivraison">Date de livraison *</Label>
                  <Input
                    id="dateLivraison"
                    type="date"
                    value={formData.dateLivraison}
                    onChange={(e) => setFormData({...formData, dateLivraison: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="typeConservation">Type de conservation *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, typeConservation: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consomable">Consomable</SelectItem>
                      <SelectItem value="Semence">Semence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantiteSemence">Quantité Semence (kg)</Label>
                  <Input
                    id="quantiteSemence"
                    type="number"
                    value={formData.quantiteSemence}
                    onChange={(e) => setFormData({...formData, quantiteSemence: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="quantiteConsomable">Quantité Consomable (kg)</Label>
                  <Input
                    id="quantiteConsomable"
                    type="number"
                    value={formData.quantiteConsomable}
                    onChange={(e) => setFormData({...formData, quantiteConsomable: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="case">Case *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, caseId: value, tapisId: '', ligneId: ''})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une case" />
                    </SelectTrigger>
                    <SelectContent>
                      {cases.map((caseItem) => (
                        <SelectItem key={caseItem.id} value={caseItem.id}>
                          {caseItem.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tapis">Tapis *</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, tapisId: value, ligneId: ''})}
                    disabled={!formData.caseId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un tapis" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTapis.map((tapis) => (
                        <SelectItem key={tapis.id} value={tapis.id}>
                          {tapis.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ligne">Ligne *</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, ligneId: value})}
                    disabled={!formData.tapisId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ligne" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLignes.map((ligne) => (
                        <SelectItem key={ligne.id} value={ligne.id}>
                          {ligne.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleCreateConservation} className="bg-green-600 hover:bg-green-700">
                  Créer Conservation
                </Button>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Conservations Actives</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paysan</TableHead>
                <TableHead>Date Livraison</TableHead>
                <TableHead>Quantité Semence</TableHead>
                <TableHead>Quantité Consomable</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Emplacement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {conservations.map((conservation) => (
                <TableRow key={conservation.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{conservation.paysanNom}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{conservation.dateLivraison}</span>
                    </div>
                  </TableCell>
                  <TableCell>{conservation.quantiteSemence} kg</TableCell>
                  <TableCell>{conservation.quantiteConsomable} kg</TableCell>
                  <TableCell>
                    <Badge variant={conservation.typeConservation === 'Consomable' ? 'default' : 'secondary'}>
                      {conservation.typeConservation}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-blue-600">
                    {conservation.emplacement}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConservationAssignment;
