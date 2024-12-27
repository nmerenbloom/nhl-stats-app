export interface FirebaseTokenObj {
  // [key: string]: any;
  user: string;
  session: string;
  t: string;
  refresh_token: string;
  league_key: string;
  timeStamp: number;
}

export const FIREBASE_TOKEN_OBJ_PROPS = [
  'user' as keyof FirebaseTokenObj,
  'session' as keyof FirebaseTokenObj,
  't' as keyof FirebaseTokenObj,
  'refresh_token' as keyof FirebaseTokenObj,
  'league_key' as keyof FirebaseTokenObj,
  'timeStamp' as keyof FirebaseTokenObj,
];
