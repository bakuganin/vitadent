export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  doctorName: string;
  workingHours: string;
}

export interface BookingData {
  fullName: string;
  phone: string;
  previousVisit: string;
  visitGoals: string[];
  concerns: string[];
  painFrequency: string;
  painIntensity: string;
  problem: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image?: string;
}

export interface ServiceCard {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
}
