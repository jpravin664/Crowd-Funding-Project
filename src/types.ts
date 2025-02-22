export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  raised: number;
  daysLeft: number;
  creator: {
    name: string;
    avatar: string;
  };
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}