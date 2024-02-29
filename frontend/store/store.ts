import create from 'zustand';

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  userData: UserData | null;
  setUser: (data: UserData) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userData: null,
  setUser: (data: UserData) => set({ userData: data, isLoggedIn: true }),
}));
