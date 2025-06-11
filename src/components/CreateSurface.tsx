
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';
import { useCreateSurface, Surface } from '@/hooks/useSurfaces';

interface CreateSurfaceProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  size: number;
  location: string;
  soilType: string;
  description?: string;
  waterDistance?: number;
  isFenced: boolean;
}

const CreateSurface = ({ onBack }: CreateSurfaceProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: '',
      size: 0,
      location: '',
      soilType: '',
      description: '',
      waterDistance: 0,
      isFenced: false
    }
  });

  const createSurfaceMutation = useCreateSurface();
  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    console.log('Submitting surface data:', data);
    
    const surfaceData: Omit<Surface, '_id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      size: data.size,
      location: data.location,
      soilType: data.soilType,
      status: 'Disponible',
      description: data.description,
      notes: data.waterDistance ? `Distance source d'eau: ${data.waterDistance}m${data.isFenced ? ' - Clôturée' : ''}` : undefined
    };

    try {
      await createSurfaceMutation.mutateAsync(surfaceData);
      onBack();
    } catch (error) {
      console.error('Error creating surface:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle surface agricole</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de la surface</CardTitle>
          <CardDescription>Remplissez les détails de votre nouvelle surface agricole</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de la surface *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Le nom est requis' })}
                  placeholder="Ex: Parcelle Nord"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="size">Superficie (hectares) *</Label>
                <Input
                  id="size"
                  type="number"
                  step="0.1"
                  {...register('size', { 
                    required: 'La superficie est requise',
                    min: { value: 0.1, message: 'La superficie doit être supérieure à 0' }
                  })}
                  placeholder="Ex: 8.5"
                />
                {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                {...register('location', { required: 'La localisation est requise' })}
                placeholder="Ex: Secteur Kindia - Route de Mamou"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilType">Type de sol *</Label>
                <Select onValueChange={(value) => setValue('soilType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de sol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Argileux">Argileux</SelectItem>
                    <SelectItem value="Limoneux">Limoneux</SelectItem>
                    <SelectItem value="Sableux">Sableux</SelectItem>
                    <SelectItem value="Argilo-limoneux">Argilo-limoneux</SelectItem>
                    <SelectItem value="Sablo-limoneux">Sablo-limoneux</SelectItem>
                  </SelectContent>
                </Select>
                {errors.soilType && <p className="text-red-500 text-sm mt-1">Le type de sol est requis</p>}
              </div>
              <div>
                <Label htmlFor="waterDistance">Distance de la source d'eau (mètres)</Label>
                <Input
                  id="waterDistance"
                  type="number"
                  {...register('waterDistance')}
                  placeholder="Ex: 150"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isFenced"
                checked={watchedValues.isFenced}
                onCheckedChange={(checked) => setValue('isFenced', checked)}
              />
              <Label htmlFor="isFenced">Surface clôturée</Label>
            </div>

            <div>
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Description de la surface, particularités..."
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
                {isSubmitting ? 'Création...' : 'Créer la surface'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateSurface;
