import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { Box } from "@mui/system";
import { useState } from "react";
import { createLanguage } from "../../api/languages";
import uploadIcon from '../../assets/upload-icon.png'
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import { createMenu } from "../../api/pagesApi";
import { createSocial } from "../../api/socialApi";
import { useOutletContext } from "react-router-dom";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";

export const CreateSocialDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar } = useSnackbar();
  const [social, setSocial] = useState<{
    title: string;
    url: string;
    class_name: string;
    image: any;
  }>({
    title: "",
    url: "http://facebook.com/test.profile",
    class_name: "",
    image: null,
  });

  const create = async () => {
    const form = new FormData();

    if (social.image) {
      form.append("image", social.image);
    }

    form.append("title", social.title);
    form.append("class_name", social.class_name);
    form.append("url", social.url);

    const data = await createSocial(form);
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
      <DialogTitle id="alert-dialog-title">{"Create social icon"}</DialogTitle>
      <FlexCenter>
        <label htmlFor="upload-flag">
          <FlexAlignCenter
            justifyContent={"center"}
            sx={{ cursor: "pointer" }}
            width={100}
            height={100}
          >
            {social.image ? (
              <img
                src={social.image && URL.createObjectURL(social.image)}
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
              setSocial({ ...social, image: e?.target?.files?.[0] })
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
          flexDirection: "row",
          flexWrap:'wrap',
          justifyContent:'center'
        }}
      >
        <OutlinedInput
          placeholder="Social name"
          value={social.title}
          onChange={(e) => setSocial({ ...social, title: e.target.value })}
        />
        <OutlinedInput
          placeholder="Social class name"
          value={social.class_name}
          onChange={(e) => setSocial({ ...social, class_name: e.target.value })}
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
