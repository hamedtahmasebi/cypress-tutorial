import { render, screen } from "@testing-library/react";
import App from "../App";
describe("test", () => {
    it("Should render the app", () => {
        render(<App />);
        const app = screen.getByTestId("app");
        expect(app).toBeVisible();
    });
});
