export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onBoardingComplete: boolean;
      stripeId: string;
      isPro: boolean;
      isAdmin: boolean;
      phone: string;
      address: string;
      city: string;
      zipCode: number;
    };
  }

  interface UserPublicMetadata {
    firstname: string;
    lastname: string;
    isPro: boolean;
    isAdmin: boolean;
    sexe: string;
    birthday: Date;
  }

  interface UserPrivateMetadata {
    stripeId: string;
    phone: string;
    address: string;
    city: string;
    zipCode: number;
  }
}
