import React, { useState, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface LoginResponse {
  token: string;
}

interface LoginFormProps {
  onLogin: (loggedIn: boolean) => void;
}

const loginURL = "http://yacloudgotmp.traininglog.hemsida.eu/login";
const newUserURL = "http://yacloudgotmp.traininglog.hemsida.eu/new_user";

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [Email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newUserMode, setNewUserMode] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    console.log("Credentials:");
    console.log(
      JSON.stringify({
        Email,
        password,
      })
    );
    event.preventDefault();

    const url = newUserMode ? newUserURL : loginURL;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        // console.log("--------");
        // console.log(response.text());
        // console.log("........");
        return response.json();
      })
      .then((data: LoginResponse) => {
        if (newUserMode) {
          setNewUserMode(false);
        } else {
          props.onLogin(true);
          localStorage.setItem("token", data.token);
          console.log("Token stored:", data.token);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <h1>Login</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="test@test.se"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="test"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => setNewUserMode(false)}
        >
          Login
        </Button>

        <Button
          variant="secondary"
          type="submit"
          onClick={() => setNewUserMode(true)}
        >
          New User
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
