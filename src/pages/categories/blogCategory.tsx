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
import {
  createBlogCategory,
  editBlogCategory,
  getBlogCategory,
  removeBlogCategory,
} from "../../api/categoryApi";
import { IBlogCategories } from "./types";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useSnackbar } from "../../types/outletTypes/outletTypes";

const BlogCategories = () => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const [categories, setCategories] = useState<IBlogCategories[] | null>(null);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [categoryName, setCategoryName] = useState({
    name: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getBlogCategory();
      setCategories(data.data);
    })();
  }, []);

  const openEditModal = (id: number) => {
    const findOne = categories?.find((item) => item.id === id);
    setOpenEdit(true);
    setSelectedCategory(id);
    setCategoryName({
      name: findOne?.translates[0].title as string,
      description: findOne?.translates[0].description as string,
    });
  };

  const remove = async (id: number) => {
    try {
      const data = await removeBlogCategory(id);
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
      const form = new FormData();

      if (image) {
        form.append("image", image);
      }

      form.append("translates[en][title]", categoryName.name);
      form.append("translates[en][description]", categoryName.description);
      form.append("status", "1");
      const data = await createBlogCategory(form);
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
      const form = new FormData();

      if (image) {
        form.append("image", image);
      }

      form.append("translates[en][title]", categoryName.name);
      form.append("translates[en][description]", categoryName.description);
      form.append("status", "1");
      form.append("_method", "put");
      const data = await editBlogCategory(form, selectedCategory as number);
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
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create category"}</DialogTitle>
        <FlexCenter>
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
                <InsertPhotoIcon />
              )}
            </FlexAlignCenter>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                e?.target?.files && setImage(e.target.files[0])
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
            placeholder="Enter category name"
            value={categoryName.name}
            onChange={(e) =>
              setCategoryName({ ...categoryName, name: e.target.value })
            }
          />
          <OutlinedInput
            placeholder="Enter category description"
            value={categoryName.description}
            onChange={(e) =>
              setCategoryName({ ...categoryName, description: e.target.value })
            }
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
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit category"}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            gap: 3,
            width: window.innerWidth > 600 ? "500px" : "auto",
          }}
        >
          <OutlinedInput
            placeholder="Enter category name"
            value={categoryName.name}
            onChange={(e) =>
              setCategoryName({ ...categoryName, name: e.target.value })
            }
          />
          <OutlinedInput
            placeholder="Enter category description"
            value={categoryName.description}
            onChange={(e) =>
              setCategoryName({ ...categoryName, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={edit} autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <Box mb={3}>
        <IconButton onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      </Box>

      <PaperBox>
        <Flex flexWrap={"wrap"} width={"100%"} gap={3}>
          {categories?.map((item) => {
            return (
              <FlexAlignCenter
                maxWidth={300}
                height={90}
                sx={{ cursor: "pointer" }}
              >
                <FlexColumn>
                  <Typography>{item.translates[0].title}</Typography>
                  <Typography>{item.translates[0].description}</Typography>
                </FlexColumn>
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

export default BlogCategories;
