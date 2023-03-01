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
import { editMenu } from "../../api/pagesApi";
import { editSocial } from "../../api/socialApi";
import { FlexAlignCenter, FlexCenter } from "../../models/boxes";
import uploadIcon from '../../assets/upload-icon.png'
import { editUsers } from "../../api/usersApi";
import { useSnackbar } from "../../types/outletTypes/outletTypes";
import { editTeam } from "../../api/team";
import { ITeam } from "../../pages/team/types";
import Switch from "@mui/material/Switch";
import { ILanguages } from "../../pages/languages/types";
import { Switcher } from "../switcher/switcher";

export const EditTeamDialog = ({
  open,
  setOpen,
  id,
}: {
  id: ITeam;
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const { setOpenSnacBar, setErrorText } = useSnackbar();
  const [user, setUser] = useState<{
    name_en: string;
    name_ru: string;
    position_en: string;
    position_ru: string;
    image: any;
    status: "0"|"1",
  }>({
    name_en: id.translates?.[0]?.name || "",
    name_ru: id.translates?.[1]?.name || "",
    image: null,
    position_en: id.translates?.[0]?.position || "",
    position_ru: id.translates?.[1]?.position || "",
    status: id.status.toString() as "0"|"1",
  });
  const [langs, setLangs] = useState<ILanguages[]|null>(null)
  const [currentLang,setCurrentLang] = useState('en')
  const [status, setStatus] = useState<'0'|'1'>('0')
  const [fields, setFields] = useState<{
    [key:string]:{
      name:string,
      position: string,
    }
  }[]>([
    {
      en:{
        name:"",
        position: "",
      }
    }
  ])
  useEffect(() => {
    (async()=>{
      const {data} = await getLanguages()
      setLangs(data)
      const dynamicFields = id.translates.map((item)=>{
        return {
          [item.language.short_code]:{
            name:item.name,
            position: item.position,
          }
        }
      })

      setFields(dynamicFields);
      
    })()
   }, [])
  const save = async () => {
    try {
      const form = new FormData();

      if (user.image) {
        form.append("image", user.image);
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
      form.append("_method", "put");

      const data = await editTeam(form, id.id);
      if (data.success === true) {
        window.location.reload();
      } else {
        setOpenSnacBar(true);
      }
    } catch (error: any) {
      // let errors:any[] = Object.values(error.response.data.errors).flat(1)
      // for(let err of errors){
      setErrorText(error.response.data.message);
      //   break
      // }
      setOpenSnacBar(true);
    }
  };

  return (
    <Dialog
    maxWidth={'lg'}
scroll={'body'}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      fullWidth
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Edit team"}</DialogTitle>
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
            {user.image ? (
              <img
                src={user.image && URL.createObjectURL(user.image)}
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
              setUser({ ...user, image: e?.target?.files?.[0] })
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
            fullWidth
          placeholder="Name"
          value={fields[fields.findIndex(item=>item[currentLang])][currentLang].name}
          onChange={(e) => {
            const updatedFields = [...fields];
            const languageIndex = updatedFields.findIndex(item => item[currentLang]);
            const currentLanguage = updatedFields[languageIndex][currentLang];
            const updatedLanguage = {...currentLanguage, name: e.target.value};
            updatedFields[languageIndex][currentLang] = updatedLanguage; 
            setFields(updatedFields); 
          }}
        />
    
        <OutlinedInput
            fullWidth
          placeholder="Position"
          value={fields[fields.findIndex(item=>item[currentLang])][currentLang].position}
          onChange={(e) => {
            const updatedFields = [...fields];
            const languageIndex = updatedFields.findIndex(item => item[currentLang]);
            const currentLanguage = updatedFields[languageIndex][currentLang];
            const updatedLanguage = {...currentLanguage, position: e.target.value};
            updatedFields[languageIndex][currentLang] = updatedLanguage; 
            setFields(updatedFields); 
          }}
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
