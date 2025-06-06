
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ModifyHarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  harvest: any;
  onModify: () => void;
}

const ModifyHarvestModal = ({ isOpen, onClose, harvest, onModify }: ModifyHarvestModalProps) => {
  const [formData, setFormData] = useState({
    quantity: '',
    unitPrice: '',
    quality: '',
    storageLocation: ''
  });

  useEffect(() => {
    if (harvest) {
      setFormData({
        quantity: harvest.quantity?.toString() || '',
        unitPrice: harvest.unitPrice?.toString() || '',
        quality: harvest.quality || '',
        storageLocation: harvest.storageLocation || ''
      });
    }
  }, [harvest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!harvest) return;

    // Simuler la modification
    console.log('Récolte modifiée:', {
      id: harvest.id,
      ...formData,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      totalValue: parseInt(formData.quantity) * parseFloat(formData.unitPrice)
    });

    onModify();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier la récolte</DialogTitle>
          <DialogDescription>
            Modifier les informations de la récolte du {harvest?.fieldName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="quantity">Quantité (kg)</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
            <Label>Nouvelle valeur totale</Label>
            <div className="px-3 py-2 bg-gray-100 rounded-md font-semibold">
              {formData.quantity && formData.unitPrice 
                ? (parseInt(formData.quantity) * parseFloat(formData.unitPrice)).toLocaleString()
                : '0'
              } GNF
            </div>
          </div>
          <div>
            <Label htmlFor="quality">Qualité</Label>
            <Select onValueChange={(value) => setFormData({...formData, quality: value})} value={formData.quality}>
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
          <div>
            <Label htmlFor="storageLocation">Lieu de stockage</Label>
            <Select onValueChange={(value) => setFormData({...formData, storageLocation: value})} value={formData.storageLocation}>
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Sauvegarder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyHarvestModal;
