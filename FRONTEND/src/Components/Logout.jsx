import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import "../Styles/auth.css";

export default function Logout() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/v1/auth/logout",
        {
          withCredentials: true
        }
      );

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

      toast.error("Logout Failed");

    }
  };

  return (

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  );
}