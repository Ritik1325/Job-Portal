import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

   const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/user", { withCredentials: true });
      if (res.data || res.data.user) {
        setUser(res.data || res.data.user );
        localStorage.setItem("user", JSON.stringify(res.data || res.data.user));
      }
    } catch (error) {
      console.error("Error fetching user:", error?.response?.data || error.message);
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
