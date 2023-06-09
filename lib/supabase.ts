export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: {
          caption: string | null
          created_at: string | null
          id: number
          likes: number
          url: string
          user_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: number
          likes?: number
          url: string
          user_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: number
          likes?: number
          url?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name_first: string | null
          name_last: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name_first?: string | null
          name_last?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name_first?: string | null
          name_last?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
