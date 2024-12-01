import React from "react";
import styled from "styled-components";

const Navigation = () => {
  return (
    <Nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    &:hover {
      color: #f5f5f5;
    }
  }
`;

export default Navigation;
