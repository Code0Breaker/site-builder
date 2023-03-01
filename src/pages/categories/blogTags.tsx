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
  Flex,
  FlexAlignCenter,
  FlexCenter,
  FlexColumn,
  PaperBox,
} from "../../models/boxes";

import AddIcon from "@mui/icons-material/Add";
import { CreatePageDialog } from "../../components/languages/createPageDialog";
import EditIcon from "@mui/icons-material/Edit";
import { getMenus, removeMenu } from "../../api/pagesApi";
import { EditPageDialog } from "../../components/languages/editPageDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createBlogTag,
  editBlogTag,
  getBlogTag,
  removeBlogTag,
} from "../../api/blogApi";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
const BlogTags = () => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const [tags, setTags] = useState<
    | {
        created_at: string | null;
        id: number;
        name: string;
        updated_at: string | null;
      }[]
    | null
  >(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [name, setName] = useState("");
  // const [openPages, setOpenPages] = useState(false)
  const [selectedTag, setSelectedTag] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getBlogTag();
      setTags(data.data);
    })();
  }, []);

  const openEditModal = (id: number) => {
    setOpenEdit(true);
    setSelectedTag(id);
    setName(tags?.find((item) => item.id === id)?.name as string);
  };

  const remove = async (id: number) => {
    try {
      const data = await removeBlogTag(id);
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

  const create = async () => {
    try {
      const data = await createBlogTag(name);
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

  const edit = async () => {
    try {
      const data = await editBlogTag(
        { name: name, _method: "put" },
        selectedTag as number
      );
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
    <FlexColumn>
      <Dialog
      maxWidth={'sm'}
      scroll={'body'}
      fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create tag"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            gap: 3,
            width: window.innerWidth > 600 ? "500px" : "auto",
          }}
        >
          <OutlinedInput
          fullWidth
            placeholder="Enter blog tag name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={create} autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
      maxWidth={'lg'}
      scroll={'body'}
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit tag"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            gap: 3,
            width: window.innerWidth > 600 ? "500px" : "auto",
          }}
        >
          <OutlinedInput
          fullWidth
            placeholder="Enter blog tag name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={edit} autoFocus>
          Save
          </Button>
        </DialogActions>
      </Dialog>
      <Box mb={3}>
      <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpen(true)}>create</Button>
      </Box>

      <PaperBox>
        <Flex flexWrap={"wrap"} width={"100%"} gap={3}>
          {tags?.map((item) => {
            return (
              <FlexAlignCenter
                width={200}
                height={50}
                sx={{ cursor: "pointer" }}
              >
                <Typography>{item.name}</Typography>
                <IconButton onClick={() => openEditModal(item.id)}>
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

export default BlogTags;
