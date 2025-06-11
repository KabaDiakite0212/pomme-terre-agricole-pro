
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useCreateInput } from '@/hooks/useInputs';

interface CreateInputProps {
  onBack: () => void;
  onSave: (input: any) => void;
}

interface FormData {
  name: string;
  category: string;
  stock: number;
  unit: string;
  alertLevel: number;
  unitPrice: number;
  lastPurchase: string;
}

const CreateInput = ({ onBack, onSave }: CreateInputProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const createInputMutation = useCreateInput();
  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    console.log('Creating input:', data);
    
    try {
      const newInput = {
        name: data.name,
        category: data.category,
        stock: data.stock,
        unit: data.unit,
        alertLevel: data.alertLevel,
        totalValue: data.stock * data.unitPrice,
        lastPurchase: data.lastPurchase
      };
      
      await createInputMutation.mutateAsync(newInput);
      onSave(newInput);
      onBack();
    } catch (error) {
      console.error('Error creating input:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvel intrant</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'intrant</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvel intrant</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de l'intrant *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Le nom de l\'intrant est requis' })}
                  placeholder="Ex: Engrais NPK 15-15-15"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="category">Catégorie *</Label>
                <Select onValueChange={(value) => setValue('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engrais">Engrais</SelectItem>
                    <SelectItem value="Semences">Semences</SelectItem>
                    <SelectItem value="Phytosanitaire">Phytosanitaire</SelectItem>
                    <SelectItem value="Amendement">Amendement</SelectItem>
                    <SelectItem value="Fiente">Fiente</SelectItem>
                  </SelectContent>
                </Select>
                {!watchedValues.category && <p className="text-red-500 text-sm mt-1">La catégorie est requise</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stock">Stock initial *</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register('stock', { 
                    required: 'Le stock initial est requis',
                    min: { value: 0, message: 'Le stock doit être positif' }
                  })}
                  placeholder="Ex: 25"
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
              </div>
              <div>
                <Label htmlFor="unit">Unité *</Label>
                <Select onValueChange={(value) => setValue('unit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Unité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogrammes</SelectItem>
                    <SelectItem value="sacs 50kg">Sacs 50kg</SelectItem>
                    <SelectItem value="litres">Litres</SelectItem>
                    <SelectItem value="tonnes">Tonnes</SelectItem>
                    <SelectItem value="unités">Unités</SelectItem>
                  </SelectContent>
                </Select>
                {!watchedValues.unit && <p className="text-red-500 text-sm mt-1">L'unité est requise</p>}
              </div>
              <div>
                <Label htmlFor="alertLevel">Seuil d'alerte *</Label>
                <Input
                  id="alertLevel"
                  type="number"
                  {...register('alertLevel', { 
                    required: 'Le seuil d\'alerte est requis',
                    min: { value: 0, message: 'Le seuil doit être positif' }
                  })}
                  placeholder="Ex: 10"
                />
                {errors.alertLevel && <p className="text-red-500 text-sm mt-1">{errors.alertLevel.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unitPrice">Prix unitaire (GNF) *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  {...register('unitPrice', { 
                    required: 'Le prix unitaire est requis',
                    min: { value: 0, message: 'Le prix doit être positif' }
                  })}
                  placeholder="Ex: 100000"
                />
                {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastPurchase">Date d'achat</Label>
                <Input
                  id="lastPurchase"
                  type="date"
                  {...register('lastPurchase')}
                />
              </div>
            </div>

            {watchedValues.stock && watchedValues.unitPrice && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label>Valeur totale calculée</Label>
                <p className="text-2xl font-bold text-green-600">
                  {(watchedValues.stock * watchedValues.unitPrice).toLocaleString()} GNF
                </p>
              </div>
            )}

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Création...' : 'Créer l\'intrant'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateInput;
