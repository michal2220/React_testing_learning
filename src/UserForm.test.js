import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";
import { act } from "react";

test("it shows two inputs and a button", () => {
  // Render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertions
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  const mock = jest.fn();

  // Render the component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  const nameInput = screen.getByLabelText(/name/i); // Use getByLabelText for better accessibility
  const emailInput = screen.getByLabelText(/email/i);

  // Simulate typing in a name and email using `user-event`
  await act(async () => {
    user.type(nameInput, "name");
    user.type(emailInput, "name@email.com");
  });

  // Find the button
  const button = screen.getByRole("button");

  // Simulate clicking the button
  user.click(button);

  // Assertion to make sure "onUserAdd" gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "name", email: "name@email.com" });
});

test("empties the two inputs when form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const button = screen.getByRole("button");

  await act(async () => {
    await user.click(nameInput);
    await user.keyboard("jane");
    await user.click(emailInput);
    await user.keyboard("jane@jane.com");
    await user.click(button);
  });

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
