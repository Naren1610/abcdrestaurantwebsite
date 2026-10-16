export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean;
}

export interface TeamMemberBulkItem {
  id?: number;
  name: string;
  role: string;
  bio?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean;
}
