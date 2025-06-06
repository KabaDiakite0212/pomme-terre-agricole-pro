
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { useSurfaceHistory } from '@/hooks/useSurfaceHistory';

interface SurfaceHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  surface: any;
}

const SurfaceHistoryModal = ({ isOpen, onClose, surface }: SurfaceHistoryModalProps) => {
  const { history } = useSurfaceHistory(surface?.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Historique - {surface?.name}</DialogTitle>
          <DialogDescription>
            Historique des activités sur cette surface agricole.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {new Date(entry.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <Badge 
                  variant={entry.action === 'Plantation' ? 'default' : 
                          entry.action === 'Récolte' ? 'secondary' : 'outline'}
                >
                  {entry.action}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 mb-1">{entry.details}</p>
              {entry.crop && (
                <p className="text-xs text-blue-600">Culture: {entry.crop}</p>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SurfaceHistoryModal;
