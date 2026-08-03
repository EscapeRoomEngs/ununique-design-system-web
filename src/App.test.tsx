import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the text-field example", () => {
  render(<App />);
  expect(screen.getByText("아이디 입력")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("입력")).toBeInTheDocument();
});
