import React from "react";

const About = ({ data }) => {
  return (
    <section className="about-section">
      <h2>About Me</h2>
      <p>{data}</p>
    </section>
  );
};

export default About;
