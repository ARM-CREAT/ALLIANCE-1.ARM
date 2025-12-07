
export interface Member {
  id: string;
  name: string;
  role: string;
  location: string;
  phone?: string;
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  image: string;
  category: 'Politique' | 'Social' | 'Événement';
}

export interface ProgramPoint {
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface DonationOption {
  amount: number;
  label: string;
}

export interface JoinRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  date: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  date: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  isAdmin?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isActive: boolean;
  totalVotes: number;
}
