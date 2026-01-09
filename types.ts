
export enum BikeType {
  MTB = 'MTB',
  SPEED = 'Speed',
  GRAVEL = 'Gravel',
  URBANA = 'Urban'
}

export enum RiderLevel {
  BEGINNER = 'Iniciante',
  INTERMEDIATE = 'Intermediário',
  ADVANCED = 'Avançado'
}

export enum Privacy {
  PUBLIC = 'Público',
  FRIENDS = 'Amigos',
  PRIVATE = 'Privado'
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  avatar: string;
  birthDate: string;
  weight: number;
  height: number;
  bikeType: BikeType;
  level: RiderLevel;
  city: string;
  country: string;
  following: number;
  followers: number;
}

export interface LocationPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  type: BikeType;
  distance: number; // in km
  duration: number; // in seconds
  avgSpeed: number; // in km/h
  maxSpeed: number;
  elevation: number; // in meters
  calories: number;
  points: LocationPoint[];
  date: string;
  privacy: Privacy;
  likes: number;
  comments: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  current: number;
  deadline: string;
  rewardIcon: string;
}
