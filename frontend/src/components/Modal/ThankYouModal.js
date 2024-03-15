import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ThankYouModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="warning" onClick={handleOpen}>
        Thank You!
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            Thank You!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              {" "}
              I just wanted to say <b>Thank You</b> for allowing me to interview
              for this position.
            </p>
            <p>
              {" "}
              I am very excited about the potential opportunity to work with you
              and your team.
            </p>
            <p>
              {" "}
              I believe I would really enjoy using my skills and experience to
              contribute to your organization.
            </p>
            <p> Thank you again for your time and consideration!</p>
            <b> Jerry</b>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
