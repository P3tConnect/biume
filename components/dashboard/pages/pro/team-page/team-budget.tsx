import { Button, Card, CardContent, Separator } from "@/components/ui";
import { Check, Crown, Sparkles, Users } from "lucide-react";
import React from "react";
import AddMemberButton from "./add-member-button";

const CircularProgress = ({
  value,
  max,
  size = 120,
  strokeWidth = 12,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-10"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold">{percentage}%</span>
        <span className="text-sm opacity-80">Utilisé</span>
      </div>
    </div>
  );
};

const Feature = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-primary-foreground/90">
    <div className="rounded-full bg-primary-foreground/20 p-1">
      <Check className="h-3 w-3" />
    </div>
    <span className="text-sm">{children}</span>
  </div>
);

const TeamBudget = () => {
  const activeMembers = 5;
  const maxMembers = 10;

  return (
    <Card className="text-primary-foreground overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left section */}
          <div className="flex-1 p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-primary-foreground/20 p-2">
                  <Crown className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold">Forfait Premium</h2>
                <div className="rounded-full bg-primary-foreground/20 px-3 py-0.5 text-xs font-medium">
                  Actif
                </div>
              </div>
              <p className="text-primary-foreground/80 text-sm max-w-[500px]">
                Accédez à toutes les fonctionnalités premium et gérez votre
                équipe efficacement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Feature>Jusqu&apos;à {maxMembers} membres d&apos;équipe</Feature>
              <Feature>Support prioritaire 24/7</Feature>
              <Feature>Fonctionnalités avancées</Feature>
              <Feature>Statistiques détaillées</Feature>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">29.99€</span>
                <span className="text-primary-foreground/80">/mois</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="lg" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Gérer l&apos;abonnement
                </Button>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="lg:w-72 bg-primary p-6 flex flex-col items-center justify-center space-y-4">
            <CircularProgress value={activeMembers} max={maxMembers} />
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Users className="h-4 w-4" />
                <span className="font-medium">
                  {activeMembers} membres actifs
                </span>
              </div>
              <p className="text-sm text-primary-foreground/80">
                sur {maxMembers} disponibles
              </p>
            </div>
            <AddMemberButton
              variant="secondary"
              size="sm"
              className="w-full"
              maxMembers={maxMembers}
              activeMembers={activeMembers}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamBudget;
