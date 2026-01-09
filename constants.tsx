
import React from 'react';
import { BikeType, RiderLevel, Privacy, Activity, UserProfile, Challenge } from './types';

// Fix: UserProfile interface requires 'birthDate' and 'email' instead of 'age'
export const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Alex Rivera',
  username: 'arivera_cycle',
  email: 'alex.rivera@example.com',
  avatar: 'https://picsum.photos/id/64/200/200',
  birthDate: '1995-05-15',
  weight: 74,
  height: 182,
  bikeType: BikeType.GRAVEL,
  level: RiderLevel.ADVANCED,
  city: 'São Paulo',
  country: 'Brasil',
  following: 142,
  followers: 890
};

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    userId: 'u1',
    userName: 'Alex Rivera',
    userAvatar: 'https://picsum.photos/id/64/200/200',
    title: 'Morning Gravel Grind',
    type: BikeType.GRAVEL,
    distance: 42.5,
    duration: 5400,
    avgSpeed: 28.3,
    maxSpeed: 45.2,
    elevation: 450,
    calories: 1200,
    points: [],
    date: '2024-05-15T08:30:00Z',
    privacy: Privacy.PUBLIC,
    likes: 24,
    comments: 3
  },
  {
    id: 'a2',
    userId: 'u2',
    userName: 'Mariana Costa',
    userAvatar: 'https://picsum.photos/id/65/200/200',
    title: 'Night Speed Run',
    type: BikeType.SPEED,
    distance: 25.0,
    duration: 3200,
    avgSpeed: 31.5,
    maxSpeed: 52.0,
    elevation: 120,
    calories: 750,
    points: [],
    date: '2024-05-14T19:00:00Z',
    privacy: Privacy.PUBLIC,
    likes: 15,
    comments: 1
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'May Distance Challenge',
    description: 'Ride 500km in the month of May',
    goal: 500,
    current: 342,
    deadline: '2024-05-31',
    rewardIcon: '🏆'
  },
  {
    id: 'c2',
    title: 'Climbing Specialist',
    description: 'Accumulate 2000m of elevation this week',
    goal: 2000,
    current: 1250,
    deadline: '2024-05-20',
    rewardIcon: '🏔️'
  }
];
