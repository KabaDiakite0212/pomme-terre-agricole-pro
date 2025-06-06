import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

interface CreateSaleProps {
  onBack: () => void;
  onSave: (sale: any) => void;
}

const CreateSale = ({ onBack, onSave }: CreateSaleProps) => {
  const [formData, setFormData] = useState({
    clientName: '',
    product: '',
    quantity: '',
    unitPrice: '',
    saleDate: '',
    paymentMethod: '',
    paymentStatus: 'Payé'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSale = {
      id: Date.now(),
      clientName: formData.clientName,
      product: formData.product,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      totalAmount: parseInt(formData.quantity) * parseFloat(formData.unitPrice),
      saleDate: formData.saleDate,
      paymentStatus: formData.paymentStatus,
      paymentMethod: formData.paymentMethod
    };
    onSave(newSale);
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle vente</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la vente</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvelle vente</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clientName">Client *</Label>
                <Select onValueChange={(value) => setFormData({...formData, clientName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Restaurant Le Jardin">Restaurant Le Jardin</SelectItem>
                    <SelectItem value="Supermarché Central">Supermarché Central</SelectItem>
                    <SelectItem value="Coopérative Locale">Coopérative Locale</SelectItem>
                    <SelectItem value="Marché Madina">Marché Madina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="product">Produit *</Label>
                <Select onValueChange={(value) => setFormData({...formData, product: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le produit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petit calibre (25-35 mm)">Petit calibre (25-35 mm)</SelectItem>
                    <SelectItem value="Calibre moyen (35-45 mm)">Calibre moyen (35-45 mm)</SelectItem>
                    <SelectItem value="Gros calibre (45-55 mm)">Gros calibre (45-55 mm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quantity">Quantité (kg) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="Ex: 500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="unitPrice">Prix unitaire (GNF/kg) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                  placeholder="Ex: 20000"
                  required
                />
              </div>
              <div>
                <Label>Total (GNF)</Label>
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
                <Label htmlFor="saleDate">Date de vente *</Label>
                <Input
                  id="saleDate"
                  type="date"
                  value={formData.saleDate}
                  onChange={(e) => setFormData({...formData, saleDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Mode de paiement *</Label>
                <Select onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Orange Money">Orange Money</SelectItem>
                    <SelectItem value="MTN Mobile Money">MTN Mobile Money</SelectItem>
                    <SelectItem value="Carte Visa">Carte Visa</SelectItem>
                    <SelectItem value="Espèce (cash)">Espèce (cash)</SelectItem>
                    <SelectItem value="Crédit 30j">Crédit 30j</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="paymentStatus">Statut de paiement *</Label>
              <Select onValueChange={(value) => setFormData({...formData, paymentStatus: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Payé">Payé</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                  <SelectItem value="Retard">En retard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Créer la vente
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSale;
