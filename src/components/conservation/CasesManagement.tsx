
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Grid } from 'lucide-react';

const CasesManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCaseName, setNewCaseName] = useState('');

  // Données mockées
  const [cases, setCases] = useState([
    { id: '1', nom: 'Case A1', nombreTapis: 4, nombreLignes: 16, capaciteUtilisee: 75 },
    { id: '2', nom: 'Case A2', nombreTapis: 4, nombreLignes: 16, capaciteUtilisee: 60 },
    { id: '3', nom: 'Case B1', nombreTapis: 6, nombreLignes: 24, capaciteUtilisee: 85 },
    { id: '4', nom: 'Case B2', nombreTapis: 6, nombreLignes: 24, capaciteUtilisee: 45 }
  ]);

  const handleCreateCase = () => {
    if (newCaseName.trim()) {
      const newCase = {
        id: Date.now().toString(),
        nom: newCaseName,
        nombreTapis: 0,
        nombreLignes: 0,
        capaciteUtilisee: 0
      };
      setCases([...cases, newCase]);
      setNewCaseName('');
      setShowCreateForm(false);
    }
  };

  const handleDeleteCase = (id: string) => {
    setCases(cases.filter(case => case.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Cases</h2>
          <p className="text-gray-600">Gérez les espaces de stockage principaux</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Case
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer une nouvelle case</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="caseName">Nom de la case *</Label>
                <Input
                  id="caseName"
                  value={newCaseName}
                  onChange={(e) => setNewCaseName(e.target.value)}
                  placeholder="Ex: Case A1"
                />
              </div>
              <div className="flex items-end space-x-2">
                <Button onClick={handleCreateCase} className="bg-green-600 hover:bg-green-700">
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
            <Grid className="h-5 w-5" />
            <span>Liste des Cases</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Nombre de Tapis</TableHead>
                <TableHead>Nombre de Lignes</TableHead>
                <TableHead>Capacité Utilisée</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.nom}</TableCell>
                  <TableCell>{caseItem.nombreTapis}</TableCell>
                  <TableCell>{caseItem.nombreLignes}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${caseItem.capaciteUtilisee}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{caseItem.capaciteUtilisee}%</span>
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
                        onClick={() => handleDeleteCase(caseItem.id)}
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

export default CasesManagement;
