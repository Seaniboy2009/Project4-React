import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Asset from "../Asset";

test("renders Asset, tests if the spinner is showing", async () => {
    render(
        <Router>
            <Asset spinner />
        </Router>
    );

    const div = document.querySelector('div');
    div.classList.contains('spinner-border');
});