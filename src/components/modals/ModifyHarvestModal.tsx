
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
  onModify: (modifiedHarvest: any) => void;
}

const ModifyHarvestModal = ({ isOpen, onClose, harvest, onModify }: ModifyHarvestModalProps) => {
  const [formData, setFormData] = useState({
    fieldName: '',
    variety: '',
    harvestDate: '',
    quantity: '',
    quality: '',
    storageLocation: '',
    unitPrice: ''
  });

  useEffect(() => {
    if (harvest) {
      setFormData({
        fieldName: harvest.fieldName || '',
        variety: harvest.variety || '',
        harvestDate: harvest.harvestDate || '',
        quantity: harvest.quantity?.toString() || '',
        quality: harvest.quality || '',
        storageLocation: harvest.storageLocation || '',
        unitPrice: harvest.unitPrice?.toString() || ''
      });
    }
  }, [harvest]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const modifiedHarvest = {
      ...harvest,
      fieldName: formData.fieldName,
      variety: formData.variety,
      harvestDate: formData.harvestDate,
      quantity: parseInt(formData.quantity),
      quality: formData.quality,
      storageLocation: formData.storageLocation,
      unitPrice: parseFloat(formData.unitPrice),
      totalValue: parseInt(formData.quantity) * parseFloat(formData.unitPrice),
      inStock: harvest.inStock + (parseInt(formData.quantity) - harvest.quantity)
    };
    onModify(modifiedHarvest);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier la récolte</DialogTitle>
          <DialogDescription>
            Modifier les informations de la récolte du {harvest?.fieldName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fieldName">Champ récolté</Label>
              <Select value={formData.fieldName} onValueChange={(value) => setFormData({...formData, fieldName: value})}>
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
              <Label htmlFor="variety">Calibre</Label>
              <Select value={formData.variety} onValueChange={(value) => setFormData({...formData, variety: value})}>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="quantity">Quantité récoltée (kg)</Label>
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
                required
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
              <Label htmlFor="harvestDate">Date de récolte</Label>
              <Input
                id="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="quality">Qualité</Label>
              <Select value={formData.quality} onValueChange={(value) => setFormData({...formData, quality: value})}>
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
            <Select value={formData.storageLocation} onValueChange={(value) => setFormData({...formData, storageLocation: value})}>
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
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Modifier la récolte
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyHarvestModal;
