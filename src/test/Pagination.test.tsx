import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";
import { Provider } from "react-redux";
import { store } from "../store/store";

test('Make sure the component updates URL query parameter when page changes.', () => {
    render(
        <Provider store={store}>
            <Router>
                <Pagination />
            </Router>
        </Provider>
    );

    const nextButton = screen.getByText("Next");
    const prevButton = screen.getByText("Prev");
    fireEvent.click(nextButton);
    expect(window.location.search).toBe("?page=2");
    fireEvent.click(nextButton);
    expect(window.location.search).toBe("?page=3");
    fireEvent.click(prevButton);
    expect(window.location.search).toBe("?page=2");
    fireEvent.click(prevButton);
    expect(window.location.search).toBe("?page=1");
    expect(prevButton).toBeDisabled();
});