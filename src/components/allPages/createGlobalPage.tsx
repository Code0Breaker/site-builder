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
import { useOutletContext } from "react-router-dom";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";

import { createTeam } from "../../api/team";
import { createAllPage } from "../../api/allPages";
import { ILanguages } from "../../pages/languages/types";
import { Switcher } from "../switcher/switcher";
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uploadIcon from '../../assets/upload-icon.png'
import { Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
export const CreateGlobalPageDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const [langs, setLangs] = useState<ILanguages[]|null>(null)
  const [currentLang,setCurrentLang] = useState('en')
  const [status, setStatus] = useState<'0'|'1'>('0')
  const [page, setPage] = useState<{
    name: string;
    uri: string;
    url: string;
    image: any;
  }>({
    name: "",
    uri: "",
    url: "",
    image: null
  });
  const [titleFocuse, setTitleFocuse] = useState(false)
  const [headerDescriptionFocuse, setHeaderDescriptionFocuse] = useState(false)
  const [contentnFocuse, setContentFocuse] = useState(false)
  const [footerTitleFocuse, setFooterTitleFocuse] = useState(false)
  const [footerDescriptionFocuse, setFooterDescriptionFocuse] = useState(false)
  const [fields, setFields] = useState<{
    [key:string]:{
      content:string,
      footer_description: string,
      footer_title: string,
      header_description: string,
      header_title: string,
      meta_data: string,
    }
  }[]>([
    {
      en:{
        content:"",
        footer_description: "",
        footer_title: "",
        header_description: "",
        header_title: "",
        meta_data: "",
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
            content:"",
            footer_description: "",
            footer_title: "",
            header_description: "",
            header_title: "",
            meta_data: "",
          }
        }
      })

      setFields(dynamicFields);
      
    })()
   }, [])

  const create = async () => {
    try {
      const form = new FormData();

      if (page.image) {
        form.append("image", page.image);
      }

      form.append("name", page.name);
      form.append("uri", page.uri);
      form.append("url", page.url);
      fields.map(item=>{
        for(const key in item){
          for(const field in item[key]){
            //@ts-ignore
            form.append(`translates[${key}][${field}]`, item[key][field]);
          }
        }
      })
      form.append("status", status);

      const data = await createAllPage(form);
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
      fullWidth
      maxWidth={'lg'}
      open={open}
      onClose={() => setOpen(false)}
      scroll={'body'}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Create page"}</DialogTitle>
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
            width={150}
            height={120}
          >
            {page.image ? (
              <img
                src={page.image && URL.createObjectURL(page.image)}
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
              setPage({ ...page, image: e?.target?.files?.[0] })
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
          flexDirection: "column",
          flexWrap:'wrap',
          justifyContent:'center'
        }}
      >
        


                 <label>
                  <Typography>Header title</Typography>
                 <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setTitleFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setTitleFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].header_title}
                    onChange={ ( event:any, editor:any ) => {
                        if(titleFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, header_title: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />
                 </label>


                  <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setHeaderDescriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setHeaderDescriptionFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].header_description}
                    onChange={ ( event:any, editor:any ) => {
                        if(headerDescriptionFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, header_description: data};
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
                        if(contentnFocuse){
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

        

                <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setFooterTitleFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setFooterTitleFocuse(false)
                  } } 
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].footer_title}
                    onChange={ ( event:any, editor:any ) => {
                        if(footerTitleFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, footer_title: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />

                <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setFooterDescriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setFooterDescriptionFocuse(false)
                  } } 
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].footer_description}
                    onChange={ ( event:any, editor:any ) => {
                        if(footerDescriptionFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, footer_description: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />

        <TextField 
          label="Name"
          value={page.name}
          onChange={(e) => setPage({ ...page, name: e.target.value })}
        />
        <OutlinedInput
          placeholder="Uri"
          value={page.uri}
          onChange={(e) => setPage({ ...page, uri: e.target.value })}
        />
        <OutlinedInput      
          placeholder="Url"
          value={page.url}
          onChange={(e) => setPage({ ...page, url: e.target.value })}
        />

        <OutlinedInput
          placeholder="Meta data"
          value={fields[fields.findIndex(item=>item[currentLang])][currentLang].meta_data}
          onChange={(e) =>{
            const updatedFields = [...fields];
            const languageIndex = updatedFields.findIndex(item => item[currentLang]);
            const currentLanguage = updatedFields[languageIndex][currentLang];
            const updatedLanguage = {...currentLanguage, meta_data: e.target.value};
            updatedFields[languageIndex][currentLang] = updatedLanguage; 
            setFields(updatedFields); 
          }}
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
