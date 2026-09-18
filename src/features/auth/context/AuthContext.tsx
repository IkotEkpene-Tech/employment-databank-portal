import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCurrentUser,
  login as loginApi,
  verifyLoginOtp as verifyLoginOtpApi,
  logout as logoutApi,
} from "../api";
import type { User, LoginPayload, VerifyLoginOtpPayload } from "../api/types";
import { tokenStorage, userStorage, authEvents } from "@/shared/lib";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  loginWithOtp: (payload: VerifyLoginOtpPayload) => Promise<User>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() =>
    userStorage.get<User>(),
  );
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useCallback((next: User | null) => {
    setUserState(next);
    if (next) {
      userStorage.set(next);
    } else {
      userStorage.clear();
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const freshUser = await getCurrentUser();
      setUser(freshUser);
      return freshUser;
    } catch {
      return null;
    }
  }, [setUser]);

  useEffect(() => {
    const bootstrap = async () => {
      const token = tokenStorage.get();
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const freshUser = await getCurrentUser();
        setUser(freshUser);
      } catch {
        tokenStorage.clear();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, [setUser]);

  // Any 401 from the API (expired/invalid token) clears the session so
  // ProtectedRoute redirects to /login on its next render.
  useEffect(() => {
    const handleUnauthorized = () => setUser(null);
    authEvents.addEventListener("unauthorized", handleUnauthorized);
    return () =>
      authEvents.removeEventListener("unauthorized", handleUnauthorized);
  }, [setUser]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const session = await loginApi(payload);
      tokenStorage.set(session.token);
      setUser(session.user);
      return session.user;
    },
    [setUser],
  );

  const loginWithOtp = useCallback(
    async (payload: VerifyLoginOtpPayload) => {
      const session = await verifyLoginOtpApi(payload);
      tokenStorage.set(session.token);
      setUser(session.user);
      return session.user;
    },
    [setUser],
  );

  const logout = useCallback(async () => {
    try {
      await logoutApi();
    } catch {
      // Token is invalidated locally regardless of whether the server call
      // succeeded — no point blocking logout on a flaky network.
    }
    tokenStorage.clear();
    setUser(null);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      loginWithOtp,
      logout,
      setUser,
      refreshUser,
    }),
    [user, isLoading, login, loginWithOtp, logout, setUser, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
