import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>🎓 SkillBridge</h1>
        <p>Student Freelancing Platform</p>
      </header>
      
      <main className="main">
        <section className="hero">
          <h2>Connect Your Skills with Real Opportunities</h2>
          <p>A digital marketplace for college students to showcase their talents and find freelance work.</p>
        </section>

        <section className="features">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>📊 For Freelancers</h4>
              <p>Showcase your skills and find projects that match your expertise</p>
            </div>
            <div className="feature-card">
              <h4>💼 For Clients</h4>
              <p>Post projects and hire talented student professionals</p>
            </div>
            <div className="feature-card">
              <h4>🔒 Secure & Verified</h4>
              <p>Safe transactions and verified user profiles</p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h3>Ready to Get Started?</h3>
          <p>Join SkillBridge today and unlock your freelancing potential</p>
          <div className="button-group">
            <button className="btn btn-primary">Sign Up as Freelancer</button>
            <button className="btn btn-secondary">Post a Project</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 SkillBridge. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
