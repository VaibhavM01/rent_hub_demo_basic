export interface RentalPost {
    id?: number;
    apartmentName: string;
    title: string;
    isShared: boolean;
    location: string;
    squareFeet: number;
    rent: number;
    isNegotiable: boolean;
    priceMode: 'per month' | 'per day';
    furnished: boolean;
    amenities: string[];
    description: string;
    images: string[];
  }