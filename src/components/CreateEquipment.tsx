
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { useCreateEquipment } from '@/hooks/useEquipment';

interface CreateEquipmentProps {
  onBack: () => void;
  onSave: (equipment: any) => void;
}

interface FormData {
  name: string;
  type: string;
  status: string;
  acquisitionDate: string;
  lastMaintenance: string;
  nextMaintenance: string;
  value: number;
  description: string;
  caracteristique: string;
  dateMiseService: string;
  dureeAmortissement: number;
  quantite: number;
}

const CreateEquipment = ({ onBack, onSave }: CreateEquipmentProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      status: 'Opérationnel'
    }
  });
  const createEquipmentMutation = useCreateEquipment();
  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    console.log('Creating equipment:', data);
    
    try {
      const newEquipment = {
        name: data.name,
        type: data.type,
        status: data.status,
        acquisitionDate: data.acquisitionDate,
        lastMaintenance: data.lastMaintenance,
        nextMaintenance: data.nextMaintenance,
        value: data.value,
        description: data.description,
        caracteristique: data.caracteristique,
        dateMiseService: data.dateMiseService,
        dureeAmortissement: data.dureeAmortissement,
        quantite: data.quantite
      };
      
      await createEquipmentMutation.mutateAsync(newEquipment);
      onSave(newEquipment);
      onBack();
    } catch (error) {
      console.error('Error creating equipment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvel équipement</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'équipement</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvel équipement</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de l'équipement *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Le nom de l\'équipement est requis' })}
                  placeholder="Ex: Tracteur John Deere 5050E"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="type">Type d'équipement *</Label>
                <Select onValueChange={(value) => setValue('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tracteur">Tracteur</SelectItem>
                    <SelectItem value="Labour">Équipement de labour</SelectItem>
                    <SelectItem value="Irrigation">Irrigation</SelectItem>
                    <SelectItem value="Récolte">Récolte</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Traitement">Traitement phytosanitaire</SelectItem>
                    <SelectItem value="Autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {!watchedValues.type && <p className="text-red-500 text-sm mt-1">Le type est requis</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="value">Valeur (GNF) *</Label>
                <Input
                  id="value"
                  type="number"
                  {...register('value', { 
                    required: 'La valeur est requise',
                    min: { value: 0, message: 'La valeur doit être positive' }
                  })}
                  placeholder="Ex: 25000000"
                />
                {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>}
              </div>
              <div>
                <Label htmlFor="quantite">Quantité *</Label>
                <Input
                  id="quantite"
                  type="number"
                  {...register('quantite', { 
                    required: 'La quantité est requise',
                    min: { value: 1, message: 'La quantité doit être supérieure à 0' }
                  })}
                  placeholder="Ex: 1"
                />
                {errors.quantite && <p className="text-red-500 text-sm mt-1">{errors.quantite.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Statut *</Label>
                <Select onValueChange={(value) => setValue('status', value)} value={watchedValues.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Opérationnel">Opérationnel</SelectItem>
                    <SelectItem value="En maintenance">En maintenance</SelectItem>
                    <SelectItem value="Hors service">Hors service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dureeAmortissement">Durée d'amortissement (années)</Label>
                <Input
                  id="dureeAmortissement"
                  type="number"
                  {...register('dureeAmortissement', { 
                    min: { value: 1, message: 'La durée doit être supérieure à 0' }
                  })}
                  placeholder="Ex: 10"
                />
                {errors.dureeAmortissement && <p className="text-red-500 text-sm mt-1">{errors.dureeAmortissement.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="acquisitionDate">Date d'acquisition *</Label>
                <Input
                  id="acquisitionDate"
                  type="date"
                  {...register('acquisitionDate', { required: 'La date d\'acquisition est requise' })}
                />
                {errors.acquisitionDate && <p className="text-red-500 text-sm mt-1">{errors.acquisitionDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="dateMiseService">Date de mise en service</Label>
                <Input
                  id="dateMiseService"
                  type="date"
                  {...register('dateMiseService')}
                />
              </div>
              <div>
                <Label htmlFor="lastMaintenance">Dernière maintenance</Label>
                <Input
                  id="lastMaintenance"
                  type="date"
                  {...register('lastMaintenance')}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nextMaintenance">Prochaine maintenance</Label>
              <Input
                id="nextMaintenance"
                type="date"
                {...register('nextMaintenance')}
              />
            </div>

            <div>
              <Label htmlFor="caracteristique">Caractéristiques techniques</Label>
              <Textarea
                id="caracteristique"
                {...register('caracteristique')}
                placeholder="Puissance, dimensions, capacité, etc."
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Description de l'équipement, utilisation..."
                rows={3}
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Création...' : 'Créer l\'équipement'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEquipment;
