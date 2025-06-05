
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BuyInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: any;
  onBuy: (buyData: any) => void;
}

const BuyInputModal = ({ isOpen, onClose, input, onBuy }: BuyInputModalProps) => {
  const [formData, setFormData] = useState({
    supplier: '',
    quantity: '',
    unitPrice: '',
    paymentMethod: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const buyData = {
      inputId: input.id,
      supplier: formData.supplier,
      quantity: parseFloat(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      totalCost: parseFloat(formData.quantity) * parseFloat(formData.unitPrice),
      paymentMethod: formData.paymentMethod,
      purchaseDate: formData.purchaseDate
    };
    onBuy(buyData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Acheter l'intrant</DialogTitle>
          <DialogDescription>
            Enregistrer un achat de {input?.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="supplier">Fournisseur</Label>
            <Select onValueChange={(value) => setFormData({...formData, supplier: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le fournisseur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agrofournitures Conakry">Agrofournitures Conakry</SelectItem>
                <SelectItem value="Coopérative Agricole">Coopérative Agricole</SelectItem>
                <SelectItem value="Distributeur Local">Distributeur Local</SelectItem>
                <SelectItem value="Import Guinée">Import Guinée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantité ({input?.unit})</Label>
            <Input
              id="quantity"
              type="number"
              step="0.1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="unitPrice">Prix unitaire (GNF)</Label>
            <Input
              id="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Coût total</Label>
            <div className="px-3 py-2 bg-gray-100 rounded-md font-semibold">
              {formData.quantity && formData.unitPrice 
                ? (parseFloat(formData.quantity) * parseFloat(formData.unitPrice)).toLocaleString()
                : '0'
              } GNF
            </div>
          </div>
          <div>
            <Label htmlFor="paymentMethod">Mode de paiement</Label>
            <Select onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
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
          <div>
            <Label htmlFor="purchaseDate">Date d'achat</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirmer l'achat
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BuyInputModal;
