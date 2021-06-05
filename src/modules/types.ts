export type Image = {
  name: string;
  url: string;
};

export type Location = {
  address?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  longitude?: number;
  latitude?: number;
};

export type Coords = {
  longitude: number;
  latitude: number;
};
