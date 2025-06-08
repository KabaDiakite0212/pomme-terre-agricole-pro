
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

const LignesManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    caseId: '',
    tapisId: '',
    quantite: ''
  });

  // Données mockées
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

  const [lignes, setLignes] = useState([
    { id: '1', nom: 'Ligne A1-1-1', caseName: 'Case A1', tapisName: 'Tapis A1-1', quantite: 25, status: 'Occupée' },
    { id: '2', nom: 'Ligne A1-1-2', caseName: 'Case A1', tapisName: 'Tapis A1-1', quantite: 0, status: 'Libre' },
    { id: '3', nom: 'Ligne A1-2-1', caseName: 'Case A1', tapisName: 'Tapis A1-2', quantite: 30, status: 'Occupée' },
    { id: '4', nom: 'Ligne B1-1-1', caseName: 'Case B1', tapisName: 'Tapis B1-1', quantite: 20, status: 'Occupée' },
    { id: '5', nom: 'Ligne B1-1-2', caseName: 'Case B1', tapisName: 'Tapis B1-1', quantite: 0, status: 'Libre' }
  ]);

  const availableTapis = formData.caseId ? tapisByCase[formData.caseId] || [] : [];

  const handleCreateLigne = () => {
    if (formData.nom && formData.caseId && formData.tapisId) {
      const selectedCase = cases.find(c => c.id === formData.caseId);
      const selectedTapis = availableTapis.find(t => t.id === formData.tapisId);
      const newLigne = {
        id: Date.now().toString(),
        nom: formData.nom,
        caseName: selectedCase?.nom || '',
        tapisName: selectedTapis?.nom || '',
        quantite: parseInt(formData.quantite) || 0,
        status: parseInt(formData.quantite) > 0 ? 'Occupée' : 'Libre'
      };
      setLignes([...lignes, newLigne]);
      setFormData({ nom: '', caseId: '', tapisId: '', quantite: '' });
      setShowCreateForm(false);
    }
  };

  const handleDeleteLigne = (id: string) => {
    setLignes(lignes.filter(l => l.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Lignes</h2>
          <p className="text-gray-600">Gérez les emplacements spécifiques pour les sacs</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Ligne
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle ligne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="ligneName">Nom de la ligne *</Label>
                <Input
                  id="ligneName"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  placeholder="Ex: Ligne A1-1-1"
                />
              </div>
              <div>
                <Label htmlFor="caseSelect">Case *</Label>
                <Select onValueChange={(value) => setFormData({...formData, caseId: value, tapisId: ''})}>
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
                <Label htmlFor="tapisSelect">Tapis *</Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, tapisId: value})}
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
                <Label htmlFor="quantite">Quantité (sacs)</Label>
                <Input
                  id="quantite"
                  type="number"
                  value={formData.quantite}
                  onChange={(e) => setFormData({...formData, quantite: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={handleCreateLigne} className="bg-green-600 hover:bg-green-700">
                  Créer
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
            <MapPin className="h-5 w-5" />
            <span>Liste des Lignes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Tapis</TableHead>
                <TableHead>Quantité (sacs)</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lignes.map((ligne) => (
                <TableRow key={ligne.id}>
                  <TableCell className="font-medium">{ligne.nom}</TableCell>
                  <TableCell>{ligne.caseName}</TableCell>
                  <TableCell>{ligne.tapisName}</TableCell>
                  <TableCell>{ligne.quantite}</TableCell>
                  <TableCell>
                    <Badge variant={ligne.status === 'Libre' ? 'secondary' : 'default'}>
                      {ligne.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteLigne(ligne.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default LignesManagement;
