import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

import "../Styles/auth.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://maison-noir-jt67.onrender.com/api/v1/auth/login",
        {
          email,
          password
        },
        {
          withCredentials: true
        }
      );

      toast.success(res.data.message);

      navigate("/profile");

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login Failed"
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
          My Account
        </h2>

        <p className="auth-text">
          I already have an account
        </p>

        <button className="google-btn">
          Continue with Google
        </button>

        <div className="divider">
          Or
        </div>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >

          <input
            className="auth-input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="auth-btn"
            type="submit"
          >
            Sign In
          </button>

        </form>

        <p className="auth-link">
          Don't have an account ?
          <Link to="/signup">
            <span> Create Account</span>
          </Link>
        </p>

      </div>

    </div>

  );
}