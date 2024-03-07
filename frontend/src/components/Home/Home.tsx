import { Container, Grow, Paper, Typography } from "@mui/material";
import { getUser } from "../../utils/local-storage";

const Home = () => {
  const user = getUser();

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {user !== null ? (
            <Typography variant="h4" align="center" color="primary">
              {`Welcome ${user.name}`}
            </Typography>
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
