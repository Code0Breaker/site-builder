import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { createLanguage, getLanguages } from "../../api/languages";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import { useParams } from "react-router-dom";
import { editItem } from "../../api/portfolio";
import { IAllPagesItems } from "../../pages/allPages/types";
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ILanguages } from "../../pages/languages/types";

export const EditGlobalitemDialog = ({
  open,
  setOpen,
  itemId,
}: {
  itemId: IAllPagesItems;
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const { id } = useParams();
  const [currentLang,setCurrentLang] = useState('en')
  const [langs, setLangs] = useState<ILanguages[]|null>(null)
  const [titleFocuse, setTitleFocuse] = useState(false)
  const [fields, setFields] = useState<{
    [key:string]:{
      title:string,
      title_content: string,
      content: string,
    }
  }[]>([
    {
      en:{
        title:'',
        title_content:'',
        content:''
      }
    }
  ])
  const [item, setItem] = useState<{
    image: any;
  }>({
    image: null,
  });


  useEffect(()=>{
    (async()=>{
      const newFields:any[] = []
      itemId.translates.map(item=>{
        const newData:any = {}
        newData[item.language.short_code] = {
          content:item.content,
          title: item.title,
          title_content: item.title_content,
        }
        newFields.push(newData)
      })
      setFields(newFields);
      
      const {data} = await getLanguages()
      setLangs(data)
    })()
  },[])

  const save = async () => {
    try {
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
      form.append("_method", "put");

      const data = await editItem(id as unknown as number, itemId.id, form);
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
    maxWidth={'lg'}
scroll={'body'}
    fullWidth
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit item"}</DialogTitle>
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
                      setTitleFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setTitleFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].title_content}
                    onChange={ ( event:any, editor:any ) => {
                        if(titleFocuse){
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
                      setTitleFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setTitleFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].content}
                    onChange={ ( event:any, editor:any ) => {
                        if(titleFocuse){
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
        <Button onClick={save} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
