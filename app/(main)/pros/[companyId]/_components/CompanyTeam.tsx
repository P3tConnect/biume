import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import { Member } from "@/src/db";
import { motion } from "motion/react";

interface CompanyTeamProps {
  professionals: Member[];
}

export function CompanyTeam({ professionals }: CompanyTeamProps) {
  return (
    <div className="space-y-4">
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {professionals.map((pro, index) => (
          <motion.div
            key={pro.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          >
            <Avatar className="h-12 w-12 ring-2 ring-offset-2 ring-offset-background ring-primary/10 group-hover:ring-primary/30 transition-all">
              <AvatarImage
                src={pro.user.image || ""}
                alt={`Photo de ${pro.user.name || "membre de l'équipe"}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                {pro.user.name
                  ? pro.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                  : "??"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                {pro.user.name || "Membre de l'équipe"}
              </p>
              <p className="text-sm text-muted-foreground">
                {pro.role === "owner" ? "Propriétaire" : "Praticien"}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
