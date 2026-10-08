export type Product = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  badge: string | null;
  img: string | null;
  slug?: string | null;
  visible?: boolean;
  featured?: boolean;
  specs?: string | null;
  created_at?: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  created_at?: string;
};

export type AdminUser = {
  id: string;
  email: string;
  role: string;
};

export type ContactFormData = {
  fullName: string;
  email: string;
  message: string;
};
