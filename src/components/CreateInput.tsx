
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface CreateInputProps {
  onBack: () => void;
  onSave: (input: any) => void;
}

const CreateInput = ({ onBack, onSave }: CreateInputProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    unit: '',
    alertLevel: '',
    unitPrice: '',
    lastPurchase: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInput = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      stock: parseInt(formData.stock),
      unit: formData.unit,
      alertLevel: parseInt(formData.alertLevel),
      totalValue: parseInt(formData.stock) * parseFloat(formData.unitPrice),
      lastPurchase: formData.lastPurchase
    };
    onSave(newInput);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvel intrant</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'intrant</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvel intrant</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de l'intrant *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Engrais NPK 15-15-15"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Select onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engrais">Engrais</SelectItem>
                    <SelectItem value="Semences">Semences</SelectItem>
                    <SelectItem value="Phytosanitaire">Phytosanitaire</SelectItem>
                    <SelectItem value="Amendement">Amendement</SelectItem>
                    <SelectItem value="Fiente">Fiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stock">Stock initial *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  placeholder="Ex: 25"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unit">Unité *</Label>
                <Select onValueChange={(value) => setFormData({...formData, unit: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogrammes</SelectItem>
                    <SelectItem value="sacs 50kg">Sacs 50kg</SelectItem>
                    <SelectItem value="litres">Litres</SelectItem>
                    <SelectItem value="tonnes">Tonnes</SelectItem>
                    <SelectItem value="unités">Unités</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alertLevel">Seuil d'alerte *</Label>
                <Input
                  id="alertLevel"
                  type="number"
                  value={formData.alertLevel}
                  onChange={(e) => setFormData({...formData, alertLevel: e.target.value})}
                  placeholder="Ex: 10"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitPrice">Prix unitaire (GNF) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                  placeholder="Ex: 100000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastPurchase">Date d'achat</Label>
                <Input
                  id="lastPurchase"
                  type="date"
                  value={formData.lastPurchase}
                  onChange={(e) => setFormData({...formData, lastPurchase: e.target.value})}
                />
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Créer l'intrant
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateInput;
