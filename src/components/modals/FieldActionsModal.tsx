
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Droplets, Bug, Calendar, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FieldActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: any;
}

const FieldActionsModal = ({ isOpen, onClose, field }: FieldActionsModalProps) => {
  const { toast } = useToast();
  const [actionData, setActionData] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    quantity: '',
    product: '',
    notes: ''
  });

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Action enregistrée",
      description: `${actionData.type} programmée pour le champ ${field?.name}`,
    });
    setActionData({
      type: '',
      date: new Date().toISOString().split('T')[0],
      quantity: '',
      product: '',
      notes: ''
    });
    onClose();
  };

  if (!field) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sprout className="h-5 w-5 text-green-600" />
            <span>Actions - {field.name}</span>
          </DialogTitle>
          <DialogDescription>
            Planifier et exécuter des actions sur le champ
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="irrigation" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="irrigation" className="text-xs">
              <Droplets className="h-4 w-4 mr-1" />
              Irrigation
            </TabsTrigger>
            <TabsTrigger value="traitement" className="text-xs">
              <Bug className="h-4 w-4 mr-1" />
              Traitement
            </TabsTrigger>
            <TabsTrigger value="fertilisation" className="text-xs">
              <Sprout className="h-4 w-4 mr-1" />
              Fertilisation
            </TabsTrigger>
            <TabsTrigger value="entretien" className="text-xs">
              <Calendar className="h-4 w-4 mr-1" />
              Entretien
            </TabsTrigger>
          </TabsList>

          <TabsContent value="irrigation" className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Planifier l'irrigation</h4>
              <form onSubmit={handleSubmitAction} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="date">Date prévue</Label>
                    <Input
                      id="date"
                      type="date"
                      value={actionData.date}
                      onChange={(e) => setActionData({...actionData, date: e.target.value, type: 'Irrigation'})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantité d'eau (L/m²)</Label>
                    <Input
                      id="quantity"
                      placeholder="Ex: 25"
                      value={actionData.quantity}
                      onChange={(e) => setActionData({...actionData, quantity: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Observations particulières..."
                    value={actionData.notes}
                    onChange={(e) => setActionData({...actionData, notes: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Programmer l'irrigation
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="traitement" className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Planifier un traitement</h4>
              <form onSubmit={handleSubmitAction} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="product">Type de traitement</Label>
                    <Select onValueChange={(value) => setActionData({...actionData, product: value, type: 'Traitement'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fongicide">Fongicide</SelectItem>
                        <SelectItem value="insecticide">Insecticide</SelectItem>
                        <SelectItem value="herbicide">Herbicide</SelectItem>
                        <SelectItem value="preventif">Préventif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date prévue</Label>
                    <Input
                      id="date"
                      type="date"
                      value={actionData.date}
                      onChange={(e) => setActionData({...actionData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Dosage</Label>
                  <Input
                    placeholder="Ex: 2L/ha"
                    value={actionData.quantity}
                    onChange={(e) => setActionData({...actionData, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    placeholder="Problème observé, produit utilisé..."
                    value={actionData.notes}
                    onChange={(e) => setActionData({...actionData, notes: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Programmer le traitement
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="fertilisation" className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Planifier la fertilisation</h4>
              <form onSubmit={handleSubmitAction} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="product">Type d'engrais</Label>
                    <Select onValueChange={(value) => setActionData({...actionData, product: value, type: 'Fertilisation'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="npk">NPK (15-15-15)</SelectItem>
                        <SelectItem value="uree">Urée</SelectItem>
                        <SelectItem value="compost">Compost organique</SelectItem>
                        <SelectItem value="potasse">Sulfate de potasse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date prévue</Label>
                    <Input
                      id="date"
                      type="date"
                      value={actionData.date}
                      onChange={(e) => setActionData({...actionData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantité (kg/ha)</Label>
                  <Input
                    placeholder="Ex: 200"
                    value={actionData.quantity}
                    onChange={(e) => setActionData({...actionData, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    placeholder="Méthode d'application, conditions..."
                    value={actionData.notes}
                    onChange={(e) => setActionData({...actionData, notes: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Programmer la fertilisation
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="entretien" className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2">Planifier l'entretien</h4>
              <form onSubmit={handleSubmitAction} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="product">Type d'entretien</Label>
                    <Select onValueChange={(value) => setActionData({...actionData, product: value, type: 'Entretien'})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="binage">Binage</SelectItem>
                        <SelectItem value="buttage">Buttage</SelectItem>
                        <SelectItem value="desherbage">Désherbage manuel</SelectItem>
                        <SelectItem value="inspection">Inspection générale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date prévue</Label>
                    <Input
                      id="date"
                      type="date"
                      value={actionData.date}
                      onChange={(e) => setActionData({...actionData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    placeholder="Détails de l'intervention..."
                    value={actionData.notes}
                    onChange={(e) => setActionData({...actionData, notes: e.target.value})}
                  />
                </div>
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                  Programmer l'entretien
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <AlertTriangle className="h-4 w-4" />
            <p>Les actions programmées seront ajoutées au planning du champ</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FieldActionsModal;
