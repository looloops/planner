import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_img: string | File;
}

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_img: "",
  });

  const [errors, setErrors] = useState<string | null>(null);

  const updateInputValue = (ev: ChangeEvent<HTMLInputElement>) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const updateImageField = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.files && ev.target.files[0]) {
      setProfileImage(ev.target.files[0]);
    }
    updateInputValue(ev);
  };

  const submitLogin = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("email", formData.email);
        body.append("password", formData.password);
        body.append("password_confirmation", formData.password_confirmation);
        if (profileImage) {
          body.append("profile_img", profileImage);
        }

        return axios.post("http://localhost:8000/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((res) => {
        navigate("/");
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container py-5">
      <form onSubmit={submitLogin} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={updateInputValue}
            value={formData.name}
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">
            Conferma password
          </label>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            onChange={updateInputValue}
            value={formData.password_confirmation}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profile_img" className="form-label">
            Profile image
          </label>
          <input className="form-control" type="file" id="profile_img" name="profile_img" onChange={updateImageField} />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
