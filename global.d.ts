export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onBoardingComplete: boolean;
      stripeId: string;
      isPro: boolean;
      isAdmin: boolean;
    };
  }

  interface UserPublicMetadata {
    isPro: boolean;
    isAdmin: boolean;
  }

  interface UserPrivateMetadata {
    stripeId: string;
  }
}
