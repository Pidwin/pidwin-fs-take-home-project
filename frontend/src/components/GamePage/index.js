import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { betGameAction, showResultAction } from "../../actions/bet";
import { useDispatch } from "react-redux";

const SOCKET_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
function GamePage() {
  const [gameActive, setGameActive] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile")).token
      : "null"
  );
  const [timer, setTimer] = useState(0);
  const [bet, setBet] = useState(null);
  const [hold, setHold] = useState(false);
  const [currentGameId, setCurrentGameId] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (token == null) {
      socket.disconnect();
      navigate("/");
    }

    const socket = io(SOCKET_URL, {
      auth: {
        token: token,
      },
    });

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("gameResultToUser", (data) => {
      let newMessage = JSON.parse(data);
      if (newMessage["type"] === "GAME_RESULT") {
        if (newMessage["message"] && newMessage["result"]) {
          dispatch(showResultAction(newMessage));
        }
      }
    });

    socket.on("broadcastMessage", (data) => {
      let newMessage = JSON.parse(data);
      if (newMessage["type"] === "NEW_GAME") {
        if (newMessage["id"]) {
          setCurrentGameId(newMessage["id"]);
          if (!gameActive && !hold) {
            startGame();
          }
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, []);

  const startGame = () => {
    setGameActive(true);
    setTimer(10);
    setBet(null);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    setGameActive(false);
    setHold(true);
    setTimeout(() => {
      setHold(false);
    }, 5000);
  };
  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Lucky 7</Typography>
      {gameActive ? (
        <>
          <Typography variant="h6">Game in Progress: {timer}s left</Typography>
          <Button
            variant="contained"
            color={bet === true ? "success" : "primary"}
            onClick={() => {
              setBet(true);
              dispatch(
                betGameAction({
                  guess: true,
                  gameId: currentGameId,
                })
              );
            }}
            disabled={bet !== null}
            style={{ margin: 10 }}
          >
            Bet True
          </Button>
          <Button
            variant="contained"
            color={bet === false ? "error" : "secondary"}
            onClick={() => {
              setBet(false);
              dispatch(
                betGameAction({
                  guess: false,
                  gameId: currentGameId,
                })
              );
            }}
            disabled={bet !== null}
            style={{ margin: 10 }}
          >
            Bet False
          </Button>
        </>
      ) : hold ? (
        <Typography variant="h6">
          Hold Period: Waiting for next game...
        </Typography>
      ) : (
        <Typography variant="h6">Waiting for new game to start...</Typography>
      )}
    </Container>
  );
}

export default GamePage;
