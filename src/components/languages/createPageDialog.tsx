import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import { createMenu } from "../../api/pagesApi";
import { useSnackbar } from "../../types/outletTypes/outletTypes";

export const CreatePageDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const [page, setPage] = useState({ en: "", ru: "" });
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const dataToSave = {
    translates: { en: { title: page.en }, ru: { title: page.ru } },
    uri: `#pages/${page.en.split(" ")[0].toLowerCase()}`,
    url: `/home/${page.en.split(" ")[0].toLowerCase()}`,
    status: 1,
  };
  const create = async () => {
    try {
      const data = await createMenu(dataToSave);
      if (data.success === true) {
        window.location.reload();
      }
    } catch (error: any) {
      let errors: any[] = Object.values(error.response.data.errors).flat(1);
      for (let err of errors) {
        setErrorText(err);
        break;
      }
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
      <DialogTitle id="alert-dialog-title">{"Create page"}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          gap: 3,
          width: window.innerWidth > 600 ? "500px" : "auto",
        }}
      >
        <OutlinedInput
          placeholder="Page name en"
          value={page.en}
          onChange={(e) => setPage({ ...page, en: e.target.value })}
        />
        <OutlinedInput
          placeholder="Page name ru"
          value={page.ru}
          onChange={(e) => setPage({ ...page, ru: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={create} autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
