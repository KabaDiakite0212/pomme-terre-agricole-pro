
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useCreateField } from '@/hooks/useFields';
import { useSurfaces } from '@/hooks/useSurfaces';

enum SaisonEnum {
  GrandeCompagne = 'Novembre-Avril',
  Hyvernal = 'Mai-Août',
  InterSaison = 'Septembre-Novembre',
}

interface CreateFieldProps {
  onBack: () => void;
  onSave: (field: any) => void;
}

interface FormData {
  name: string;
  surfaceId: string;
  variety: string;
  plantDate: string;
  density: string;
  area: number;
  saison: string;
}

const CreateField = ({ onBack, onSave }: CreateFieldProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const createFieldMutation = useCreateField();
  const { data: surfaces = [] } = useSurfaces();
  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    console.log('Creating field:', data);
    
    try {
      const newField = {
        name: data.name,
        surfaceId: data.surfaceId,
        variety: data.variety,
        plantDate: data.plantDate,
        density: data.density,
        stage: 'Plantation',
        progress: 5,
        area: data.area,
        saison: data.saison
      };
      
      await createFieldMutation.mutateAsync(newField);
      onSave(newField);
      onBack();
    } catch (error) {
      console.error('Error creating field:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouveau champ de pommes de terre</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations du champ</CardTitle>
          <CardDescription>Remplissez les détails de votre nouveau champ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom du champ *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Le nom du champ est requis' })}
                  placeholder="Ex: Champ A1"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="surfaceId">Surface agricole *</Label>
                <Select onValueChange={(value) => setValue('surfaceId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la surface" />
                  </SelectTrigger>
                  <SelectContent>
                    {surfaces.map((surface: any) => (
                      <SelectItem key={surface._id} value={surface._id}>
                        {surface.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {!watchedValues.surfaceId && <p className="text-red-500 text-sm mt-1">La surface est requise</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="variety">Calibre des pommes de terre *</Label>
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
              </div>
              <div>
                <Label htmlFor="area">Superficie du champ (ha) *</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.1"
                  {...register('area', { 
                    required: 'La superficie est requise',
                    min: { value: 0.1, message: 'La superficie doit être supérieure à 0' }
                  })}
                  placeholder="Ex: 4.2"
                />
                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="plantDate">Date de plantation *</Label>
                <Input
                  id="plantDate"
                  type="date"
                  {...register('plantDate', { required: 'La date de plantation est requise' })}
                />
                {errors.plantDate && <p className="text-red-500 text-sm mt-1">{errors.plantDate.message}</p>}
              </div>
              <div>
                <Label htmlFor="saison">Saison *</Label>
                <Select onValueChange={(value) => setValue('saison', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la saison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SaisonEnum.GrandeCompagne}>Grande campagne (Novembre-Avril)</SelectItem>
                    <SelectItem value={SaisonEnum.Hyvernal}>Hivernal (Mai-Août)</SelectItem>
                    <SelectItem value={SaisonEnum.InterSaison}>Inter-saison (Septembre-Novembre)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="density">Densité de semis *</Label>
              <Input
                id="density"
                {...register('density', { required: 'La densité de semis est requise' })}
                placeholder="Ex: 35,000 plants/ha"
              />
              {errors.density && <p className="text-red-500 text-sm mt-1">{errors.density.message}</p>}
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
                {isSubmitting ? 'Création...' : 'Créer le champ'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateField;
