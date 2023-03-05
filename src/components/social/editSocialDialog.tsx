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
import { editMenu } from "../../api/pagesApi";
import { editSocial } from "../../api/socialApi";
import { ISocial } from "../../pages/social/types";

interface IProps {
  id: number;
  translates: {
    en: { title: string };
    ru: { title: string };
  };
  uri: string;
  url: string;
  status: number;
  _method: string;
}
export const EditSocialDialog = ({
  open,
  setOpen,
  id,
}: {
  id: ISocial;
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const [page, setPage] = useState({
    title: id?.title || "",
    class_name: id?.class_name || "",
  });

  const save = async () => {
    const form = new FormData();
    form.append("title", page.title);
    form.append("url", "http://facebook.com/test.profile");
    form.append("class_name", page.class_name);
    form.append("_method", "put");
    const data = await editSocial(form, id.id);
    if (data.success === true) {
      window.location.reload();
    }
  };

  return (
    <Dialog
    maxWidth={'sm'}
    scroll={'body'}
    fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit Social link"}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          gap: 3,
          flexDirection:'column',
          p:3
        }}
      >
        <OutlinedInput
          placeholder="Social name"
          value={page.title}
          onChange={(e) => setPage({ ...page, title: e.target.value })}
        />
        <OutlinedInput
          placeholder="Social class name"
          value={page.class_name}
          onChange={(e) => setPage({ ...page, class_name: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={save} autoFocus>
        Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
