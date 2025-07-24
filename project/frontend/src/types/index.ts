export interface User {
  id: string;
  email: string;
  role: 'admin' | 'hospital';
  name: string;
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  radius: number;
  status: 'active' | 'pending' | 'suspended';
  registeredAt: string;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  age: number;
  address: string;
  lastDonation: string;
  status: 'available' | 'unavailable' | 'responded';
  distance?: number;
  department?: string;
}

export interface BloodRequest {
  id: string;
  hospitalId: string;
  bloodGroup: string;
  quantity: number;
  urgency: 'high' | 'medium' | 'low';
  status: 'pending' | 'fulfilled' | 'cancelled';
  requestedAt: string;
  requiredBy: string;
  description?: string;
  donorResponses: DonorResponse[];
}

export interface DonorResponse {
  donorId: string;
  status: 'contacted' | 'confirmed' | 'declined' | 'donated';
  respondedAt: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
}