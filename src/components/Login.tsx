import React, { useState, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface LoginResponse {
    token: string;
}

interface LoginFormProps {
  onLogin: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [Email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    console.log("Credentials:")
    console.log(JSON.stringify({
        Email,
        password,
      }))
    event.preventDefault();
    fetch("http://yacloudgotmp.traininglog.hemsida.eu/login", {
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
        // console.log("--------");
        // console.log(response.text());
        // console.log("........");
        return response.json();
      })
      .then((data: LoginResponse) => {
        props.onLogin(true);
        localStorage.setItem("token", data.token);
        console.log("Token stored:", data.token);
      })
      .catch((error) => {
        // Handle any login errors...
        console.error("Error:", error);
      });
  };

  return (
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

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
