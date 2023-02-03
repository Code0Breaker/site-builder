import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { createItem } from "../../api/portfolio";
import { useParams } from "react-router-dom";

export const ItemDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar } = useSnackbar();
  const { id } = useParams();
  const [item, setItem] = useState<{
    title: string;
    title_content: string;
    content: string;
    image: any;
  }>({
    title: "",
    title_content: "",
    image: null,
    content: "",
  });

  const create = async () => {
    const form = new FormData();

    if (item.image) {
      form.append("image", item.image);
    }

    form.append("translates[en][title]", item.title);
    form.append("translates[en][title_content]", item.title_content);
    form.append("translates[en][content]", item.content);
    form.append("status", "1");

    const data = await createItem(id as unknown as number, form);
    if (data.success === true) {
      window.location.reload();
    } else {
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
      <DialogTitle id="alert-dialog-title">{"Create item"}</DialogTitle>
      <FlexCenter>
        <label htmlFor="upload-flag">
          <FlexAlignCenter
            justifyContent={"center"}
            sx={{ cursor: "pointer" }}
            width={100}
            height={100}
          >
            {item.image ? (
              <img
                src={item.image && URL.createObjectURL(item.image)}
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "contain" }}
              />
            ) : (
              <InsertPhotoIcon />
            )}
          </FlexAlignCenter>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setItem({ ...item, image: e?.target?.files?.[0] })
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
          fullWidth
          placeholder="Title"
          value={item.title}
          onChange={(e) => setItem({ ...item, title: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="content title"
          value={item.title_content}
          onChange={(e) => setItem({ ...item, title_content: e.target.value })}
        />
        <textarea
          style={{ width: "100%", height: 200 }}
          placeholder="content"
          value={item.content}
          onChange={(e) => setItem({ ...item, content: e.target.value })}
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
