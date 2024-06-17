import { useSelector } from "react-redux";
import { useState, ChangeEvent, MouseEvent } from "react";
import axios from "axios";

interface User {
  profile_img: string;
  name: string;
  email: string;
  created_at: string;
}

interface RootState {
  user: User;
}

function Dashboard() {
  const user = useSelector((state: RootState) => state.user);
  const [email, setEmail] = useState<string>(user.email);
  const [display, setDisplay] = useState<string>("none");

  const handleResetPassword = (event: MouseEvent<HTMLParagraphElement>) => {
    axios.post("/forgot-password", { email });
    setDisplay("block");
  };

  const resetName = (event: MouseEvent<HTMLParagraphElement>) => {
    axios.post("/forgot-password", { email });
    setDisplay("block");
  };

  return (
    <>
      <div className="container my-5 py-5">
        <div className="alert alert-success my-3" style={{ display }} role="alert">
          A link for the reset of your password has been sent to your email. Check your inbox!
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <img src={user.profile_img} alt="profile_img" className="img_profile2" />
          </div>
          <div className="col-12 col-md-6">
            <div className="row">
              <div className="col-6">
                <p className="fw-bold">
                  User: <span className="text-dark">{user.name}</span>
                </p>
              </div>
              <div className="col-6">
                <p className="fw-bold text-primary change" onClick={resetName}>
                  Change
                </p>
              </div>
              <hr />
              <div className="col-6">
                <p className="fw-bold">
                  Email: <span className="text-dark">{user.email}</span>
                </p>
              </div>
              <div className="col-6">
                <p className="fw-bold text-primary change">Change</p>
              </div>
              <hr />
              <div className="col-6">
                <p className="fw-bold">
                  Password: <span className="text-dark">************</span>
                </p>
              </div>
              <div className="col-6">
                <p className="fw-bold text-primary change" onClick={handleResetPassword}>
                  Change
                </p>
                <p className="text-success"></p>
              </div>
              <hr />
              <div className="col-6">
                <p className="fw-bold">
                  Created at: <span className="text-dark">{user.created_at.slice(0, 10)}</span>
                </p>
              </div>
              <hr />
            </div>
          </div>
        </div>
        {/* <form onSubmit={handleResetPassword} style={{ display: "none" }}>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit">Reset Password</button>
                </form> */}
      </div>
    </>
  );
}

export default Dashboard;
