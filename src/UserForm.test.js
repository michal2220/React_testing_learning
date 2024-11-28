import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  //Render the component
  render(<UserForm />);

  //Manipulate the component or find an elemen in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  //Assertion
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submited", () => {
  //Not optimal implementation
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };
  //Try to render
  render(<UserForm onUserAdd={callback} />);

  //Find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");
  //Simulate tying in a name
  user.click(nameInput);
  user.keyboard("name");

  //Simulate tying in a emails
  user.click(emailInput);
  user.keyboard("name@email.com");
  //Find the button
  const button = screen.getByRole("button");
  //Simulate clicking the button
  user.click(button);
  //Assertion to make sure "onUserAdd" gets called with email/name
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "name", email: "name@email.com" });
});
