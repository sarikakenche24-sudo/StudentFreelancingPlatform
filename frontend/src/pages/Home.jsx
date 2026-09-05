
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* Navigation Bar */}
      <nav className="navbar">

        <div className="nav-logo">
          Skill<span>Bridge</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link
            to="/register"
            className="nav-register"
          >
            Get Started
          </Link>
        </div>

      </nav>


      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-tag">
            🚀 Student Freelancing Platform
          </p>

          <h1>
            Turn Your Skills Into
            <span> Opportunities</span>
          </h1>

          <p className="hero-description">
            SkillBridge connects talented students with
            clients looking for fresh ideas, technical skills
            and innovative solutions.
          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-button"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="secondary-button"
            >
              Login
            </Link>

          </div>

        </div>


        {/* Hero Card */}
        <div className="hero-card">

          <div className="floating-card">

            <div className="card-icon">
              💻
            </div>

            <div>
              <h3>Find Your Next Project</h3>

              <p>
                Discover projects that match your skills.
              </p>
            </div>

          </div>

          <div className="floating-card second-card">

            <div className="card-icon">
              🎓
            </div>

            <div>
              <h3>Build Your Portfolio</h3>

              <p>
                Gain experience while working on real projects.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Features */}
      <section className="features-section">

        <div className="section-heading">
          <p>WHY SKILLBRIDGE?</p>

          <h2>
            Everything You Need To Grow
          </h2>
        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🔍
            </div>

            <h3>Find Projects</h3>

            <p>
              Search and discover projects based on
              your skills and interests.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🤝
            </div>

            <h3>Get Hired</h3>

            <p>
              Submit proposals and connect directly
              with clients.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ⭐
            </div>

            <h3>Build Reputation</h3>

            <p>
              Complete projects, receive reviews and
              build your professional profile.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎯
            </div>

            <h3>Skill Matching</h3>

            <p>
              Find opportunities that match your
              technical skills.
            </p>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="how-section">

        <div className="section-heading">
          <p>HOW IT WORKS</p>

          <h2>
            Start Your Journey In 3 Steps
          </h2>
        </div>


        <div className="steps">

          <div className="step">

            <div className="step-number">
              1
            </div>

            <h3>Create Your Profile</h3>

            <p>
              Add your skills, education, portfolio
              and professional information.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              2
            </div>

            <h3>Find & Apply</h3>

            <p>
              Browse projects and submit proposals
              for the opportunities you like.
            </p>

          </div>


          <div className="step">

            <div className="step-number">
              3
            </div>

            <h3>Work & Grow</h3>

            <p>
              Complete projects, get reviews and
              strengthen your portfolio.
            </p>

          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="cta-section">

        <h2>
          Ready To Build Your Future?
        </h2>

        <p>
          Join SkillBridge and turn your skills
          into real-world opportunities.
        </p>

        <Link
          to="/register"
          className="primary-button"
        >
          Create Your Account
        </Link>

      </section>


      {/* Footer */}
      <footer className="footer">

        <div className="footer-logo">
          Skill<span>Bridge</span>
        </div>

        <p>
          Connecting students with opportunities.
        </p>

        <p className="copyright">
          © 2026 SkillBridge. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;

