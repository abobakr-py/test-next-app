import { create } from "zustand";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

// Define the interface for the global state
interface AuthState {
  token: string | any;
  isAuthenticated: boolean;
  setToken: (input: string) => void;
  clearToken: () => void;
  user: any;
  setUser: (userData: any) => void;
}
const getUserFromCookies = () => {
  const savedUser = getCookie("user");
  return savedUser ? JSON.parse(savedUser as string) : null;
};
export const useAuth = create<AuthState>((set) => ({
  token: getCookie("token") ? getCookie("token") : "",
  // isAuthenticated: localStorage.getItem("token") ? true : false,
  isAuthenticated: getCookie("token") ? true : false,
  user: getUserFromCookies(),
  setToken: (input: string) => {
    setCookie("token", input);
    set({ token: input, isAuthenticated: true });
  },
  setUser: (userData: any) => {
    setCookie("user", JSON.stringify(userData));
    set({ user: userData }); // Update user data in the state
  },
  clearToken: () => {
    deleteCookie("token");
    deleteCookie("user");
    set({ token: null, isAuthenticated: false, user: null });
  },
}));
// import { create } from "zustand";

// // Defining an interface for the store's state
// interface AuthStoreInterface {
//   authenticated: boolean; // a boolean value indicating whether the user is authenticated or not
//   setAuthentication: (val: boolean) => void; // a function to set the authentication status
//   user: any; // an object that stores user information
//   setUser: (user: any) => void; // a function to set user information
// }

// // create our store
// export const useAuthStore = create<AuthStoreInterface>((set) => ({
//   authenticated: false, // initial value of authenticated property
//   user: {}, // initial value of user property
//   setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
//   setUser: (user) => set({ user }), // function to set user information
// }));
