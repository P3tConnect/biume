import { Organization } from "@/src/db";
import { OrganizationCard } from "./organization-card";
import React from "react";

interface OrganizationsGridProps {
  organizations: Organization[];
}

export function OrganizationsGrid({ organizations }: OrganizationsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </div>
  );
}
