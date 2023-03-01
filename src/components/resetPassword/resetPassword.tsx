import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { OutlinedInput, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function ResetPassword({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  const [state, setState] = useState({ newPassword: "", confirmPassword: "" });

  return (
    <div>
      <Dialog
      maxWidth={'lg'}
      scroll={'body'}
      fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reset password"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            gap: 2,
            width: window.innerWidth > 600 ? "500px" : "auto",
          }}
        >
          <OutlinedInput
            value={state.newPassword}
            onChange={(e) =>
              setState({ ...state, newPassword: e.target.value })
            }
            sx={{
              border: "1px solid #ced4da",
              borderRadius: "5px",
              height: "35px",
              color: "gray",
              width: "308px",
            }}
            placeholder="New password"
          />
          <OutlinedInput
            value={state.confirmPassword}
            onChange={(e) =>
              setState({ ...state, confirmPassword: e.target.value })
            }
            sx={{
              border: "1px solid #ced4da",
              borderRadius: "5px",
              height: "35px",
              color: "gray",
              width: "308px",
            }}
            placeholder="Confirm password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>cancel</Button>
          <Button onClick={() => setOpen(false)}>Reset password</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
