
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface CreateActivityProps {
  onBack: () => void;
  onSave: (activity: any) => void;
}

const CreateActivity = ({ onBack, onSave }: CreateActivityProps) => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    field: '',
    description: '',
    date: '',
    cost: '',
    responsible: '',
    status: 'Planifiée'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newActivity = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      field: formData.field,
      description: formData.description,
      date: formData.date,
      cost: parseFloat(formData.cost) || 0,
      responsible: formData.responsible,
      status: formData.status
    };
    onSave(newActivity);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle activité</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'activité</CardTitle>
          <CardDescription>Planifiez une nouvelle activité agricole</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Titre de l'activité *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Traitement fongicide"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type d'activité *</Label>
                <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Plantation">Plantation</SelectItem>
                    <SelectItem value="Traitement">Traitement</SelectItem>
                    <SelectItem value="Fertilisation">Fertilisation</SelectItem>
                    <SelectItem value="Récolte">Récolte</SelectItem>
                    <SelectItem value="Buttage">Buttage</SelectItem>
                    <SelectItem value="Désherbage">Désherbage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="field">Champ concerné *</Label>
                <Select onValueChange={(value) => setFormData({...formData, field: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le champ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Champ A1 - Charlotte">Champ A1 - Charlotte</SelectItem>
                    <SelectItem value="Champ B2 - Bintje">Champ B2 - Bintje</SelectItem>
                    <SelectItem value="Champ C3 - Désirée">Champ C3 - Désirée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date prévue *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost">Coût estimé (GNF)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  placeholder="Ex: 500000"
                />
              </div>
              <div>
                <Label htmlFor="responsible">Responsable</Label>
                <Input
                  id="responsible"
                  value={formData.responsible}
                  onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                  placeholder="Nom du responsable"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Détails de l'activité à réaliser..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Créer l'activité
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateActivity;
