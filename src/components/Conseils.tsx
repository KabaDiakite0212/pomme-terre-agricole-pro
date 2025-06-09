
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ApiService } from '@/services/api';
import { Plus, User, Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';

interface Conseil {
  _id: string;
  titre: string;
  contenu: string;
  auteur: string;
  categorie: string;
  dateCreation: string;
  tags: string[];
}

const Conseils = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    auteur: '',
    categorie: '',
    tags: ''
  });

  const queryClient = useQueryClient();

  const { data: conseils = [], isLoading } = useQuery({
    queryKey: ['conseils'],
    queryFn: ApiService.getConseils,
  });

  const createConseilMutation = useMutation({
    mutationFn: ApiService.createConseil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conseils'] });
      toast.success('Conseil ajouté avec succès');
      setShowForm(false);
      setFormData({ titre: '', contenu: '', auteur: '', categorie: '', tags: '' });
    },
    onError: () => {
      toast.error('Erreur lors de l\'ajout du conseil');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre || !formData.contenu || !formData.auteur) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    createConseilMutation.mutate({
      ...formData,
      tags: tagsArray
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categories = ['Fertilisation', 'Protection des cultures', 'Irrigation', 'Récolte', 'Stockage', 'Général'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Chargement des conseils...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Conseils Agronomiques</h1>
          <p className="text-gray-600 mt-2">Partagez et consultez des conseils d'experts en agriculture</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Conseil
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nouveau Conseil</CardTitle>
            <CardDescription>Partagez vos connaissances avec la communauté</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titre">Titre *</Label>
                  <Input
                    id="titre"
                    value={formData.titre}
                    onChange={(e) => handleInputChange('titre', e.target.value)}
                    placeholder="Titre du conseil"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="auteur">Auteur *</Label>
                  <Input
                    id="auteur"
                    value={formData.auteur}
                    onChange={(e) => handleInputChange('auteur', e.target.value)}
                    placeholder="Nom de l'agronome"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categorie">Catégorie</Label>
                  <select
                    id="categorie"
                    value={formData.categorie}
                    onChange={(e) => handleInputChange('categorie', e.target.value)}
                    className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="pomme de terre, fertilisant, bio"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contenu">Contenu *</Label>
                <Textarea
                  id="contenu"
                  value={formData.contenu}
                  onChange={(e) => handleInputChange('contenu', e.target.value)}
                  placeholder="Détaillez votre conseil..."
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createConseilMutation.isPending}>
                  {createConseilMutation.isPending ? 'Ajout...' : 'Publier'}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {conseils.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Aucun conseil disponible. Soyez le premier à partager !</p>
            </CardContent>
          </Card>
        ) : (
          conseils.map((conseil: Conseil) => (
            <Card key={conseil._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-green-800">{conseil.titre}</CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {conseil.auteur}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(conseil.dateCreation).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  {conseil.categorie && (
                    <Badge variant="secondary">{conseil.categorie}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{conseil.contenu}</p>
                {conseil.tags && conseil.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-gray-500" />
                    {conseil.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Conseils;
