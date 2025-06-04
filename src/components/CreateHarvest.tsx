
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface CreateHarvestProps {
  onBack: () => void;
  onSave: (harvest: any) => void;
}

const CreateHarvest = ({ onBack, onSave }: CreateHarvestProps) => {
  const [formData, setFormData] = useState({
    fieldName: '',
    variety: '',
    harvestDate: '',
    quantity: '',
    quality: '',
    storageLocation: '',
    unitPrice: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newHarvest = {
      id: Date.now(),
      fieldName: formData.fieldName,
      variety: formData.variety,
      harvestDate: formData.harvestDate,
      quantity: parseInt(formData.quantity),
      quality: formData.quality,
      storageLocation: formData.storageLocation,
      unitPrice: parseFloat(formData.unitPrice),
      totalValue: parseInt(formData.quantity) * parseFloat(formData.unitPrice),
      sold: 0,
      inStock: parseInt(formData.quantity)
    };
    onSave(newHarvest);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle récolte</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la récolte</CardTitle>
          <CardDescription>Enregistrez une nouvelle récolte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fieldName">Champ récolté *</Label>
                <Select onValueChange={(value) => setFormData({...formData, fieldName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le champ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Champ A1">Champ A1</SelectItem>
                    <SelectItem value="Champ B2">Champ B2</SelectItem>
                    <SelectItem value="Champ C3">Champ C3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="variety">Variété *</Label>
                <Select onValueChange={(value) => setFormData({...formData, variety: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la variété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Charlotte">Charlotte</SelectItem>
                    <SelectItem value="Bintje">Bintje</SelectItem>
                    <SelectItem value="Désirée">Désirée</SelectItem>
                    <SelectItem value="Spunta">Spunta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quantity">Quantité récoltée (kg) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="Ex: 2800"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Prix unitaire (GNF/kg)</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                  placeholder="Ex: 25000"
                />
              </div>
              <div>
                <Label>Valeur totale (GNF)</Label>
                <div className="px-3 py-2 bg-gray-100 rounded-md text-lg font-semibold">
                  {formData.quantity && formData.unitPrice 
                    ? (parseInt(formData.quantity) * parseFloat(formData.unitPrice)).toLocaleString()
                    : '0'
                  } GNF
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="harvestDate">Date de récolte *</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quality">Qualité *</Label>
                <Select onValueChange={(value) => setFormData({...formData, quality: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Évaluez la qualité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellente">Excellente</SelectItem>
                    <SelectItem value="Bonne">Bonne</SelectItem>
                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                    <SelectItem value="Médiocre">Médiocre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="storageLocation">Lieu de stockage</Label>
              <Select onValueChange={(value) => setFormData({...formData, storageLocation: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Où stocker la récolte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entrepôt Principal">Entrepôt Principal</SelectItem>
                  <SelectItem value="Entrepôt Nord">Entrepôt Nord</SelectItem>
                  <SelectItem value="Entrepôt Sud">Entrepôt Sud</SelectItem>
                  <SelectItem value="Chambre froide">Chambre froide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Enregistrer la récolte
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateHarvest;
