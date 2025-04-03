import { createContext, useEffect, useMemo, useState } from "react";
import { useGetMe } from "../hooks/query/user/useGetMe";

type AuthContextType = {
  error: string;
  userLogin: boolean;
  setUserLogin: (userLogin: boolean) => void;
  setError: (error: string) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLogin, setUserLogin] = useState(false);
  const [error, setError] = useState("");
  const { data: me } = useGetMe();

  useEffect(() => {
    if (me && me.name) {
      setUserLogin(true);
    }
  }, [me]);

  const memorizedValue = useMemo(() => {
    return {
      userLogin,
      error,
      setUserLogin,
      setError,
    };
  }, [userLogin, error]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};
