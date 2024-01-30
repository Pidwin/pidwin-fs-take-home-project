import React, {useEffect} from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import TossCoin from "../TossCoin/TossCoin";
import Navbar from "../Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../actions/user";


const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isSingedIn = user;

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Navbar user={user}/>
        <Paper elevation={3}>
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <Typography variant="h4" align="center" color="primary">
              {`Welcome ${user.name}`}
            </Typography>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
        <Paper elevation={3} sx={{marginTop: 3}}>
          <TossCoin userId={user?.id}/>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
