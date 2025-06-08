
import React from 'react';

interface CreateSaleProps {
  onBack: () => void;
  onSave: (sale: any) => void;
}

const CreateSale = ({ onBack, onSave }: CreateSaleProps) => {
  return (
    <div>
      {/* Placeholder - vous pouvez importer le contenu du fichier CreateSale existant */}
      <h1>Créer une vente</h1>
      <button onClick={onBack}>Retour</button>
    </div>
  );
};

export default CreateSale;
