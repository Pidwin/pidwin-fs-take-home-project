import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../../api";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getLeaderboard()
      .then((response) => {
        setLeaderboardData(response.data.topStreaks);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      Leaderboard
      <ol>
        {leaderboardData.map((entry, index) => (
          <li
            key={index}
            style={{ flex: 1, flexDirection: "column", padding: 10 }}
          >
            <div className="name">{entry.name}</div>
            <div className="value">Highest Streak: {entry.highestStreak}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
