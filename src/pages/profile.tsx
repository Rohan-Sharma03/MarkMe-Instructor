import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/sigin");
  };
  return (
    <div className="mt-20">
      Rohan
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </div>
  );
}
