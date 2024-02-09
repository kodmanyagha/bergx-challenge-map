// TODO Move these types to a another project.
export type Nullable<T> = T | null;

export type CityType = {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
};
