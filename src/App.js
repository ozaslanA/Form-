import "./App.css";
import FormInput from "./components/Formİnput";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPAssword: "",
  });

  const [resetForm, setResetForm] = useState(false);

  const initialFormValues = {
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPAssword: "",
  };

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Usename",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "email",
      label: "email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "birthday",
      errorMessage: "",
      label: "birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "password",
      errorMessage:
        "password should be 8-20 characters and include  at least 1 letter ,1 number and 1 special character!",
      label: "password",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 5,
      name: "confirmPAssword",
      type: "password",
      placeholder: "confirmPAssword",
      errorMessage: "Passwords dont match",
    },
  ];

  const submitForm = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        values
      );

      setValues(initialFormValues);
      setResetForm(true);

      console.log("Post response:", response.data);
    } catch (error) {
      console.error("Post error:", error);
    }
  };

  useEffect(() => {
    if (resetForm) {
      setResetForm(false);
    }
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
    console.log("Form Submitted:", values);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            values={values[input.name]}
            onChange={onChange}
            resetForm={resetForm}
          />
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
