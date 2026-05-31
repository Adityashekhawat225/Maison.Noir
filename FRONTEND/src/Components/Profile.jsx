import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import "../Styles/profile.css";
export default function Profile() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  // FETCH PROFILE -----------------------------------------------------------------------------

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(

          "http://localhost:5000/api/v1/auth/profile",

          {
            withCredentials: true,
          }

        );

        setUsername(
          res.data.user.username
        );

        setEmail(
          res.data.user.email
        );

        setMobile(
          res.data.user.mobile
        );

      } catch (error) {

        toast.error(
          "Failed To Load Profile"
        );
      }
    };

    fetchProfile();

  }, []);

  // UPDATE PROFILE-------------------------------------------

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.put(

        "http://localhost:5000/api/v1/auth/profile",

        {
          username,
          email,
          mobile,
        },

        {
          withCredentials: true,
        }

      );

      toast.success(
        res.data.message
      );

      // HOME PAGE NAVIGATE --------------------------------------------------------------

      navigate("/");

    } catch (error) {

      toast.error(
        "Update Failed"
      );
    }
  };

  // LOGOUT --------------------------------------------------------

  const handleLogout = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/api/v1/auth/logout",

        {
          withCredentials: true,
        }

      );

      toast.success(
        res.data.message
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        "Logout Failed"
      );
    }
  };

  return (

    <div className="profile-container">

      <div className="profile-box">

        <h2>
          My Profile
        </h2>

        <p>
          Manage your Maison account
        </p>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
          />

          <button type="submit">
            Save Information
          </button>

        </form>

   

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}