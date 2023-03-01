import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createProjectCategory, editProjectCategory, getProjectCategory, removeProjectCategory } from "../../api/projectApi";
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { ICategories } from "./types";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import uploadIcon from '../../assets/upload-icon.png'
import { ILanguages } from "../languages/types";
import { getLanguages } from "../../api/languages";
import { Switcher, SwitcherType } from "../../components/switcher/switcher";

const Categories = () =>{
    const { setOpenSnacBar, setErrorText } = useSnackbar();
    const [categories, setCategories] = useState<ICategories[] | null>(null);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [categoryName, setCategoryName] = useState({
      name: "",
      description: "",
    });
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [image, setImage] = useState<any>(null);
    const [langs, setLangs] = useState<ILanguages[]|null>(null)
    const [currentLang,setCurrentLang] = useState('en')
    const [status, setStatus] = useState<'0'|'1'>('0')
    const [type, setType] = useState<'1'|'2'>('1')
    const [fields, setFields] = useState<{
      [key:string]:{
        title:string,
        description: string,
      }
    }[]>([
      {
        en:{
          title:"",
          description: "",
        }
      }
    ])
    useEffect(() => {
      (async () => {
        const languages = await getLanguages()
      setLangs(languages.data)
      const dynamicFields = languages.data.map((item:ILanguages)=>{
        return {
          [item.short_code]:{
            title:"",
            description: "",
          }
        }
      })
      setFields(dynamicFields)
        const data = await getProjectCategory();
        setCategories(data.data);
      })();
    }, []);
  
    const openEditModal = (id: ICategories) => {
       
      setSelectedCategory(id.id);
      setOpenEdit(true);
      setFields(id.translates.map(itm=>{
        return{
          [itm.language.short_code]:{
            description:itm.description,
            title:itm.title,
          }
        }
      }))
    };
  
    const remove = async (id: number) => {
      try {
        const data = await removeProjectCategory(id);
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
  
        fields.map(item=>{
          for(const key in item){
            for(const field in item[key]){
              //@ts-ignore
              form.append(`translates[${key}][${field}]`, item[key][field]);
            }
          }
        })
        form.append("status", status);
        form.append("type", type);
        const data = await createProjectCategory(form);
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
  
        fields.map(item=>{
          for(const key in item){
            for(const field in item[key]){
              //@ts-ignore
              form.append(`translates[${key}][${field}]`, item[key][field]);
            }
          }
        })
        form.append("status", status);
        form.append("type", type);
        form.append("_method", "put");
        const data = await editProjectCategory(form, selectedCategory as number);
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
    return(
        <FlexColumn>
        <Dialog
        maxWidth={'lg'}
        scroll={'body'}
          fullWidth
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Create category"}</DialogTitle>
          <FlexCenter>
        <FlexAlignCenter gap={3}>
          {
            langs?.map(item=>{
              return(
                <Box 
                  onClick={()=>setCurrentLang(item.short_code)}
                  component={'img'} 
                  src={item.image.url} 
                  width={50} 
                  height={38}
                  sx={{
                    objectFit:'cover',
                    cursor:'pointer',
                    border:currentLang === item.short_code?'1px solid red':'',
                    borderRadius:3
                  }}/>
              )
            })
          }
        </FlexAlignCenter>
      </FlexCenter>
      <FlexCenter mt={3} mb={3}>
          <SwitcherType checked={type} setChecked={setType}/>
        </FlexCenter>
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
              <FlexAlignCenter justifyContent={'center'} width={'150px'} height={'100px'}>
                <img src={uploadIcon} width={"100px"}/>
              </FlexAlignCenter>
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
          <FlexCenter>
          <Switcher checked={status} setChecked={setStatus}/>
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
              value={fields[fields.findIndex(item=>item[currentLang])][currentLang].title}
              onChange={(e) => {
                  const updatedFields = [...fields];
                  const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                  const currentLanguage = updatedFields[languageIndex][currentLang];
                  const updatedLanguage = {...currentLanguage, title: e.target.value};
                  updatedFields[languageIndex][currentLang] = updatedLanguage; 
                  setFields(updatedFields); 
                }
              }
            />
            <OutlinedInput
              placeholder="Enter category description"
              value={fields[fields.findIndex(item=>item[currentLang])][currentLang].description}
              onChange={(e) => {
                  const updatedFields = [...fields];
                  const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                  const currentLanguage = updatedFields[languageIndex][currentLang];
                  const updatedLanguage = {...currentLanguage, description: e.target.value};
                  updatedFields[languageIndex][currentLang] = updatedLanguage; 
                  setFields(updatedFields); 
                }
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
        maxWidth={'lg'}
        scroll={'body'}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit category"}</DialogTitle>
          <FlexCenter>
        <FlexAlignCenter gap={3}>
          {
            langs?.map(item=>{
              return(
                <Box 
                  onClick={()=>setCurrentLang(item.short_code)}
                  component={'img'} 
                  src={item.image.url} 
                  width={50} 
                  height={38}
                  sx={{
                    objectFit:'cover',
                    cursor:'pointer',
                    border:currentLang === item.short_code?'1px solid red':'',
                    borderRadius:3
                  }}/>
              )
            })
          }
        </FlexAlignCenter>
      </FlexCenter>
      <FlexCenter mt={3} mb={3}>
          <SwitcherType checked={type} setChecked={setType}/>
        </FlexCenter>
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
              <FlexAlignCenter justifyContent={'center'} width={'150px'} height={'100px'}>
                <img src={uploadIcon} width={"100px"}/>
              </FlexAlignCenter>
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
          <FlexCenter>
          <Switcher checked={status} setChecked={setStatus}/>
        </FlexCenter>
          <DialogContent
            sx={{
              display: "flex",
              gap: 3,
              width: window.innerWidth > 600 ? "500px" : "auto",
            }}
          >
            <OutlinedInput
              placeholder="Enter category name"
              value={fields[fields.findIndex(item=>item[currentLang])][currentLang].title}
              onChange={(e) =>{
                const updatedFields = [...fields];
                  const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                  const currentLanguage = updatedFields[languageIndex][currentLang];
                  const updatedLanguage = {...currentLanguage, title: e.target.value};
                  updatedFields[languageIndex][currentLang] = updatedLanguage; 
                  setFields(updatedFields); 
              }}
            />
            <OutlinedInput
              placeholder="Enter category description"
              value={fields[fields.findIndex(item=>item[currentLang])][currentLang].description}
              onChange={(e) =>{
                const updatedFields = [...fields];
                  const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                  const currentLanguage = updatedFields[languageIndex][currentLang];
                  const updatedLanguage = {...currentLanguage, description: e.target.value};
                  updatedFields[languageIndex][currentLang] = updatedLanguage; 
                  setFields(updatedFields); 
              }}
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
    )
}

export default Categories