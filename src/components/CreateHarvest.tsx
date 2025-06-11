
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useCreateHarvest } from '@/hooks/useHarvests';
import { useFields } from '@/hooks/useFields';

interface CreateHarvestProps {
  onBack: () => void;
  onSave: (harvest: any) => void;
}

interface FormData {
  fieldName: string;
  variety: string;
  harvestDate: string;
  quantity: number;
  quality: string;
  storageLocation: string;
  unitPrice: number;
}

const CreateHarvest = ({ onBack, onSave }: CreateHarvestProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const createHarvestMutation = useCreateHarvest();
  const { data: fields = [] } = useFields();
  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    console.log('Creating harvest:', data);
    
    try {
      const newHarvest = {
        fieldName: data.fieldName,
        variety: data.variety,
        harvestDate: data.harvestDate,
        quantity: data.quantity,
        quality: data.quality,
        storageLocation: data.storageLocation,
        unitPrice: data.unitPrice,
        totalValue: data.quantity * data.unitPrice,
        sold: 0,
        inStock: data.quantity
      };
      
      await createHarvestMutation.mutateAsync(newHarvest);
      onSave(newHarvest);
      onBack();
    } catch (error) {
      console.error('Error creating harvest:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle récolte</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la récolte</CardTitle>
          <CardDescription>Enregistrez une nouvelle récolte</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fieldName">Champ récolté *</Label>
                <Select onValueChange={(value) => setValue('fieldName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le champ" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((field: any) => (
                      <SelectItem key={field._id} value={field.name}>
                        {field.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!watchedValues.fieldName && <p className="text-red-500 text-sm mt-1">Le champ est requis</p>}
              </div>
              <div>
                <Label htmlFor="variety">Calibre *</Label>
                <Select onValueChange={(value) => setValue('variety', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le calibre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petit calibre (25-35mm)">Petit calibre (25-35mm)</SelectItem>
                    <SelectItem value="Calibre moyen">Calibre moyen</SelectItem>
                    <SelectItem value="Gros calibre">Gros calibre</SelectItem>
                  </SelectContent>
                </Select>
                {!watchedValues.variety && <p className="text-red-500 text-sm mt-1">Le calibre est requis</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="quantity">Quantité récoltée (kg) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  {...register('quantity', { 
                    required: 'La quantité est requise',
                    min: { value: 1, message: 'La quantité doit être supérieure à 0' }
                  })}
                  placeholder="Ex: 2800"
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
              </div>
              <div>
                <Label htmlFor="unitPrice">Prix unitaire (GNF/kg)</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  {...register('unitPrice', { 
                    min: { value: 0, message: 'Le prix doit être positif' }
                  })}
                  placeholder="Ex: 25000"
                />
                {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice.message}</p>}
              </div>
              <div>
                <Label>Valeur totale (GNF)</Label>
                <div className="px-3 py-2 bg-gray-100 rounded-md text-lg font-semibold">
                  {watchedValues.quantity && watchedValues.unitPrice 
                    ? (watchedValues.quantity * watchedValues.unitPrice).toLocaleString()
                    : '0'
                  } GNF
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="harvestDate">Date de récolte *</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  {...register('harvestDate', { required: 'La date de récolte est requise' })}
                />
                {errors.harvestDate && <p className="text-red-500 text-sm mt-1">{errors.harvestDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="quality">Qualité *</Label>
                <Select onValueChange={(value) => setValue('quality', value)}>
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
                {!watchedValues.quality && <p className="text-red-500 text-sm mt-1">La qualité est requise</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="storageLocation">Lieu de stockage</Label>
              <Select onValueChange={(value) => setValue('storageLocation', value)}>
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

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enregistrement...' : 'Enregistrer la récolte'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateHarvest;
