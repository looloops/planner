import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { LOGIN } from "../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

// Define the shape of form data
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev: FormEvent) => {
    ev.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("http://localhost:8000/login", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.message || "An error occurred");
        setFormData({
          email: "",
          password: "",
        });
      });
  };

  return (
    <div className="container my-5 py-5">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={submitLogin} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={updateInputValue}
            value={formData.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={updateInputValue}
            value={formData.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="mt-5 pt-5">
        <Link to={`/Register/`} className="fw-bold txt-primary">
          Non sei registrato?
        </Link>
      </div>
    </div>
  );
};

export default Login;
