import { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import useAuthCheck from "../middleware/authMiddleware";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface UserData {
  id: string;
  username: string;
  password: string;
  matches: number;
  wins: number;
  draws: number;
  winrate: number;
  createdAt: string;
}

const Dashboard = () => {
  useAuthCheck();
  const navigate = useNavigate();
  const httpURL = "http://localhost:8080";
  const [data, setData] = useState<UserData | null>(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${httpURL}/dashboard/${username}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  if (!data) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div
      className="min-h-screen text-white flex flex-col md:flex-row gap-6 p-6 items-center justify-center
    bg-gradient-to-br from-neutral-700 via-neutral-800 to-black backdrop-blur-md overflow-hidden"
    >
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-3xl mt-4">{data.username}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold">Matches</h2>
            <p className="text-4xl font-bold mt-4">
              <CountUp end={data.matches} duration={3} />
            </p>
          </div>

          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold">Wins</h2>
            <p className="text-4xl font-bold mt-4">
              <CountUp end={data.wins} duration={3} />
            </p>
          </div>

          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <h2 className="text-xl font-semibold">Draws</h2>
            <p className="text-4xl font-bold mt-4">
              <CountUp end={data.draws} duration={3} />
            </p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-lg">
            Account created on:{" "}
            <span className="font-semibold">
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div
          onClick={() => {
            navigate("/home");
          }}
          className="absolute top-6 left-3 p-2  md:top-8 md:left-10 md:p-3 bg-white/20 rounded-full hover:bg-white/10 hover:border hover:border-white/20 cursor-pointer"
        >
          <FaArrowLeft className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
