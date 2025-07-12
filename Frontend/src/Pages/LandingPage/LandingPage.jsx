import React, { useState, useEffect } from "react";
import "./LandingPage.css"; 

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="landing-container">
      <div className="image-section">
        <img
          src="/assets/images/1.png"
          alt="Above Image"
          className="scroll-image-left"
          style={{ left: `${scrollPosition}px` }}
        />
        <div className="title-box">
          <h1 className="title-text">SKILL SWAP</h1>
        </div>
        <img
          src="/assets/images/2.png"
          alt="Below Image"
          className="scroll-image-right"
          style={{ right: `${scrollPosition}px` }}
        />
      </div>

      <h2 className="section-heading" id="why-skill-swap">
        WHY SKILL SWAP?
      </h2>

      <div className="why-content">
        <p>
          At Skill Swap, we believe in the power of mutual learning and collaboration. Here's why Skill Swap is the
          ultimate platform for skill acquisition and knowledge exchange:
        </p>

        <h4> Learn From Experts:</h4>
        <p>
          Gain insights and practical knowledge directly from experienced mentors who excel in their respective fields.
          Whether it's mastering a new programming language, honing your culinary skills, or delving into digital
          marketing, our mentors are here to guide you.
        </p>

        <h4> Share Your Expertise:</h4>
        <p>
          Have a skill or passion you're eager to share? Skill Swap gives you a platform to mentor others, build
          community, and help learners grow.
        </p>

        <h4> Collaborative Environment:</h4>
        <p>
          Connect with like-minded individuals, work on projects, and engage in discussions that fuel creativity.
          Skill Swap is about collective growth.
        </p>

        <h4> Diverse Learning Opportunities:</h4>
        <p>
          Explore everything from crafts to cutting-edge tech — all <strong>free of cost</strong>. There's something for
          everyone, regardless of your background.
        </p>

        <h4> Continuous Growth:</h4>
        <p>
          Whether you're new or a pro, Skill Swap helps you grow, challenge yourself, and learn for life.
        </p>


      </div>
    </div>
  );
};

export default LandingPage;
