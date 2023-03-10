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
import uploadIcon from '../../assets/upload-icon.png'
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import { editMenu } from "../../api/pagesApi";
import { editSocial } from "../../api/socialApi";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import { editUsers } from "../../api/usersApi";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { editSetting } from "../../api/settings";
import { ISettings } from "../../pages/settings/types";

export const EditSettingsDialog = ({
  open,
  setOpen,
  id,
}: {
  id: ISettings;
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar } = useSnackbar();
  const [user, setUser] = useState<{
    key: string;
    content_en: string;
    content_ru: string;
    image: any;
  }>({
    key: id?.key || "",
    image: null,
    content_en: id?.translates?.[0]?.content || "",
    content_ru: id?.translates?.[1]?.content || "",
  });

  const save = async () => {
    const form = new FormData();

    if (user.image) {
      form.append("image", user.image);
    }

    form.append("key", user.key);
    form.append("translates[en][content]", user.content_en);
    form.append("translates[ru][content]", user.content_ru);
    form.append("_method", "put");

    const data = await editSetting(form, id.id);
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
      <DialogTitle id="alert-dialog-title">{"Edit setting"}</DialogTitle>
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
          width: window.innerWidth > 600 ? "500px" : "auto",
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Key"
          value={user.key}
          onChange={(e) => setUser({ ...user, key: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Content en"
          value={user.content_en}
          onChange={(e) => setUser({ ...user, content_en: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Content ru"
          value={user.content_ru}
          onChange={(e) => setUser({ ...user, content_ru: e.target.value })}
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
