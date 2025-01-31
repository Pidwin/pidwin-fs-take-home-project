import React, { useEffect, useState } from "react";
import { getUserBets } from "../../api";

function UserBets() {
  const [userBetsData, setUserBetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserBets()
      .then((response) => {
        setUserBetsData(response.data.bets);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <div style={{ width: 500 }}>
      <h1>User Bet History</h1>
      <ul>
        {userBetsData.length > 0 ? (
          userBetsData.map((betEntry, index) => (
            <div
              key={index}
              style={{ flex: 1, flexDirection: "column", padding: 10 }}
            >
              <div style={{ flex: 2, flexDirection: "row" }}>
                <div> Bet Roll Values: </div>
                <div>
                  {betEntry.isWinner != null ? (
                    <div>
                      {betEntry.gameId.rollValues[0]} and{" "}
                      {betEntry.gameId.rollValues[1]}
                    </div>
                  ) : null}
                </div>
              </div>
              {/* Winner can be null if not processed yet, so have check for that */}
              <div className="">
                Bet Result:{" "}
                {betEntry.isWinner != null
                  ? betEntry.isWinner
                    ? "Won"
                    : "Lose"
                  : "N/A"}
              </div>
              <div className="value">
                Bet Choice: {betEntry.guess ? "True" : "False"}
              </div>
            </div>
          ))
        ) : (
          <h3>No Bets at this Time. Lets start Betting!</h3>
        )}
      </ul>
    </div>
  );
}

export default UserBets;
