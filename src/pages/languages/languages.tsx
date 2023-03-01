import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import { useEffect, useState } from "react";

import {
  editLanguage,
  getLanguages,
  removeLanguage,
} from "../../api/languages";
import {
  Flex,
  FlexAlignCenter,
  FlexCenter,
  FlexColumn,
  PaperBox,
} from "../../models/boxes";
import { ILanguages } from "./types";
import AddIcon from "@mui/icons-material/Add";
import { CreateLanguageDialog } from "../../components/languages/createLanguageDialog";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import uploadIcon from '../../assets/upload-icon.png'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Languages = () => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const [langs, setLangs] = useState<ILanguages[] | null>(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [selected, setSelected] = useState<ILanguages | null>(null);
  const [language, setLanguage] = useState({
    title: selected?.title || "",
    description: selected?.short_code || "",
  });
  useEffect(() => {
    (async () => {
      const data = await getLanguages();
      setLangs(data.data);
    })();
  }, []);

  const remove = async (id: number) => {
    try {
      await removeLanguage(id);
    } catch (error: any) {
      console.log(error.response);

      // let errors:any[] = Object.values(error.response.data.errors).flat(1)
      // for(let err of errors){
      setErrorText(error.response.data.message);
      //   break
      // }
      setOpenSnacBar(true);
    }
  };

  const edit = async () => {
    try {
      const form = new FormData();

      if (image) {
        form.append("image", image);
      }

      form.append("title", language.title);
      form.append("description", language.description);
      form.append("status", "1");
      form.append("is_default", "1");
      form.append("_method", "put");
      form.append("short_code", language.title.toLowerCase().substring(0, 3));
      form.append("code", language.title.toLowerCase().substring(0, 3));
      const data = await editLanguage(form, selected?.id as number);
      if (data.success === true) {
        window.location.reload();
      }
      console.log(data);
    } catch (error: any) {
      console.log(error.response);

      let errors: any[] = Object.values(error.response.data.errors).flat(1);
      for (let err of errors) {
        setErrorText(err);
        break;
      }
      setOpenSnacBar(true);
    }
  };

  const openEditModal = (id: ILanguages) => {
    setSelected(id);
    setOpenEdit(!openEdit);
  };

  return (
    <FlexColumn>
      <CreateLanguageDialog open={open} setOpen={setOpen} />
      <Dialog
      maxWidth={'lg'}
      scroll={'body'}
      fullWidth
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit language"}</DialogTitle>
        <DialogContent
          sx={{ width: window.innerWidth > 600 ? "500px" : "auto" }}
        >
          <label htmlFor="upload-flag">
            <FlexAlignCenter
              justifyContent={"center"}
              sx={{ cursor: "pointer" }}
              width={100}
              height={100}
            >
              {image ? (
                <img
                  src={image && URL.createObjectURL(image)}
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
                setImage(e?.target?.files?.[0])
              }
              type="file"
              accept="image/png, image/gif, image/jpeg"
              hidden
              id="upload-flag"
            />
          </label>
          <OutlinedInput
            placeholder="Language name"
            value={language.title}
            onChange={(e) =>
              setLanguage({ ...language, title: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={edit} autoFocus>
          Save
          </Button>
        </DialogActions>
      </Dialog>
      <Box mb={3}>
      <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpen(true)}>create</Button>
      </Box>
      <PaperBox width={"100%"}>
        <Flex flexWrap={"wrap"} gap={3} width={"100%"}>
          {langs?.map((item) => {
            return (
              <FlexAlignCenter
                width={200}
                height={50}
                sx={{ cursor: "pointer" }}
              >
                <Typography>{item.title}</Typography>
                <IconButton onClick={() => openEditModal(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => remove(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </FlexAlignCenter>
            );
          })}
        </Flex>
      </PaperBox>
    </FlexColumn>
  );
};

export default Languages;
