import React from "react";
import { useNavigate } from "react-router-dom";
export default function CreateAccount() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/sigin");
  };
  return (
    <div className="mt-16">
      Create Account
      <div className="cursor-pointer" onClick={handleSignIn}>
        have an account already ?
      </div>
    </div>
  );
}
