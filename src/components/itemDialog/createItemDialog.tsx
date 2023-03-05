import uploadIcon from '../../assets/upload-icon.png'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { createItem } from "../../api/portfolio";
import { useParams } from "react-router-dom";
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getLanguages } from '../../api/languages';
import { ILanguages } from '../../pages/languages/types';
import { Box } from '@mui/system';
export const ItemDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar } = useSnackbar();
  const [langs, setLangs] = useState<ILanguages[]|null>(null)
  const [currentLang,setCurrentLang] = useState('en')
  const [titleFocuse, setTitleFocuse] = useState(false)
  const [titleContentFocuse, setTitleContentFocuse] = useState(false)
  const [contentFocuse, setContentFocuse] = useState(false)
  const { id } = useParams();
  const [item, setItem] = useState<{
    image: any;
  }>({
    image: null,
  });
  const [fields, setFields] = useState<{
    [key:string]:{
      title: string;
      title_content: string;
      content: string;
    }
  }[]>([
    {
      en:{
        title: "",
        title_content: "",
        content: "",
      }
    }
  ])

  useEffect(() => {
    (async()=>{
      const {data} = await getLanguages()
      setLangs(data)
      const dynamicFields = data.map((item:ILanguages)=>{
        return {
          [item.short_code]:{
            title: "",
            title_content: "",
            content: "",
          }
        }
      })

      setFields(dynamicFields);
      
    })()
   }, [open])

  const create = async () => {
    const form = new FormData();

    if (item.image) {
      form.append("image", item.image);
    }
    fields.map(item=>{
      for(const key in item){
        for(const field in item[key]){
          //@ts-ignore
          form.append(`translates[${key}][${field}]`, item[key][field]);
        }
      }
    })
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
    maxWidth={'lg'}
scroll={'body'}
    fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Create item"}</DialogTitle>
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
              <FlexAlignCenter justifyContent={'center'} width={'150px'} height={'100px'}>
                <img src={uploadIcon} width={"100px"}/>
              </FlexAlignCenter>
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



                <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setTitleFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setTitleFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].title}
                    onChange={ ( event:any, editor:any ) => {
                        if(titleFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, title: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />


                  <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setTitleContentFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setTitleContentFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].title_content}
                    onChange={ ( event:any, editor:any ) => {
                        if(titleContentFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, title_content: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />


              <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setContentFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setContentFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].content}
                    onChange={ ( event:any, editor:any ) => {
                        if(contentFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, content: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
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
