import type { Auto } from "./autos";

export interface Category {
  _id: string;
  name: string;
  description: string;
  isActive?: boolean;
  cars?: Auto[]; // ID de los autos asociados a esta categoría
}
