
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';

const TapisManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    caseId: '',
    nombreLigne: ''
  });

  // Données mockées
  const cases = [
    { id: '1', nom: 'Case A1' },
    { id: '2', nom: 'Case A2' },
    { id: '3', nom: 'Case B1' },
    { id: '4', nom: 'Case B2' }
  ];

  const [tapis, setTapis] = useState([
    { id: '1', nom: 'Tapis A1-1', caseName: 'Case A1', nombreLigne: 4, lignesOccupees: 3 },
    { id: '2', nom: 'Tapis A1-2', caseName: 'Case A1', nombreLigne: 4, lignesOccupees: 2 },
    { id: '3', nom: 'Tapis B1-1', caseName: 'Case B1', nombreLigne: 6, lignesOccupees: 5 },
    { id: '4', nom: 'Tapis B2-1', caseName: 'Case B2', nombreLigne: 4, lignesOccupees: 1 }
  ]);

  const handleCreateTapis = () => {
    if (formData.nom && formData.caseId && formData.nombreLigne) {
      const selectedCase = cases.find(c => c.id === formData.caseId);
      const newTapis = {
        id: Date.now().toString(),
        nom: formData.nom,
        caseName: selectedCase?.nom || '',
        nombreLigne: parseInt(formData.nombreLigne),
        lignesOccupees: 0
      };
      setTapis([...tapis, newTapis]);
      setFormData({ nom: '', caseId: '', nombreLigne: '' });
      setShowCreateForm(false);
    }
  };

  const handleDeleteTapis = (id: string) => {
    setTapis(tapis.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Tapis</h2>
          <p className="text-gray-600">Gérez les sections de stockage dans chaque case</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Tapis
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un nouveau tapis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="tapisName">Nom du tapis *</Label>
                <Input
                  id="tapisName"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  placeholder="Ex: Tapis A1-1"
                />
              </div>
              <div>
                <Label htmlFor="caseSelect">Case *</Label>
                <Select onValueChange={(value) => setFormData({...formData, caseId: value})}>
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
                <Label htmlFor="nombreLigne">Nombre de lignes *</Label>
                <Input
                  id="nombreLigne"
                  type="number"
                  value={formData.nombreLigne}
                  onChange={(e) => setFormData({...formData, nombreLigne: e.target.value})}
                  placeholder="Ex: 4"
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={handleCreateTapis} className="bg-green-600 hover:bg-green-700">
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
            <Layers className="h-5 w-5" />
            <span>Liste des Tapis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Case</TableHead>
                <TableHead>Nombre de Lignes</TableHead>
                <TableHead>Lignes Occupées</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tapis.map((tapisItem) => (
                <TableRow key={tapisItem.id}>
                  <TableCell className="font-medium">{tapisItem.nom}</TableCell>
                  <TableCell>{tapisItem.caseName}</TableCell>
                  <TableCell>{tapisItem.nombreLigne}</TableCell>
                  <TableCell>{tapisItem.lignesOccupees}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(tapisItem.lignesOccupees / tapisItem.nombreLigne) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        {tapisItem.nombreLigne - tapisItem.lignesOccupees} libre(s)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteTapis(tapisItem.id)}
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

export default TapisManagement;
