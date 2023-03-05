import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { Box } from "@mui/system";
import { useState } from "react";
import { createLanguage } from "../../api/languages";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import uploadIcon from '../../assets/upload-icon.png'
import { editMenu } from "../../api/pagesApi";
import { editSocial } from "../../api/socialApi";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import { editUsers } from "../../api/usersApi";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { IUsers } from "../../pages/users/types";

export const EditUserDialog = ({
  open,
  setOpen,
  id,
}: {
  id: IUsers;
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar } = useSnackbar();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    password: string;
    password_confirmation: any;
    image: any;
  }>({
    name: id?.name || "",
    email: id?.email || "",
    password: "",
    image: null,
    password_confirmation: "",
  });

  const save = async () => {
    const form = new FormData();

    if (user.image) {
      form.append("image", user.image);
    }

    form.append("name", user.name);
    form.append("email", user.email);
    form.append("password", user.password);
    form.append("password_confirmation", user.password_confirmation);
    form.append("_method", "put");

    const data = await editUsers(form, id.id);
    if (data.success === true) {
      window.location.reload();
    } else {
      setOpenSnacBar(true);
    }
  };

  return (
    <Dialog
    maxWidth={'lg'}
    scroll={'body'}
    fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit user"}</DialogTitle>
      <FlexCenter>
        <label htmlFor="upload-flag">
          <FlexAlignCenter
            justifyContent={"center"}
            sx={{ cursor: "pointer" }}
            width={100}
            height={100}
          >
            {user.image ? (
              <img
                src={user.image && URL.createObjectURL(user.image)}
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "contain" }}
              />
            ) : (
<FlexAlignCenter justifyContent={'center'} width={'150px'} height={'100px'}>
                <img src={uploadIcon} width={"100px"}/>
              </FlexAlignCenter>
            )}
          </FlexAlignCenter>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser({ ...user, image: e?.target?.files?.[0] })
            }
            type="file"
            accept="image/png, image/gif, image/jpeg"
            hidden
            id="upload-flag"
          />
        </label>
      </FlexCenter>
      <DialogContent
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "column",
    
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Full name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Confirm password"
          value={user.password_confirmation}
          onChange={(e) =>
            setUser({ ...user, password_confirmation: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={save} autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
