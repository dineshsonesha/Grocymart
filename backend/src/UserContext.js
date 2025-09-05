import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("loggedUser");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = sessionStorage.getItem("loggedUser");
      setUser(stored ? JSON.parse(stored) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loggedUserUpdated", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("loggedUserUpdated", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const validateUser = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://localhost:8080/users/${user.id}`);
          if (!response.ok) {
            logout();
          }
        } catch (error) {
          console.error("Validation failed", error);
          logout();
        }
      }
    };
    validateUser();
  }, []);

  const login = (userData) => {
    sessionStorage.setItem("loggedUser", JSON.stringify(userData));
    setUser(userData);
    window.dispatchEvent(new Event("loggedUserUpdated"));
  };

  const logout = () => {
    sessionStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
