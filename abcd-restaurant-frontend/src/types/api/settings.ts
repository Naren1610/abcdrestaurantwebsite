export interface ClientSettings {
  id: number;
  email: string;
  phone: string;
  address: string;
  map_url?: string;
  is_online_ordering_enabled: boolean;
  is_table_reservation_enabled: boolean;
  social_links?: {
    id: number;
    platform: string;
    url: string;
    display_order?: number;
  }[];
  operating_hours?: {
    id: number;
    day: string;
    hours: string;
    display_order?: number;
  }[];
}
