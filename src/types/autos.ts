export interface Auto {
  _id: number;
  name: string;
  description: string;
  amount: number;
  isActive?: boolean;
  price: number;  
  image?: string;
  ownerId: string;
  category?: string; 
}