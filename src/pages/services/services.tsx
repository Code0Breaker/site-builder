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

    useEffect(()=>{
        (async()=>{
            const {data} = await getServices()
            const itemsData = await getServiceItems()
            setService(itemsData.data)
            setServices(data)
        })()
    },[])

    useEffect(()=>{
      setItem({
        // ...item,
        description:'',
        title:'',
        srevice_id:'',
        image:''
    })
    },[openServiceItemCreate])

    const openEditService = (item:IServices) =>{
        setOpenServiceEdit(true)
        setSelectedService(item)
        setTitle(item.translates[0].title)
    }

    const openEditServiceItem = (item:IServiceItem) =>{
        setOpenServiceItemEdit(true)
        setSelectedServiceItem(item)
        console.log((item.translates[0]));
        
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
        await serviceEdit({ translates: {en: {title} }, status:1, _method:"put" }, selectedService?.id as number)
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
        await serviceCreate({translates:{en:{title}}, status:1})
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
      
          form.append("translates[en][title]", item.title);
          form.append("translates[en][description]", item.description);
          form.append("service_id", item.srevice_id);
          form.append("status", "1");
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
      
          form.append("translates[en][title]", item.title);
          form.append("translates[en][description]", item.description);
          form.append("service_id", item.srevice_id);
          form.append("status", "1");
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
  
    return(
        <FlexColumn>
                <Dialog
                  fullWidth
                  open={openServiceCreate}
                  onClose={() => setOpenServiceCreate(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Create Service title"}</DialogTitle>

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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                  fullWidth
                  open={openServiceEdit}
                  onClose={() => setOpenServiceEdit(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Edit Service title"}</DialogTitle>

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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceCreate(false)}>Cancel</Button>
                    <Button onClick={editItem} autoFocus>
                      Edit
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  fullWidth
                  open={openServiceItemCreate}
                  onClose={() => setOpenServiceItemCreate(false)}
                  aria-labelledby="alert-dialog-titles"
                  aria-describedby="alert-dialog-descriptions"
                >
                  <DialogTitle id="alert-dialog-titles">{"Create Service item"}</DialogTitle>

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
                        <OutlinedInput
                        placeholder="Title"
                        value={item.title}
                        onChange={(e) => setItem({...item,title:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => setItem({...item,description:e.target.value})}
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
                  fullWidth
                  open={openServiceItemEdit}
                  onClose={() => setOpenServiceItemEdit(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Edit Service item"}</DialogTitle>
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
                      // width: window.innerWidth > 600 ? "500px" : "auto",
                    }}
                  >
                    <OutlinedInput

                      placeholder="Title"
                      value={item.title}
                      onChange={(e) => setItem({...item,title:e.target.value})}
                    />

                    <OutlinedInput

                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => setItem({...item,description:e.target.value})}
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
                      Edit
                    </Button>
                  </DialogActions>
                </Dialog>

        <Box mb={3}>
            <IconButton 
            onClick={()=>setOpenServiceCreate(true)}
            >
                <AddIcon/>
            </IconButton>
            <Typography>Service titles</Typography>
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
        

        <Box mb={3}>
            <IconButton 
            onClick={()=>setOpenServiceItemCreate(true)}
            >
                <AddIcon/>
            </IconButton>
        </Box>
        <Typography>Service Items</Typography>
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