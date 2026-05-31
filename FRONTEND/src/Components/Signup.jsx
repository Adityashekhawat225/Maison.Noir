import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

import "../Styles/auth.css";

export default function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        {
          username,
          email,
          mobile,
          password
        },
        {
          withCredentials: true
        }
      );

      toast.success(res.data.message);

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Signup Failed"
      );
    }
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <div
          className="auth-close"
          onClick={() => navigate("/")}
        >
          <X size={30} />
        </div>

        <h2 className="auth-title">
          Create Account
        </h2>

        <p className="auth-text">
          Create your luxury account
        </p>

        <form
          className="auth-form"
          onSubmit={handleSignup}
        >

          <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Create Account
          </button>

        </form>

        <p className="auth-link">
          Already have an account ?
          <Link to="/login">
            <span> Login</span>
          </Link>
        </p>

      </div>

    </div>

  );
}