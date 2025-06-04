
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar } from 'lucide-react';

const Sales = () => {
  const [sales, setSales] = useState([
    {
      id: 1,
      clientName: 'Restaurant Le Jardin',
      product: 'Pommes de terre Charlotte',
      quantity: 500,
      unitPrice: 2.4,
      totalAmount: 1200,
      saleDate: '2024-05-20',
      paymentStatus: 'Payé',
      paymentMethod: 'Virement'
    },
    {
      id: 2,
      clientName: 'Supermarché Delhaize',
      product: 'Pommes de terre Bintje',
      quantity: 800,
      unitPrice: 1.8,
      totalAmount: 1440,
      saleDate: '2024-05-18',
      paymentStatus: 'En attente',
      paymentMethod: 'Crédit 30j'
    },
    {
      id: 3,
      clientName: 'Coopérative Locale',
      product: 'Pommes de terre Désirée',
      quantity: 1200,
      unitPrice: 2.0,
      totalAmount: 2400,
      saleDate: '2024-05-15',
      paymentStatus: 'Payé',
      paymentMethod: 'Espèces'
    },
    {
      id: 4,
      clientName: 'Ferme Biologique Nord',
      product: 'Pommes de terre Charlotte Bio',
      quantity: 300,
      unitPrice: 3.2,
      totalAmount: 960,
      saleDate: '2024-05-12',
      paymentStatus: 'Retard',
      paymentMethod: 'Chèque'
    }
  ]);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Payé': return 'default';
      case 'En attente': return 'secondary';
      case 'Retard': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTotalStats = () => {
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const paidSales = sales.filter(sale => sale.paymentStatus === 'Payé');
    const pendingSales = sales.filter(sale => sale.paymentStatus === 'En attente');
    const overdueSales = sales.filter(sale => sale.paymentStatus === 'Retard');
    
    return {
      totalRevenue,
      paidAmount: paidSales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      pendingAmount: pendingSales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      overdueAmount: overdueSales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      totalQuantity: sales.reduce((sum, sale) => sum + sale.quantity, 0)
    };
  };

  const stats = getTotalStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ventes</h1>
          <p className="text-gray-600 mt-1">Suivi de vos ventes et facturation</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle vente
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">€{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">CA total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.totalQuantity} kg</p>
              <p className="text-sm text-gray-600">Quantité vendue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">€{stats.pendingAmount}</p>
              <p className="text-sm text-gray-600">En attente</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">€{stats.overdueAmount}</p>
              <p className="text-sm text-gray-600">En retard</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales List */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des ventes</CardTitle>
          <CardDescription>Liste de toutes vos ventes récentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sales.map((sale) => (
              <div key={sale.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{sale.clientName}</h3>
                      <p className="text-gray-600">{sale.product}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(sale.saleDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">€{sale.totalAmount}</p>
                    <p className="text-sm text-gray-600">
                      {sale.quantity} kg × €{sale.unitPrice}
                    </p>
                    <Badge variant={getPaymentStatusColor(sale.paymentStatus)} className="mt-1">
                      {sale.paymentStatus}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between pt-3 border-t">
                  <div className="text-sm text-gray-600">
                    Mode de paiement: <span className="font-medium">{sale.paymentMethod}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                    {sale.paymentStatus !== 'Payé' && (
                      <Button variant="outline" size="sm">
                        Marquer payé
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
