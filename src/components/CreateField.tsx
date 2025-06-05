
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

enum SaisonEnum {
  GrandeCompagne = 'Novembre-Avril',
  Hyvernal = 'Mai-Août',
  InterSaison = 'Septembre-Novembre',
}

interface CreateFieldProps {
  onBack: () => void;
  onSave: (field: any) => void;
}

const CreateField = ({ onBack, onSave }: CreateFieldProps) => {
  const [formData, setFormData] = useState({
    name: '',
    surface: '',
    variety: '',
    plantDate: '',
    density: '',
    area: '',
    saison: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newField = {
      id: Date.now(),
      name: formData.name,
      surface: formData.surface,
      variety: formData.variety,
      plantDate: formData.plantDate,
      density: formData.density,
      stage: 'Plantation',
      progress: 5,
      area: parseFloat(formData.area),
      saison: formData.saison
    };
    onSave(newField);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouveau champ de pommes de terre</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du champ</CardTitle>
          <CardDescription>Remplissez les détails de votre nouveau champ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom du champ *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Champ A1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="surface">Surface agricole *</Label>
                <Select onValueChange={(value) => setFormData({...formData, surface: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la surface" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Parcelle Nord">Parcelle Nord</SelectItem>
                    <SelectItem value="Parcelle Sud">Parcelle Sud</SelectItem>
                    <SelectItem value="Parcelle Est">Parcelle Est</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="variety">Calibre des pommes de terre *</Label>
                <Select onValueChange={(value) => setFormData({...formData, variety: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le calibre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petit calibre (25-35mm)">Petit calibre (25-35mm)</SelectItem>
                    <SelectItem value="Calibre moyen">Calibre moyen</SelectItem>
                    <SelectItem value="Gros calibre">Gros calibre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="area">Superficie du champ (ha) *</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.1"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  placeholder="Ex: 4.2"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plantDate">Date de plantation *</Label>
                <Input
                  id="plantDate"
                  type="date"
                  value={formData.plantDate}
                  onChange={(e) => setFormData({...formData, plantDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="saison">Saison *</Label>
                <Select onValueChange={(value) => setFormData({...formData, saison: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la saison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SaisonEnum.GrandeCompagne}>Grande campagne (Novembre-Avril)</SelectItem>
                    <SelectItem value={SaisonEnum.Hyvernal}>Hivernal (Mai-Août)</SelectItem>
                    <SelectItem value={SaisonEnum.InterSaison}>Inter-saison (Septembre-Novembre)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="density">Densité de semis *</Label>
              <Input
                id="density"
                value={formData.density}
                onChange={(e) => setFormData({...formData, density: e.target.value})}
                placeholder="Ex: 35,000 plants/ha"
                required
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Créer le champ
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateField;
