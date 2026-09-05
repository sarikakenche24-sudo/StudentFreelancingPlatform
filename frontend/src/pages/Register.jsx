
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api.js";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    college: "",
    course: "",
    year: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await API.post(
        "/auth/register",
        formData
      );

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card register-card">

        {/* Logo */}
        <div className="auth-logo">
          Skill<span>Bridge</span>
        </div>

        {/* Heading */}
        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join SkillBridge and start building your career
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role */}
          <div className="input-group">
            <label>Account Type</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">
                Student
              </option>

              <option value="client">
                Client
              </option>
            </select>
          </div>

          {/* Student Details */}
          {formData.role === "student" && (
            <>
              <div className="input-group">
                <label>College</label>

                <input
                  type="text"
                  name="college"
                  placeholder="Enter your college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Course</label>

                <input
                  type="text"
                  name="course"
                  placeholder="Example: B.Tech CSE"
                  value={formData.course}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Year</label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Year
                  </option>

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>
                </select>
              </div>
            </>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="auth-message">
            {message}
          </p>
        )}

        {/* Login Link */}
        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Register;

