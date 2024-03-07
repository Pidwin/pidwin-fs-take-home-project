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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { GameWagerInput } from "shared/interfaces";
import { fetchGame, wager } from "../../actions/game";
import { useAppDispatch } from "../../index";
import { getUser } from "../../utils/local-storage";
import { styles } from "./styles";

const Home = () => {
  const user = getUser();
  const [formData, setFormData] = useState<GameWagerInput>({
    tokensWagered: 0,
    sideWagered: 0,
  });

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGame());
  }, [user]);

  /**
   * Handles a change in the number of tokens the user wants to wager.
   */
  const handleWagerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, tokensWagered: parseInt(event.target.value) });
  };

  /**
   * Handles a change in the side the user wants to wager on.
   */
  const handleSideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      sideWagered: event.target.value === "0" ? 0 : 1,
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
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {user !== null ? (
            <Box sx={styles.gameBox}>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={styles.wagerForm}
              >
                <InputLabel>How many tokens do you want to wager?</InputLabel>
                <Input
                  value={formData.tokensWagered}
                  onChange={handleWagerChange}
                />
                <RadioGroup
                  value={formData.sideWagered}
                  onChange={handleSideChange}
                  sx={styles.wagerSideRadioGroup}
                >
                  <FormLabel>Which side do you want to wager on?</FormLabel>
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Heads"
                  />
                  <FormControlLabel
                    value={1}
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
                  Submit
                </Button>
              </Box>
            </Box>
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
