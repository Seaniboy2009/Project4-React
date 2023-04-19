import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar, tests signed out links", async () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signUpLink = screen.getByRole("link", { name: /sign up/i });
  const signInLink = screen.getByRole("link", { name: /sign in/i });
  const exploreLink = screen.getByRole("link", { name: /Explore/i });

  expect(signUpLink).toBeInTheDocument();
  expect(signInLink).toBeInTheDocument();
  expect(exploreLink).toBeInTheDocument();

});