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
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import { editAllPage } from "../../api/allPages";
import { IAllPages } from "../../pages/allPages/types";

export const EditGlobalPageDialog = ({
  open,
  setOpen,
  id,
}: {
  id: IAllPages;
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const [page, setPage] = useState<{
    name: string;
    uri: string;
    url: string;
    header_title: string;
    header_description: string;
    content: string;
    footer_title: string;
    footer_description: string;
    meta_data: string;
    image: any;
  }>({
    image: null,
    content: id.translates?.[0]?.content || "",
    footer_description: id.translates?.[0]?.footer_description || "",
    footer_title: id.translates?.[0]?.footer_title || "",
    header_description: id.translates?.[0]?.header_description || "",
    header_title: id.translates?.[0]?.header_title || "",
    meta_data: id.translates?.[0]?.meta_data || "",
    name: id.name || "",
    uri: id.uri || "",
    url: id.url || "",
  });

  const save = async () => {
    try {
      const form = new FormData();

      if (page.image) {
        form.append("image", page.image);
      }

      form.append("name", page.name);
      form.append("uri", page.uri);
      form.append("url", page.url);
      form.append("translates[en][header_title]", page.header_title);
      form.append(
        "translates[en][header_description]",
        page.header_description
      );
      form.append("translates[en][content]", page.content);
      form.append("translates[en][footer_title]", page.footer_title);
      form.append(
        "translates[en][footer_description]",
        page.footer_description
      );
      form.append("translates[en][meta_data]", page.meta_data);
      form.append("status", "1");
      form.append("_method", "put");

      const data = await editAllPage(form, id.id);
      if (data.success === true) {
        window.location.reload();
      } else {
        setOpenSnacBar(true);
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
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit page"}</DialogTitle>
      <FlexCenter>
        <label htmlFor="upload-flag">
          <FlexAlignCenter
            justifyContent={"center"}
            sx={{ cursor: "pointer" }}
            width={100}
            height={100}
          >
            {page.image ? (
              <img
                src={page.image && URL.createObjectURL(page.image)}
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
              setPage({ ...page, image: e?.target?.files?.[0] })
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
          placeholder="Name"
          value={page.name}
          onChange={(e) => setPage({ ...page, name: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Uri"
          value={page.uri}
          onChange={(e) => setPage({ ...page, uri: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Url"
          value={page.url}
          onChange={(e) => setPage({ ...page, url: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Header title"
          value={page.header_title}
          onChange={(e) => setPage({ ...page, header_title: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Header description"
          value={page.header_description}
          onChange={(e) =>
            setPage({ ...page, header_description: e.target.value })
          }
        />
        <OutlinedInput
          fullWidth
          placeholder="Content"
          value={page.content}
          onChange={(e) => setPage({ ...page, content: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Footer title"
          value={page.footer_title}
          onChange={(e) => setPage({ ...page, footer_title: e.target.value })}
        />
        <OutlinedInput
          fullWidth
          placeholder="Footer description"
          value={page.footer_description}
          onChange={(e) =>
            setPage({ ...page, footer_description: e.target.value })
          }
        />
        <OutlinedInput
          fullWidth
          placeholder="Meta data"
          value={page.meta_data}
          onChange={(e) => setPage({ ...page, meta_data: e.target.value })}
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
