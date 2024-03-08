import {
  Box,
  Button,
  Container,
  FormControlLabel,
  FormLabel,
  Grow,
  Input,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { RootState } from "frontend/src/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GameWagerInput } from "shared/interfaces";
import { fetchGame, wager } from "../../actions/game";
import { useAppDispatch } from "../../index";
import { getUser } from "../../utils/local-storage";
import { styles } from "./styles";

const Home = () => {
  const user = getUser();
  const [formData, setFormData] = useState<GameWagerInput>({
    tokensWagered: 1,
    wageredHeads: true,
  });
  const loginState = useSelector((state: RootState) => {
    return state.login;
  });
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log({ user });
    if (!gameState) {
      dispatch(fetchGame());
    }
  }, [loginState]);

  /**
   * Handles a change in the number of tokens the user wants to wager.
   */
  const handleWagerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = parseInt(event.target.value);
    if (newValue > 0) {
      setFormData({ ...formData, tokensWagered: parseInt(event.target.value) });
    }
  };

  /**
   * Handles a change in the side the user wants to wager on.
   */
  const handleSideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      wageredHeads: event.target.value === "true",
    });
  };

  /**
   * Submits the wager.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(wager(formData));
  };

  return (
    <Grow in>
      <Container component="main" maxWidth="sm" sx={styles.container}>
        {user === null ? (
          <Paper elevation={3}>
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          </Paper>
        ) : (
          <>
            <Paper elevation={3} sx={styles.wagerFormPaper}>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <Typography variant="subtitle1" align="center" color="primary">
                {`Submit a wager to play a round of coin toss.`}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={styles.wagerForm}
              >
                <InputLabel>How many tokens do you want to wager?</InputLabel>
                <Input
                  type="number"
                  value={formData.tokensWagered}
                  onChange={handleWagerChange}
                  inputProps={{
                    inputProps: {
                      min: 1,
                    },
                  }}
                />
                <RadioGroup
                  value={formData.wageredHeads}
                  onChange={handleSideChange}
                  sx={styles.wagerSideRadioGroup}
                >
                  <FormLabel>
                    Which side of the coin do you want to wager on?
                  </FormLabel>
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Heads"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Tails"
                  />
                </RadioGroup>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  sx={styles.wagerSubmitButton}
                >
                  Submit Wager
                </Button>
              </Box>
            </Paper>
            <Paper elevation={3} sx={styles.wagerListPaper}>
              <Box>
                <Typography variant="h4" align="center" color="primary">
                  {`Last 10 Wagers`}
                </Typography>
                <Typography variant="subtitle1" align="center" color="primary">
                  {`The wagers are displayed in the order they occurred.`}
                </Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Wager #</TableCell>
                    <TableCell align="center">Initial Balance</TableCell>
                    <TableCell align="center">Tokens Wagered</TableCell>
                    <TableCell align="center">Wagered Heads</TableCell>
                    <TableCell align="center">Result</TableCell>
                    <TableCell align="center">Net Win</TableCell>
                    <TableCell align="center">Bonus Payout?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gameState?.lastTenWagers.map((row, i) => (
                    <TableRow
                      key={`row_${i}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="center">{row.initialBalance}</TableCell>
                      <TableCell align="center">{row.tokensWagered}</TableCell>
                      <TableCell align="center">
                        {row.wageredHeads ? "Heads" : "Tails"}
                      </TableCell>
                      <TableCell align="center">
                        {row.wagerWon ? "Won" : "Lost"}
                      </TableCell>
                      <TableCell align="center">{row.netWin}</TableCell>
                      <TableCell align="center">
                        {row.bonusAwarded ? "True" : "False"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </>
        )}
      </Container>
    </Grow>
  );
};

export default Home;
