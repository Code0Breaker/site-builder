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
import { useSnackbar } from "../../types/outletTypes/outletTypes";

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
export const EditPageDialog = ({
  open,
  setOpen,
  id,
}: {
  id: number;
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
    _method: "put",
  };
  const save = async () => {
    try {
      const data = await editMenu(dataToSave, id);
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
      fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit page"}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: "row",
          flexWrap:'wrap',
          justifyContent:'center'
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
        <Button onClick={save} autoFocus>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
