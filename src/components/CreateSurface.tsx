
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';

interface CreateSurfaceProps {
  onBack: () => void;
  onSave: (surface: any) => void;
}

const CreateSurface = ({ onBack, onSave }: CreateSurfaceProps) => {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    location: '',
    soilType: '',
    description: '',
    waterDistance: '',
    isFenced: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSurface = {
      id: Date.now(),
      name: formData.name,
      area: parseFloat(formData.area),
      location: formData.location,
      soilType: formData.soilType,
      status: 'Disponible',
      lastCrop: 'Aucune',
      description: formData.description,
      waterDistance: parseFloat(formData.waterDistance),
      isFenced: formData.isFenced
    };
    onSave(newSurface);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle surface agricole</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la surface</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvelle surface agricole</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de la surface *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Parcelle Nord"
                  required
                />
              </div>
              <div>
                <Label htmlFor="area">Superficie (hectares) *</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.1"
                  value={formData.area}
                  onChange={(e) => setFormData({...formData, area: e.target.value})}
                  placeholder="Ex: 8.5"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Ex: Secteur Kindia - Route de Mamou"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilType">Type de sol *</Label>
                <Select onValueChange={(value) => setFormData({...formData, soilType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de sol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Argileux">Argileux</SelectItem>
                    <SelectItem value="Limoneux">Limoneux</SelectItem>
                    <SelectItem value="Sableux">Sableux</SelectItem>
                    <SelectItem value="Argilo-limoneux">Argilo-limoneux</SelectItem>
                    <SelectItem value="Sablo-limoneux">Sablo-limoneux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="waterDistance">Distance de la source d'eau (mètres) *</Label>
                <Input
                  id="waterDistance"
                  type="number"
                  value={formData.waterDistance}
                  onChange={(e) => setFormData({...formData, waterDistance: e.target.value})}
                  placeholder="Ex: 150"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFenced"
                checked={formData.isFenced}
                onCheckedChange={(checked) => setFormData({...formData, isFenced: checked})}
              />
              <Label htmlFor="isFenced">Surface clôturée</Label>
            </div>

            <div>
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description de la surface, particularités..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Créer la surface
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSurface;
