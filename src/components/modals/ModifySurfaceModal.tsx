
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateSurface, Surface } from '@/hooks/useSurfaces';

interface ModifySurfaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  surface: Surface | null;
}

interface FormData {
  name: string;
  size: number;
  location: string;
  soilType: string;
  status: string;
  description?: string;
}

const ModifySurfaceModal = ({ isOpen, onClose, surface }: ModifySurfaceModalProps) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<FormData>();
  const updateSurfaceMutation = useUpdateSurface();
  const watchedValues = watch();

  useEffect(() => {
    if (surface) {
      reset({
        name: surface.name,
        size: surface.size,
        location: surface.location,
        soilType: surface.soilType,
        status: surface.status,
        description: surface.description || ''
      });
    }
  }, [surface, reset]);

  const onSubmit = async (data: FormData) => {
    if (!surface?._id) return;

    console.log('Updating surface:', data);
    
    try {
      await updateSurfaceMutation.mutateAsync({
        id: surface._id,
        data: {
          name: data.name,
          size: data.size,
          location: data.location,
          soilType: data.soilType,
          status: data.status,
          description: data.description
        }
      });
      onClose();
    } catch (error) {
      console.error('Error updating surface:', error);
    }
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
        
        {surface && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom de la parcelle *</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Le nom est requis' })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="size">Superficie (ha) *</Label>
                <Input
                  id="size"
                  type="number"
                  step="0.1"
                  {...register('size', { 
                    required: 'La superficie est requise',
                    min: { value: 0.1, message: 'La superficie doit être supérieure à 0' }
                  })}
                />
                {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size.message}</p>}
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                {...register('location', { required: 'La localisation est requise' })}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilType">Type de sol *</Label>
                <Select onValueChange={(value) => setValue('soilType', value)} value={watchedValues.soilType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Limoneux">Limoneux</SelectItem>
                    <SelectItem value="Argilo-limoneux">Argilo-limoneux</SelectItem>
                    <SelectItem value="Sableux">Sableux</SelectItem>
                    <SelectItem value="Argileux">Argileux</SelectItem>
                    <SelectItem value="Sablo-limoneux">Sablo-limoneux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Statut *</Label>
                <Select onValueChange={(value) => setValue('status', value)} value={watchedValues.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Disponible">Disponible</SelectItem>
                    <SelectItem value="Cultivée">Cultivée</SelectItem>
                    <SelectItem value="En repos">En repos</SelectItem>
                    <SelectItem value="En préparation">En préparation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Description de la surface..."
                rows={3}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ModifySurfaceModal;
