import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const handleCreateAccount = () => {
    navigate("/createAccount");
  };
  return (
    <div className="mt-16">
      Sign In
      <div onClick={handleCreateAccount} className="cursor-pointer">
        Have an account already
      </div>
    </div>
  );
}
