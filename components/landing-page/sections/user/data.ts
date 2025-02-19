import {
  Calendar,
  Clock,
  Star,
  MessageSquare,
  CreditCard,
  Stethoscope,
} from "lucide-react";

export const features = [
  {
    title: "Réservation instantanée",
    description: "Prenez rendez-vous en quelques clics, 24h/24 et 7j/7.",
    icon: Calendar,
    details:
      "Notre système de réservation en ligne vous permet de prendre rendez-vous avec vos professionnels à tout moment. Plus besoin d'attendre les heures d'ouverture ou de passer des appels téléphoniques. Choisissez le créneau qui vous convient, remplissez les informations nécessaires et confirmez votre rendez-vous en quelques clics.",
    image:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=800&auto=format&fit=crop",
    cta: "Prendre rendez-vous",
    ctaLink: "/search",
  },
  {
    title: "Disponibilités en temps réel",
    description: "Visualisez les créneaux disponibles instantanément.",
    icon: Clock,
    details:
      "Notre calendrier synchronisé affiche en temps réel les disponibilités de votre professionnel. Fini les allers-retours par téléphone pour trouver un créneau disponible. Les plages horaires sont mises à jour instantanément, vous garantissant une visibilité claire sur les disponibilités.",
    image:
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&auto=format&fit=crop",
    cta: "Voir les disponibilités",
    ctaLink: "/search",
  },
  {
    title: "Avis vérifiés",
    description: "Consultez les avis de propriétaires d'animaux comme vous.",
    icon: Star,
    details:
      "Tous les avis publiés sur notre plateforme proviennent de clients véritables ayant effectué une consultation. Chaque commentaire est vérifié pour vous assurer une transparence totale et vous aider à choisir le bon professionnel pour votre animal.",
    image:
      "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=800&auto=format&fit=crop",
    cta: "Voir les avis",
    ctaLink: "/search",
  },
  {
    title: "Rappels automatiques",
    description: "Recevez des rappels pour ne jamais manquer vos rendez-vous.",
    icon: MessageSquare,
    details:
      "Notre système de notification intelligent vous envoie des rappels personnalisés par email et/ou SMS. Vous recevez un premier rappel 48h avant votre rendez-vous, puis un second 24h avant. Ces alertes incluent toutes les informations importantes : date, heure, lieu et préparatifs éventuels.",
    image:
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800&auto=format&fit=crop",
    cta: "Gérer mes rappels",
    ctaLink: "/dashboard",
  },
  {
    title: "Paiement sécurisé",
    description: "Payez en ligne en toute sécurité lors de la réservation.",
    icon: CreditCard,
    details:
      "Notre système de paiement en ligne est entièrement crypté et sécurisé. Vous pouvez régler votre consultation à l'avance ou choisir de payer sur place. Nous acceptons toutes les cartes bancaires principales et proposons des reçus numériques instantanés.",
    image:
      "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800&auto=format&fit=crop",
    cta: "En savoir plus",
    ctaLink: "/about",
  },
  {
    title: "Suivi santé",
    description: "Accédez au dossier digital de votre animal.",
    icon: Stethoscope,
    details:
      "Gardez une trace complète de la santé de votre animal : vaccins, traitements, ordonnances, résultats d'analyses et historique des rendez-vous. Toutes ces informations sont accessibles en quelques clics et peuvent être partagées facilement avec d'autres professionnels si nécessaire.",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop",
    cta: "Voir son carnet de santé",
    ctaLink: "/dashboard/health",
  },
];
