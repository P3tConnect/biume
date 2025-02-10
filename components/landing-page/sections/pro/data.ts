import { Heart, Calendar, Shield, Users, Zap, Gift } from "lucide-react";

export const features = [
  {
    title: "Suivi de santé intelligent",
    description:
      "Suivez automatiquement les vaccins, traitements et rendez-vous avec des rappels intelligents.",
    icon: Heart,
    details:
      "Notre système de suivi de santé intelligent vous permet de gérer efficacement la santé de tous vos patients. Grâce à des algorithmes avancés, vous recevez des alertes personnalisées pour les vaccins, traitements et suivis médicaux. Plus besoin de gérer manuellement les rappels, notre plateforme s'en charge pour vous.",
    image:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&auto=format&fit=crop",
    cta: "Commencer le suivi",
    ctaLink: "/dashboard",
  },
  {
    title: "Gestion des rendez-vous",
    description:
      "Planifiez et gérez tous les rendez-vous de vos animaux en quelques clics.",
    icon: Calendar,
    details:
      "Notre calendrier intelligent optimise votre planning quotidien. Gérez facilement les rendez-vous, les urgences et les suivis réguliers. La synchronisation en temps réel permet d'éviter les conflits d'horaires et de maximiser votre temps de consultation.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    cta: "Gérer mon agenda",
    ctaLink: "/dashboard/calendar",
  },
  {
    title: "Dossier médical complet",
    description:
      "Accédez à l'historique complet et partagez-le en toute sécurité avec les professionnels.",
    icon: Shield,
    details:
      "Gardez un suivi détaillé de chaque patient avec notre système de dossiers médicaux numériques. Stockez les antécédents, les résultats d'analyses, les radiographies et les ordonnances. Tout est organisé et accessible instantanément.",
    image:
      "https://images.unsplash.com/photo-1516916759473-600c07bc12d4?w=800&auto=format&fit=crop",
    cta: "Voir les dossiers",
    ctaLink: "/dashboard/records",
  },
  {
    title: "Collaboration simplifiée",
    description:
      "Partagez facilement les informations avec les vétérinaires et autres soignants.",
    icon: Users,
    details:
      "Facilitez la communication entre professionnels grâce à notre plateforme collaborative. Partagez des dossiers, échangez des avis et coordonnez les soins en toute simplicité. La collaboration n'a jamais été aussi fluide.",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&auto=format&fit=crop",
    cta: "Collaborer",
    ctaLink: "/dashboard/team",
  },
  {
    title: "Notifications intelligentes",
    description:
      "Recevez des alertes personnalisées pour ne jamais manquer un rendez-vous important.",
    icon: Zap,
    details:
      "Notre système de notifications intelligent vous alerte des événements importants : rendez-vous à venir, rappels de vaccins, suivis post-opératoires. Personnalisez les alertes selon vos préférences pour une gestion optimale de votre activité.",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&auto=format&fit=crop",
    cta: "Configurer les alertes",
    ctaLink: "/dashboard/settings",
  },
  {
    title: "Récompenses et conseils",
    description:
      "Gagnez des points et recevez des conseils personnalisés pour vos animaux.",
    icon: Gift,
    details:
      "Bénéficiez d'un programme de fidélité innovant et d'outils d'aide à la décision basés sur l'intelligence artificielle. Recevez des recommandations personnalisées pour optimiser vos soins et développer votre activité.",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop",
    cta: "Découvrir les avantages",
    ctaLink: "/dashboard/rewards",
  },
];

export const testimonials = [
  {
    content:
      "Cette plateforme a révolutionné la façon dont je gère la santé de mes chats. Les rappels automatiques et le suivi sont incroyablement utiles !",
    name: "Marie Dubois",
    role: "Propriétaire de 3 chats",
    avatar: "/avatars/avatar-1.jpg",
  },
  {
    content:
      "En tant que vétérinaire, je recommande cette plateforme à tous mes clients. Elle facilite grandement le suivi et la communication.",
    name: "Dr. Pierre Martin",
    role: "Vétérinaire",
    avatar: "/avatars/avatar-2.jpg",
  },
  {
    content:
      "Un outil indispensable pour mon élevage. La gestion des vaccins et des rendez-vous n'a jamais été aussi simple !",
    name: "Sophie Laurent",
    role: "Éleveuse canine",
    avatar: "/avatars/avatar-3.jpg",
  },
];

export const pricingPlans = [
  {
    name: "Basic",
    price: 14.99,
    features: [
      "1 animal",
      "Suivi de base",
      "Rappels de rendez-vous",
      "Support par email",
      "Application mobile",
    ],
  },
  {
    name: "Pro",
    price: 24.99,
    popular: true,
    features: [
      "5 animaux",
      "Suivi avancé",
      "Partage avec les vétérinaires",
      "Support prioritaire",
      "Historique illimité",
      "Analyses et rapports",
    ],
  },
  {
    name: "Ultimate",
    price: 34.99,
    features: [
      "Animaux illimités",
      "Fonctionnalités pro",
      "API d'intégration",
      "Support dédié 24/7",
      "Personnalisation avancée",
      "Formation dédiée",
    ],
  },
];
