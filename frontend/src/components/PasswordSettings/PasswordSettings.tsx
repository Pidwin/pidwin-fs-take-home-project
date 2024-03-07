import LockIcon from "@mui/icons-material/LockRounded";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../..";
import { changePassword } from "../../actions/login";
import { getUser } from "../../utils/local-storage";
import Input from "../Login/Input";
import { styles } from "./styles";
import { IChangePasswordInput } from "shared/interfaces";

const PasswordSetting = () => {
  const user = getUser();
  const isSignedIn = user;
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [changeFormData, setChangeFormData] = useState<IChangePasswordInput>({
    oldPassword: "",
    newPassword: "",
    email: user?.email ?? "",
  });
  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setChangeFormData({ ...changeFormData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevPassword) => !prevPassword);
  };

  const handleSubmitChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changePassword({ input: changeFormData, history }));
  };

  useEffect(() => {
    if (isSignedIn == null) {
      history("/");
    }
  }, []);

  if (isSignedIn !== null) {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <Paper sx={styles.paper} elevation={3}>
            <Avatar sx={styles.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5" color="primary">
              Set Password
            </Typography>
            <form style={styles.form} onSubmit={handleSubmitChange}>
              <Grid container spacing={2}>
                <Typography
                  variant="caption"
                  color="error"
                  sx={styles.typo}
                  align="left"
                >
                  To change your password, enter your current password and your
                  new password.
                </Typography>
                <Input
                  name="oldPassword"
                  label="Current Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                />
                <Input
                  name="newPassword"
                  label="New Password"
                  handleChange={handleChange}
                  type="password"
                />
                <Button
                  type="submit"
                  sx={styles.submit}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Change Password
                </Button>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    );
  } else {
    return <>No Access</>;
  }
};

export default PasswordSetting;
