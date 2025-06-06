
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

interface CreateEquipmentProps {
  onBack: () => void;
  onSave: (equipment: any) => void;
}

const CreateEquipment = ({ onBack, onSave }: CreateEquipmentProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'Opérationnel',
    acquisitionDate: '',
    lastMaintenance: '',
    nextMaintenance: '',
    value: '',
    description: '',
    caracteristique: '',
    dateMiseService: '',
    dureeAmortissement: '',
    quantite: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEquipment = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      status: formData.status,
      acquisitionDate: formData.acquisitionDate,
      lastMaintenance: formData.lastMaintenance,
      nextMaintenance: formData.nextMaintenance,
      value: parseFloat(formData.value),
      description: formData.description,
      caracteristique: formData.caracteristique,
      dateMiseService: formData.dateMiseService,
      dureeAmortissement: parseInt(formData.dureeAmortissement),
      quantite: parseInt(formData.quantite)
    };
    onSave(newEquipment);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvel équipement</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'équipement</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvel équipement</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de l'équipement *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Tracteur John Deere 5050E"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type d'équipement *</Label>
                <Select onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tracteur">Tracteur</SelectItem>
                    <SelectItem value="Labour">Équipement de labour</SelectItem>
                    <SelectItem value="Irrigation">Irrigation</SelectItem>
                    <SelectItem value="Récolte">Récolte</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Traitement">Traitement phytosanitaire</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Valeur (GNF) *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  placeholder="Ex: 25000000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantite">Quantité *</Label>
                <Input
                  id="quantite"
                  type="number"
                  value={formData.quantite}
                  onChange={(e) => setFormData({...formData, quantite: e.target.value})}
                  placeholder="Ex: 1"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Statut *</Label>
                <Select onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Opérationnel">Opérationnel</SelectItem>
                    <SelectItem value="En maintenance">En maintenance</SelectItem>
                    <SelectItem value="Hors service">Hors service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dureeAmortissement">Durée d'amortissement (années)</Label>
                <Input
                  id="dureeAmortissement"
                  type="number"
                  value={formData.dureeAmortissement}
                  onChange={(e) => setFormData({...formData, dureeAmortissement: e.target.value})}
                  placeholder="Ex: 10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="acquisitionDate">Date d'acquisition *</Label>
                <Input
                  id="acquisitionDate"
                  type="date"
                  value={formData.acquisitionDate}
                  onChange={(e) => setFormData({...formData, acquisitionDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateMiseService">Date de mise en service</Label>
                <Input
                  id="dateMiseService"
                  type="date"
                  value={formData.dateMiseService}
                  onChange={(e) => setFormData({...formData, dateMiseService: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="lastMaintenance">Dernière maintenance</Label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  value={formData.lastMaintenance}
                  onChange={(e) => setFormData({...formData, lastMaintenance: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nextMaintenance">Prochaine maintenance</Label>
              <Input
                id="nextMaintenance"
                type="date"
                value={formData.nextMaintenance}
                onChange={(e) => setFormData({...formData, nextMaintenance: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="caracteristique">Caractéristiques techniques</Label>
              <Textarea
                id="caracteristique"
                value={formData.caracteristique}
                onChange={(e) => setFormData({...formData, caracteristique: e.target.value})}
                placeholder="Puissance, dimensions, capacité, etc."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Description de l'équipement, utilisation..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Créer l'équipement
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEquipment;
