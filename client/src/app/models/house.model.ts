import {MediaModel} from "./media.model";

export interface HouseModel {
  rows: any[];
  id: number;
  ref: string;
  lat: number;
  lng: number;
  city: string;
  street: string;
  type: string;
  description: string;
  constructionDate: Date;
  projectManager: string; // Maître d'oeuvre
  owner: string; // Maître d'ouvrage
  materials: string; // Matériaux
  other: string; // Sources et autres info
  media: MediaModel[];
}
