import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Sparkles } from 'lucide-react';

const AIAssistantPage = () => {
  return (
    <div className="py-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-500" />
            <div>
              <CardTitle>Assistant IA pour Rapports</CardTitle>
              <CardDescription>
                Utilisez l'intelligence artificielle pour générer des rapports détaillés à partir de vos notes ou observations
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-6 mb-6">
              <Sparkles className="h-12 w-12 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Fonctionnalité en développement</h2>
            <p className="text-muted-foreground max-w-md mb-4">
              Notre équipe travaille actuellement sur cette fonctionnalité innovante qui vous permettra de générer des rapports complets à partir de vos observations ou notes cliniques.
            </p>
            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
              Disponible prochainement
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistantPage; 