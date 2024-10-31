export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onBoardingComplete: boolean;
      stripeId: string;
      isPro: boolean;
      isAdmin: boolean;
      phone: string;
    };
  }

  interface UserPublicMetadata {
    isPro: boolean;
    isAdmin: boolean;
  }

  interface UserPrivateMetadata {
    stripeId: string;
    phone: string;
  }
}
