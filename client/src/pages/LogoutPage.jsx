import { useEffect, useState } from "react";
import axios from '../utils/axios';
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/usercontext.jsx";

const LogoutPage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();   // ✅ use context
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        setLoading(true);
        await axios.post('/logout', {}, { withCredentials: true });

        // ✅ Clear local storage properly
        localStorage.removeItem('user');

        // ✅ Reset context
        setUser(null);

        alert("Logged out successfully");
        navigate('/');
      } catch (error) {
        console.log("Logout error", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading && <p className="text-xl font-semibold">Logging you out...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default LogoutPage;
