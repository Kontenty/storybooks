export interface User_I {
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image?: string;
  createdAt: Date | number;
}

export interface GoogleProfile {
  id: string;
  displayName: string;
  name: { givenName: string; familyName: string };
  given_name: string;
  family_name: boolean;
  email_verified: boolean;
  verified: boolean;
  language: string;
  locale: undefined;
  email: string;
  emails: [{ value: string; type: string }];
  photos: {
    value: string;
  }[];
}
