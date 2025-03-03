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
    ctaLink: "/about/pro",
  },
  {
    title: "Gestion des rendez-vous",
    description:
      "Planifiez et gérez tous les rendez-vous de vos clients en quelques clics.",
    icon: Calendar,
    details:
      "Notre calendrier intelligent optimise votre planning quotidien. Gérez facilement les rendez-vous, les urgences et les suivis réguliers. La synchronisation en temps réel permet d'éviter les conflits d'horaires et de maximiser votre temps de consultation.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    cta: "Gérer mon agenda",
    ctaLink: "/about/pro/calendar",
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
    ctaLink: "/about/pro/records",
  },
  {
    title: "Collaboration simplifiée",
    description: "Partagez facilement les informations avec les soignants.",
    icon: Users,
    details:
      "Facilitez la communication entre professionnels grâce à notre plateforme collaborative. Partagez des dossiers, échangez des avis et coordonnez les soins en toute simplicité. La collaboration n'a jamais été aussi fluide.",
    image:
      "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=800&auto=format&fit=crop",
    cta: "Collaborer",
    ctaLink: "/about/pro/team",
  },
  {
    title: "Délais de rétractation",
    description:
      "Les délais de rétractation sont un atout important en cas de problème avec un client.",
    icon: Zap,
    details:
      "Les délais de rétractation vous permettent de mettre en place une stratégie de visibilité sur votre activité et vos prestations. Il vous suffit de les configurer et une fois fait, Biume AI s'en chargera de les appliquer.",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&auto=format&fit=crop",
    cta: "Configurer les alertes",
    ctaLink: "/about/pro/settings",
  },
  {
    title: "Intelligence artificielle",
    description:
      "Profitez d'un assistant IA pour optimiser vos soins et développer votre activité.",
    icon: Gift,
    details:
      "Profitez vous aussi de la puissance de l'IA. Biume AI vous propose des recommandations personnalisées pour optimiser vos soins, vos déplacements et démarches administratives.",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format&fit=crop",
    cta: "Découvrir Biume AI",
    ctaLink: "/about/pro/ai",
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
      "Un outil indispensable pour mon élevage. La gestion des vaccins et des rendez-vous n&apos;a jamais été aussi simple !",
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
      "Gestion client",
      "Facturation et devis",
      "Gestion d'emploi du temps",
      "Comptes rendus et observations",
      "Comptabilité",
      "Partage de dossiers entre professionnels",
      "Réservation client",
      "Paiement en ligne",
    ],
  },
  {
    name: "Pro",
    price: 24.99,
    popular: true,
    features: [
      "Fonctionnalités Basic +",
      "Notifications et rappels automatiques",
      "Délais de rétractation",
      "Échelons de remboursement",
      "Accès restreint à Biume AI",
      "Ajouter jusqu'à 5 employés",
    ],
  },
  {
    name: "Ultimate",
    price: 34.99,
    features: [
      "Fonctionnalités Pro +",
      "Accès intégral à Biume AI",
      "Rapports de performance",
      "Support dédié 24/7",
      "Communication centralisée",
      "Ajoutez jusqu'à 10 employés",
    ],
  },
];
