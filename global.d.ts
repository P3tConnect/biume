export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onBoardingComplete: boolean;
      stripeId: string;
    };
  }
}
