import React, { useEffect, useState } from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getUserStreaks } from "../../api";

const Home = () => {
  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;
  const [userInfo, setUserInfo] = useState({
    currentWinningStreak: 0,
    highestStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserStreaks()
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const navigate = useNavigate();
  if (loading) return <div>Loading...</div>;
  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <div style={{ flex: 1, flexDirection: "column" }}>
                <Typography variant="h4" align="center" color="primary">
                  {`Current Streak ${userInfo.currentWinningStreak}`}
                </Typography>
                {""}
                <Typography variant="h4" align="center" color="primary">
                  {`Highest Streak ${userInfo.highestStreak}`}
                </Typography>
              </div>

              <div
                style={{ marginTop: 50, marginLeft: 10 }}
                onClick={() => navigate("/games/leaderboard")}
              >
                <Typography variant="h4" align="left" color="primary">
                  Leaderboard
                </Typography>
              </div>
              <div
                style={{ marginTop: 50, marginLeft: 10 }}
                onClick={() => navigate("/user/bets")}
              >
                <Typography variant="h4" align="left" color="primary">
                  My Bet History
                </Typography>
              </div>
              <div
                style={{ marginTop: 50, marginLeft: 10 }}
                onClick={() => navigate("/games/lucky")}
              >
                <Typography variant="h4" align="left" color="primary">
                  Play Lucky 7
                </Typography>
              </div>
            </>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
