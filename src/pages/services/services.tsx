import { Button, Card, CardActions, CardContent, CardMedia, IconButton, MenuItem, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getServiceItems, getServices, removeServiceItem, removeServiceTitle, serviceCreate, serviceEdit, serviceItemCreate, serviceItemEdit } from "../../api/services"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { IServiceItem, IServices } from "./types"
import AddIcon from '@mui/icons-material/Add';
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import OutlinedInput from "@mui/material/OutlinedInput"
import DialogActions from "@mui/material/DialogActions"
import Dialog from "@mui/material/Dialog"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import { ILanguages } from "../languages/types"
import { getLanguages } from "../../api/languages"

import uploadIcon from '../../assets/upload-icon.png'
import { Switcher } from "../../components/switcher/switcher"

const Services = () =>{
    const {setOpenSnacBar,setErrorText} = useSnackbar();
    const [services, setServices] = useState<IServices[]|null>(null)
    const [service, setService] = useState<IServiceItem[]|null>(null)

    const [selectedService, setSelectedService] = useState<IServices|null>(null)
    const [selectedServiceItem, setSelectedServiceItem] = useState<IServiceItem|null>(null)

    const [openServiceCreate, setOpenServiceCreate] = useState(false)
    const [openServiceEdit, setOpenServiceEdit] = useState(false)

    const [openServiceItemCreate, setOpenServiceItemCreate] = useState(false)
    const [openServiceItemEdit, setOpenServiceItemEdit] = useState(false)

    const [title, setTitle] = useState('')
    const [item, setItem] = useState<{
        title:string,
        description:string,
        image:any,
        srevice_id:string
    }>({
        title:'',
        description:'',
        image:null,
        srevice_id:''
    })
    const [langs, setLangs] = useState<ILanguages[]|null>(null)
    const [currentLang,setCurrentLang] = useState('en')
    const [status, setStatus] = useState<'0'|'1'>('0')
    const [fieldsTitles, setFieldsTitles] = useState<{
      [key:string]:{
        title:string
      }
    }[]>([
      {
        en:{
          title:''
        }
      }
    ])
    const [fieldsItems, setFieldsItems] = useState<{
      [key:string]:{
        description:string
        title:string
      }
    }[]>([
      {
        en:{
          description:"",
          title:""
        }
      }
    ])


    useEffect(()=>{
        (async()=>{
            const languages = await getLanguages()
            setLangs(languages.data)
            setFieldsTitles(languages.data.map((lng:ILanguages)=>{
              return{
                [lng.short_code]:{
                  title:''
                }
              }
            }))
            const {data} = await getServices()
            const itemsData = await getServiceItems()
            setFieldsItems(
              languages.data.map((lng:ILanguages)=>{
                return{
                  [lng.short_code]:{
                    description:"",
                    title:""
                  }
                }
              })
            )
            setService(itemsData.data)
            setServices(data)
        })()
    },[openServiceItemCreate, openServiceCreate])

 

    const openEditService = (item:IServices) =>{
        setOpenServiceEdit(true)
        setSelectedService(item)
        setFieldsTitles(
          item.translates.map(service=>{
          return{
            [service.language.short_code]:{
              title:service.title
            }
          }
        }))
       
    }

    const openEditServiceItem = (item:IServiceItem) =>{
        setOpenServiceItemEdit(true)
        setSelectedServiceItem(item)
        console.log((item.translates[0]));
        setFieldsItems(item.translates.map(itm=>{
          return{
            [itm.language.short_code]:{
              description:itm.description,
              title:itm.title,
            }
          }
        }))
        setItem({
            // ...item,
            description:item.translates[0].description,
            title:item.translates[0].title,
            srevice_id:item.translates[0].service_item_id.toString(),
            image:''
        })
    }

    const editItem = async() =>{
      try {
        const obj:any = {
          translates: {}
        };
        fieldsTitles.map(item=>{
          const [key] = Object.keys(item);
          obj.translates[key] = item[key];
        })
        await serviceEdit({ ...obj, status, _method:"put" }, selectedService?.id as number)
        window.location.reload()
      } catch (error:any) {
        let errors:any[] = Object.values(error.response.data.errors).flat(1)
        for(let err of errors){
          setErrorText(err)
          break
        }
        setOpenSnacBar(true)
      }
      
        
    }

    const createService = async() =>{
      try {
        const obj:any = {
          translates: {}
        };
        fieldsTitles.map(item=>{
          const [key] = Object.keys(item);
          obj.translates[key] = item[key];
        })

        await serviceCreate({...obj,status})
        window.location.reload()
      } catch (error:any) {
        let errors:any[] = Object.values(error.response.data.errors).flat(1)
        for(let err of errors){
          setErrorText(err)
          break
        }
        setOpenSnacBar(true)
      }
    }

    const createServiceItem = async() => {
     
      try {
        const form = new FormData()

        if (item.image) {
            form.append("image", item.image);
          }
      
          fieldsItems.map(item=>{
            for(const key in item){
              for(const field in item[key]){
                //@ts-ignore
                form.append(`translates[${key}][${field}]`, item[key][field]);
              }
            }
          })
          form.append("service_id", item.srevice_id);
          form.append("status", status);
          await serviceItemCreate(form)
          window.location.reload()
      } catch (error:any) {
        let errors:any[] = Object.values(error.response.data.errors).flat(1)
        for(let err of errors){
          setErrorText(err)
          break
        }
        setOpenSnacBar(true)
      }
        
    }

    const editServiceItem = async() => {
      try {
        const form = new FormData()

        if (item.image) {
            form.append("image", item.image);
          }
      
          fieldsItems.map(item=>{
            for(const key in item){
              for(const field in item[key]){
                //@ts-ignore
                form.append(`translates[${key}][${field}]`, item[key][field]);
              }
            }
          })
          form.append("service_id", item.srevice_id);
          form.append("status", status);
          form.append("_method", "put");

          await serviceItemEdit(form, selectedServiceItem?.id as number)
          window.location.reload()
      } catch (error:any) {
        let errors:any[] = Object.values(error.response.data.errors).flat(1)
        for(let err of errors){
          setErrorText(err)
          break
        }
        setOpenSnacBar(true)
      }
    }

    const removeItem = async(id:number) =>{
     
        try {
          await removeServiceTitle(id)
          window.location.reload()
         } catch (error:any) {
          let errors:any[] = Object.values(error.response.data.errors).flat(1)
          for(let err of errors){
            setErrorText(err)
            break
          }
          setOpenSnacBar(true)
        }   
    }

    const removeTitle = async(id:number) =>{
      try {
        await removeServiceItem(id)
        window.location.reload()
      } catch (error:any) {
        let errors:any[] = Object.values(error.response.data.errors).flat(1)
        for(let err of errors){
          setErrorText(err)
          break
        }
        setOpenSnacBar(true)
      }  
    }
    console.log(fieldsItems,'fieldsItems');

    return(
        <FlexColumn>
                <Dialog
                maxWidth={'sm'}
                scroll={'body'}
                  fullWidth
                  open={openServiceCreate}
                  onClose={() => setOpenServiceCreate(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Create Service title"}</DialogTitle>
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
                  <DialogContent
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexDirection: "row",
                      flexWrap:'wrap',
                      justifyContent:'center'
                      // width: window.innerWidth > 600 ? "500px" : "auto",
                    }}
                  >
                    <OutlinedInput
                      placeholder="Name"
                      value={fieldsTitles[fieldsTitles.findIndex(item=>item[currentLang])][currentLang].title}
                      onChange={(e) => {
                        const updatedFields = [...fieldsTitles];
                        const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                        const currentLanguage = updatedFields[languageIndex][currentLang];
                        const updatedLanguage = {...currentLanguage, title: e.target.value};
                        updatedFields[languageIndex][currentLang] = updatedLanguage; 
                        setFieldsTitles(updatedFields); 
                      }}
                    />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceCreate(false)}>Cancel</Button>
                    <Button onClick={createService} autoFocus>
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                maxWidth={'sm'}
                scroll={'body'}
                  fullWidth
                  open={openServiceEdit}
                  onClose={() => setOpenServiceEdit(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Edit Service title"}</DialogTitle>
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
                  <DialogContent
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexDirection: "row",
                      flexWrap:'wrap',
                      justifyContent:'center'
                      // width: window.innerWidth > 600 ? "500px" : "auto",
                    }}
                  >
                    <OutlinedInput

                      placeholder="Name"
                      value={fieldsTitles[fieldsTitles.findIndex(item=>item[currentLang])][currentLang].title}
                      onChange={(e) => {
                        const updatedFields = [...fieldsTitles];
                        const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                        const currentLanguage = updatedFields[languageIndex][currentLang];
                        const updatedLanguage = {...currentLanguage, title: e.target.value};
                        updatedFields[languageIndex][currentLang] = updatedLanguage; 
                        setFieldsTitles(updatedFields); 
                      }}
                    />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceCreate(false)}>Cancel</Button>
                    <Button onClick={editItem} autoFocus>
                    Save
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                maxWidth={'lg'}
                scroll={'body'}
                  fullWidth
                  open={openServiceItemCreate}
                  onClose={() => setOpenServiceItemCreate(false)}
                  aria-labelledby="alert-dialog-titles"
                  aria-describedby="alert-dialog-descriptions"
                >
                  <DialogTitle id="alert-dialog-titles">{"Create Service item"}</DialogTitle>
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
                  <FlexCenter mt={2}>
                    <Switcher checked={status} setChecked={setStatus}/>
                  </FlexCenter>
                  <DialogContent
                    sx={{
                      display: "flex",
                      gap: 3,
                      flexDirection: "column",
                      flexWrap:'wrap',
                      justifyContent:'center'
                      // width: window.innerWidth > 600 ? "500px" : "auto",
                    }}
                  >
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
                        <OutlinedInput
                        placeholder="Title"
                        value={fieldsItems[fieldsItems.findIndex(item=>item[currentLang])][currentLang].title}
                        onChange={(e) => {
                          const updatedFields = [...fieldsItems];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, title: e.target.value};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFieldsItems(updatedFields); 
                        }}
                        />

                        <OutlinedInput
                        placeholder="Description"
                        value={fieldsItems[fieldsItems.findIndex(item=>item[currentLang])][currentLang].description}
                        onChange={(e) => {
                          const updatedFields = [...fieldsItems];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, description: e.target.value};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFieldsItems(updatedFields); 
                        }}
                        />

                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Service title</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={item.srevice_id}
                          label="Service title"
                          onChange={(e)=>setItem({...item,srevice_id:e.target.value})}
                        >
                          {services?.map(option=><MenuItem key={option.id} value={option.id}>{option.translates[0].title}</MenuItem>)}
                        </Select>
                        </FormControl>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceCreate(false)}>Cancel</Button>
                    <Button onClick={createServiceItem} autoFocus>
                      Create
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                maxWidth={'lg'}
                scroll={'body'}
                  fullWidth
                  open={openServiceItemEdit}
                  onClose={() => setOpenServiceItemEdit(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Edit Service item"}</DialogTitle>
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
                      // width: window.innerWidth > 600 ? "500px" : "auto",
                    }}
                  >
                    <OutlinedInput

                      placeholder="Title"
                      value={fieldsItems[fieldsItems.findIndex(item=>item[currentLang])][currentLang].title}
                        onChange={(e) => {
                          const updatedFields = [...fieldsItems];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, title: e.target.value};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFieldsItems(updatedFields); 
                        }}
                    />

                    <OutlinedInput

                    placeholder="Description"
                    value={fieldsItems[fieldsItems.findIndex(item=>item[currentLang])][currentLang].description}
                    onChange={(e) => {
                      const updatedFields = [...fieldsItems];
                      const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                      const currentLanguage = updatedFields[languageIndex][currentLang];
                      const updatedLanguage = {...currentLanguage, description: e.target.value};
                      updatedFields[languageIndex][currentLang] = updatedLanguage; 
                      setFieldsItems(updatedFields); 
                    }}
                    />

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Service title</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.srevice_id}
                        label="Service title"
                        onChange={(e)=>setItem({...item,srevice_id:e.target.value})}
                      >
                        {services?.map(option=><MenuItem key={option.id} value={option.id}>{option.translates[0].title}</MenuItem>)}
                      </Select>
                    </FormControl>


                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceCreate(false)}>Cancel</Button>
                    <Button onClick={editServiceItem} autoFocus>
                    Save
                    </Button>
                  </DialogActions>
                </Dialog>

        <Box mb={3}>
          <Typography mb={3} variant={'h3'}>Service titles</Typography>
        <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpenServiceCreate(true)}>create</Button>
        </Box>
        <PaperBox>
            <Flex flexWrap={'wrap'} width={'100%'} gap={3}>
            {
                services?.map(item=>{
                    return(
                        <Card sx={{ minWidth: 245 }} key={item.id}>
                          <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                               {item.translates[0].title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <>Created at {new Date(item.created_at).toLocaleDateString()}</>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button 
                            size="small" 
                            onClick={()=>removeTitle(item.id)} 
                            >Remove</Button>
                            <Button 
                            size="small" 
                            onClick={()=>openEditService(item)}
                            >Edit</Button>
                          </CardActions>
                        </Card>
                    )
                })
            }
            </Flex>
        </PaperBox> 
        
        <Typography mb={3} variant={'h3'}>Service Items</Typography>
        <Box mb={3}>
          <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpenServiceItemCreate(true)}>create</Button>
        </Box>
        <PaperBox>
            <Flex flexWrap={'wrap'} width={'100%'} gap={3}>
            {
                service?.map(item=>{
                    return(
                        <Card sx={{ minWidth: 245 }} key={item.id}>
                          <CardContent>
                            <CardMedia 
                            sx={{ height: 140 }}
                            image={item?.image?.url}
                            title="img"
                            />
                            <Typography gutterBottom variant="h5" component="div">
                               {item.translates[0].title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <>Created at {new Date(item.created_at).toLocaleDateString()}</>
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button 
                            size="small" 
                            onClick={()=>removeItem(item.id)} 
                            >Remove</Button>
                            <Button 
                            size="small" 
                            onClick={()=>openEditServiceItem(item)}
                            >Edit</Button>
                          </CardActions>
                        </Card>
                    )
                })
            }
            </Flex>
        </PaperBox> 
    </FlexColumn>
    )
}

export default Services