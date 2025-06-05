
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, CreditCard } from 'lucide-react';

interface ClientHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
}

const ClientHistoryModal = ({ isOpen, onClose, client }: ClientHistoryModalProps) => {
  const historyData = [
    { 
      date: '2024-05-20', 
      type: 'Commande', 
      details: 'Achat de 500kg de gros calibre', 
      amount: 12500000,
      status: 'Payé'
    },
    { 
      date: '2024-05-15', 
      type: 'Commande', 
      details: 'Achat de 300kg de calibre moyen', 
      amount: 7500000,
      status: 'Payé'
    },
    { 
      date: '2024-05-10', 
      type: 'Paiement', 
      details: 'Paiement via Orange Money', 
      amount: 8000000,
      status: 'Reçu'
    },
    { 
      date: '2024-05-05', 
      type: 'Commande', 
      details: 'Achat de 400kg de petit calibre (25-35mm)', 
      amount: 8000000,
      status: 'En attente'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Payé':
        return <Badge className="bg-green-100 text-green-800">Payé</Badge>;
      case 'En attente':
        return <Badge className="bg-amber-100 text-amber-800">En attente</Badge>;
      case 'Reçu':
        return <Badge className="bg-blue-100 text-blue-800">Reçu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Commande':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'Paiement':
        return <CreditCard className="h-4 w-4 text-green-600" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Historique - {client?.name}</DialogTitle>
          <DialogDescription>
            Historique complet des transactions et commandes du client.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {historyData.map((entry, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(entry.type)}
                  <div>
                    <p className="font-medium text-gray-900">{entry.type}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                {getStatusBadge(entry.status)}
              </div>
              <p className="text-sm text-gray-700 mb-2">{entry.details}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-green-600">
                  {entry.amount.toLocaleString()} GNF
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{historyData.length}</p>
              <p className="text-sm text-gray-600">Transactions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {historyData.reduce((sum, entry) => sum + entry.amount, 0).toLocaleString()} GNF
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {historyData.filter(entry => entry.status === 'En attente').length}
              </p>
              <p className="text-sm text-gray-600">En attente</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientHistoryModal;
