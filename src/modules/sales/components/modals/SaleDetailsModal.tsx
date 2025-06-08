
import React from 'react';

interface SaleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

const SaleDetailsModal = ({ isOpen, onClose, sale }: SaleDetailsModalProps) => {
  if (!isOpen || !sale) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Détails de la vente</h2>
        <p>Client: {sale.clientName}</p>
        <p>Produit: {sale.product}</p>
        <p>Montant: {sale.totalAmount.toLocaleString()} GNF</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Fermer
        </button>
      </div>
    </div>
  );
};

export default SaleDetailsModal;
