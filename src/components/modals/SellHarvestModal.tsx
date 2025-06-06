
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SellHarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  harvest: any;
  onSell: () => void;
}

const SellHarvestModal = ({ isOpen, onClose, harvest, onSell }: SellHarvestModalProps) => {
  const [formData, setFormData] = useState({
    clientName: '',
    quantity: '',
    unitPrice: harvest?.unitPrice || '',
    paymentMethod: '',
    saleDate: new Date().toISOString().split('T')[0],
    product: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!harvest) return;

    // Simuler la création de vente
    console.log('Vente créée:', {
      harvestId: harvest.id,
      clientName: formData.clientName,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      totalAmount: parseInt(formData.quantity) * parseFloat(formData.unitPrice),
      paymentMethod: formData.paymentMethod,
      saleDate: formData.saleDate,
      product: formData.product
    });

    onSell();
    setFormData({
      clientName: '',
      quantity: '',
      unitPrice: harvest?.unitPrice || '',
      paymentMethod: '',
      saleDate: new Date().toISOString().split('T')[0],
      product: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Vendre la récolte</DialogTitle>
          <DialogDescription>
            Créer une vente pour la récolte du {harvest?.fieldName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="clientName">Client</Label>
            <Select onValueChange={(value) => setFormData({...formData, clientName: value})} required>
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
            <Label htmlFor="product">Type de produit</Label>
            <Select onValueChange={(value) => setFormData({...formData, product: value})} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le calibre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Petit calibre (25-35 mm)">Petit calibre (25-35 mm)</SelectItem>
                <SelectItem value="Calibre moyen (35-45 mm)">Calibre moyen (35-45 mm)</SelectItem>
                <SelectItem value="Gros calibre (45-55 mm)">Gros calibre (45-55 mm)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantité (kg)</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder={`Max: ${harvest?.inStock} kg`}
              max={harvest?.inStock}
              required
            />
          </div>
          <div>
            <Label htmlFor="unitPrice">Prix unitaire (GNF/kg)</Label>
            <Input
              id="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Total</Label>
            <div className="px-3 py-2 bg-gray-100 rounded-md font-semibold">
              {formData.quantity && formData.unitPrice 
                ? (parseInt(formData.quantity) * parseFloat(formData.unitPrice)).toLocaleString()
                : '0'
              } GNF
            </div>
          </div>
          <div>
            <Label htmlFor="paymentMethod">Mode de paiement</Label>
            <Select onValueChange={(value) => setFormData({...formData, paymentMethod: value})} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Orange Money">Orange Money</SelectItem>
                <SelectItem value="MTN Mobile Money">MTN Mobile Money</SelectItem>
                <SelectItem value="Carte Visa">Carte Visa</SelectItem>
                <SelectItem value="Espèce (cash)">Espèce (cash)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Créer la vente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SellHarvestModal;
