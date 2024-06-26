import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGOUT } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { RootState } from "../redux/store"; // Import RootState from the correct location

const MyNav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userUser = useSelector((state: RootState) => state.user.user);
  const user = useSelector((state: RootState) => state.user);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:8000/logout");
      dispatch({ type: LOGOUT });
      navigate("/");
    } catch (error) {
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <Link className="navbar-brand text-secondary" to="/">
            CoreCraze
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link d-flex align-items-center gap-1 text-secondary ${
                    location.pathname === "/" ? "bord-p" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link d-flex align-items-center gap-1 text-secondary ${
                    location.pathname === "/login" ? "bord-p" : ""
                  }`}
                >
                  Login
                </Link>
              </li>
              {user?.user?.role === "guest" && (
                <li className="nav-item">
                  <Link to="/corsiutente/1" className="nav-link text-secondary d-flex align-items-center gap-1">
                    Your courses
                  </Link>
                </li>
              )}
            </ul>

            {user ? (
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-secondary"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        user.user?.profile_img
                          ? user.user?.profile_img
                          : "https://preview.redd.it/nhim8ly085251.jpg?auto=webp&s=fc1e542dd41306ba139ffd590cf2aafabed73d6a"
                      }
                      alt="profile_img"
                      className="rounded-circle mx-3"
                      style={{ width: "40px" }}
                    />
                    {user?.user?.name}
                  </a>
                  <ul className="dropdown-menu">
                    <div className="d-flex px-2 align-items-center">
                      <li>
                        <Link className="dropdown-item border-0 ps-1" to={`/dashboard/`}>
                          Profile
                        </Link>
                      </li>
                    </div>
                    <div className="d-flex px-2 align-items-center">
                      <li>
                        <button onClick={logout} className="dropdown-item border-0 ps-1" disabled={isLoading}>
                          {isLoading ? "Logging out..." : "Logout"}
                        </button>
                      </li>
                    </div>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <div className="d-flex px-2 align-items-center">
                      {user?.user?.role === "admin" && (
                        <>
                          <li>
                            <Link className="dropdown-item border-0 ps-1" to="backoffice">
                              BackOffice
                            </Link>
                          </li>
                        </>
                      )}
                    </div>
                  </ul>
                </li>
              </ul>
            ) : (
              <button className="btn btn-light rounded-0 ms-2" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      <div>{userUser ? <p>Welcome, {userUser.name}!</p> : <p>You are not logged in.</p>}</div>;
    </>
  );
};

export default MyNav;

{
  /* <div>{userUser ? <p>Welcome, {userUser.name}!</p> : <p>You are not logged in.</p>}</div>; */
}
