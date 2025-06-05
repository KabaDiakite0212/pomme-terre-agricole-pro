
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Package, CreditCard } from 'lucide-react';

interface SaleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

const SaleDetailsModal = ({ isOpen, onClose, sale }: SaleDetailsModalProps) => {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'default';
      case 'En attente': return 'secondary';
      case 'Retard': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Détails de la vente</DialogTitle>
          <DialogDescription>
            Informations complètes sur cette transaction
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{sale?.clientName}</h3>
              <p className="text-gray-600">{sale?.product}</p>
            </div>
            <Badge variant={getPaymentStatusColor(sale?.paymentStatus)}>
              {sale?.paymentStatus}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Date de vente</span>
              </div>
              <p className="font-medium">
                {new Date(sale?.saleDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Package className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Quantité</span>
              </div>
              <p className="font-medium">{sale?.quantity} kg</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm text-gray-600">Prix unitaire</span>
              <p className="font-medium">{sale?.unitPrice?.toLocaleString()} GNF/kg</p>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-gray-600">Montant total</span>
              <p className="text-xl font-bold text-green-600">
                {sale?.totalAmount?.toLocaleString()} GNF
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Mode de paiement</span>
            </div>
            <p className="font-medium">{sale?.paymentMethod}</p>
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaleDetailsModal;
