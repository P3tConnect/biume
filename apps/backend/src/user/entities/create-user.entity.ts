export default class UserEntity {
  name: string;
  email: string;
  password: string;
  emailVerified: Boolean;
  refreshToken: string;
  image: string;
  phoneNumber: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  twoFactorEnabled: boolean;
  isPro: boolean;
  onBoardingComplete: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  stripeId: string;
}
