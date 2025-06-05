
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ModifySurfaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  surface: any;
  onSave: (updatedSurface: any) => void;
}

const ModifySurfaceModal = ({ isOpen, onClose, surface, onSave }: ModifySurfaceModalProps) => {
  const [formData, setFormData] = useState({
    name: surface?.name || '',
    area: surface?.area || '',
    location: surface?.location || '',
    soilType: surface?.soilType || '',
    status: surface?.status || '',
    lastCrop: surface?.lastCrop || '',
    waterDistance: surface?.waterDistance || '',
    isFenced: surface?.isFenced || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      ...surface, 
      ...formData, 
      area: parseFloat(formData.area),
      waterDistance: parseFloat(formData.waterDistance)
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier la surface</DialogTitle>
          <DialogDescription>
            Modifiez les informations de la surface agricole.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom de la parcelle</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="area">Superficie (ha)</Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="soilType">Type de sol</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, soilType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={formData.soilType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Limoneux">Limoneux</SelectItem>
                  <SelectItem value="Argilo-limoneux">Argilo-limoneux</SelectItem>
                  <SelectItem value="Sableux">Sableux</SelectItem>
                  <SelectItem value="Argileux">Argileux</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="waterDistance">Distance source d'eau (m)</Label>
              <Input
                id="waterDistance"
                type="number"
                value={formData.waterDistance}
                onChange={(e) => setFormData({ ...formData, waterDistance: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={formData.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cultivée">Cultivée</SelectItem>
                  <SelectItem value="En repos">En repos</SelectItem>
                  <SelectItem value="En préparation">En préparation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="lastCrop">Dernière culture</Label>
              <Input
                id="lastCrop"
                value={formData.lastCrop}
                onChange={(e) => setFormData({ ...formData, lastCrop: e.target.value })}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="isFenced"
              checked={formData.isFenced}
              onCheckedChange={(checked) => setFormData({ ...formData, isFenced: checked })}
            />
            <Label htmlFor="isFenced">Surface clôturée</Label>
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

export default ModifySurfaceModal;
