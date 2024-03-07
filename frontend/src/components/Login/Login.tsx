import LockIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupInput } from "shared/interfaces";
import { useAppDispatch } from "../..";
import { login, signup } from "../../actions/login";
import { getUser } from "../../utils/local-storage";
import Input from "./Input";
import { styles } from "./styles";

const Login = () => {
  const [formData, setFormData] = useState<SignupInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = getUser();

  const dispatch = useAppDispatch();
  const history = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      dispatch(login({ input: formData, history }));
    } else {
      dispatch(signup({ input: formData, history }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const switchLogin = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  if (user !== null) {
    history("/");
    return null;
  } else {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <Paper sx={styles.paper} elevation={3}>
            <Avatar sx={styles.avatar}>
              {" "}
              <LockIcon />
            </Avatar>
            <Typography variant="h5" color="primary">
              {isLoggedIn ? "Login" : "Logout"}
            </Typography>
            <form style={styles.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {!isLoggedIn && (
                  <>
                    <Input
                      name="firstName"
                      label="First Name"
                      handleChange={handleChange}
                      autoFocus
                      half
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      handleChange={handleChange}
                      half
                    />
                  </>
                )}

                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                />
                <Input
                  name="password"
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  half={isLoggedIn ? false : true}
                />
                {!isLoggedIn && (
                  <>
                    <Input
                      name="confirmPassword"
                      label="Confirm Password"
                      handleChange={handleChange}
                      type="password"
                      half
                    />
                  </>
                )}
              </Grid>
              <Button
                type="submit"
                sx={styles.submit}
                fullWidth
                variant="contained"
                color="primary"
              >
                {isLoggedIn ? "Login" : "Sign Up"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchLogin}>
                    {isLoggedIn
                      ? "Don't Have An Account? Sign Up."
                      : "Already Have An Account? Login."}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
};

export default Login;
