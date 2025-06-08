
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, MapPin, Grid, Layers } from 'lucide-react';
import CasesManagement from './conservation/CasesManagement';
import TapisManagement from './conservation/TapisManagement';
import LignesManagement from './conservation/LignesManagement';
import ConservationAssignment from './conservation/ConservationAssignment';
import ConservationOverview from './conservation/ConservationOverview';

const Conservation = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion de la Chambre Froide</h1>
          <p className="text-gray-600 mt-2">Administration des conservations et emplacements</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Package className="h-4 w-4" />
            <span>Vue d'ensemble</span>
          </TabsTrigger>
          <TabsTrigger value="cases" className="flex items-center space-x-2">
            <Grid className="h-4 w-4" />
            <span>Cases</span>
          </TabsTrigger>
          <TabsTrigger value="tapis" className="flex items-center space-x-2">
            <Layers className="h-4 w-4" />
            <span>Tapis</span>
          </TabsTrigger>
          <TabsTrigger value="lignes" className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Lignes</span>
          </TabsTrigger>
          <TabsTrigger value="assignment" className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Assignation</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <ConservationOverview />
        </TabsContent>

        <TabsContent value="cases" className="mt-6">
          <CasesManagement />
        </TabsContent>

        <TabsContent value="tapis" className="mt-6">
          <TapisManagement />
        </TabsContent>

        <TabsContent value="lignes" className="mt-6">
          <LignesManagement />
        </TabsContent>

        <TabsContent value="assignment" className="mt-6">
          <ConservationAssignment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Conservation;
