import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGOUT } from "../redux/actions";
// import { useLocation } from "react-router-dom";
import { RootState } from "../redux/store"; // Import RootState from the correct location
import HabitTrackerTopBar from "./widgets/HabitTrackerTopBar";
import "../assets/scss/my_nav.scss";

const MyNav: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  // const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showMore, setShowMore] = useState(false);
  const [showMoreHabits, setShowMoreHabits] = useState(true);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
    <div className="topbar">
      <div className="user-navigation">
        {user && (
          <>
            <button
              className={showMoreHabits ? "navButtons hideButton" : "navButtons showButton"}
              onClick={() => setShowMoreHabits(!showMoreHabits)}
            >
              <div className="nav-timelineIcons">{showMoreHabits ? "-" : "+"}</div>
            </button>

            <div className="user-container">
              {user.user && (
                <div onClick={() => setShowMore(!showMore)} style={{ display: "flex", alignSelf: "center" }}>
                  {!showMore && (
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>left_fill</title>
                      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Arrow" transform="translate(-338.000000, -48.000000)">
                          <g id="left_fill" transform="translate(338.000000, 48.000000)">
                            <path
                              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                              id="MingCute"
                              fillRule="nonzero"
                            ></path>
                            <path
                              d="M7.93932,13.0607 C7.35354,12.4749 7.35354,11.5251 7.93932,10.9393 L13.5962,5.28249 C14.182,4.6967 15.1317,4.6967 15.7175,5.28249 C16.3033,5.86827 16.3033,6.81802 15.7175,7.40381 L11.1213,12 L15.7175,16.5962 C16.3033,17.182 16.3033,18.1317 15.7175,18.7175 C15.1317,19.3033 14.182,19.3033 13.5962,18.7175 L7.93932,13.0607 Z"
                              id="路径"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}

                  {showMore && (
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <title>right_fill</title>
                      <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="Arrow" transform="translate(-386.000000, -48.000000)">
                          <g id="right_fill" transform="translate(386.000000, 48.000000)">
                            <path
                              d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z"
                              id="MingCute"
                              fillRule="nonzero"
                            ></path>
                            <path
                              d="M16.0607,10.9393 C16.6465,11.5251 16.6465,12.4749 16.0607,13.0607 L10.4038,18.7175 C9.81804,19.3033 8.86829,19.3033 8.2825,18.7175 C7.69672,18.1317 7.69672,17.182 8.2825,16.5962 L12.8787,12 L8.2825,7.40381 C7.69672,6.81802 7.69672,5.86827 8.2825,5.28248 C8.86829,4.6967 9.81804,4.6967 10.4038,5.28249 L16.0607,10.9393 Z"
                              id="路径"
                              fill="#ffffff"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  )}
                </div>
              )}
              {user.user && showMore && (
                <div className="link-container">
                  <Link to="/dashboard">Profile</Link>
                  <Link to="/">Settings</Link>
                  <Link to="/" onClick={logout}>
                    Log-out
                  </Link>
                </div>
              )}
              {user.user && (
                <img
                  src={
                    user.user?.profile_img
                      ? user.user?.profile_img
                      : "https://preview.redd.it/nhim8ly085251.jpg?auto=webp&s=fc1e542dd41306ba139ffd590cf2aafabed73d6a"
                  }
                  alt="profile_img"
                  className="rounded-circle mx-3 border border-2"
                  style={{ width: "30px" }}
                />
              )}

              {user.user === null && (
                <>
                 <Link to="/register">Register</Link>
                  <Link to="/login">Log-in</Link>
                 
                  <img
                    src="https://preview.redd.it/nhim8ly085251.jpg?auto=webp&s=fc1e542dd41306ba139ffd590cf2aafabed73d6a"
                    alt="profile_img"
                    className="rounded-circle mx-3 border border-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      {showMoreHabits && <HabitTrackerTopBar />}
    </div>
  );
};

export default MyNav;

{
  /* <div>{userUser ? <p>Welcome, {userUser.name}!</p> : <p>You are not logged in.</p>}</div>; */
}
