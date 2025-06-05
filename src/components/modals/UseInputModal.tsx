
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UseInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  input: any;
  onUse: (useData: any) => void;
}

const UseInputModal = ({ isOpen, onClose, input, onUse }: UseInputModalProps) => {
  const [formData, setFormData] = useState({
    field: '',
    quantity: '',
    usageDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const useData = {
      inputId: input.id,
      field: formData.field,
      quantity: parseFloat(formData.quantity),
      usageDate: formData.usageDate,
      notes: formData.notes
    };
    onUse(useData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Utiliser l'intrant</DialogTitle>
          <DialogDescription>
            Enregistrer l'utilisation de {input?.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="field">Champ d'application</Label>
            <Select onValueChange={(value) => setFormData({...formData, field: value})}>
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
            <Label htmlFor="quantity">Quantité utilisée ({input?.unit})</Label>
            <Input
              id="quantity"
              type="number"
              step="0.1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder={`Stock disponible: ${input?.stock} ${input?.unit}`}
              max={input?.stock}
              required
            />
          </div>
          <div>
            <Label htmlFor="usageDate">Date d'utilisation</Label>
            <Input
              id="usageDate"
              type="date"
              value={formData.usageDate}
              onChange={(e) => setFormData({ ...formData, usageDate: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observations, dosage, etc."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Confirmer l'utilisation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UseInputModal;
