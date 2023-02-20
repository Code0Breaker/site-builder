import { MenuItem, Rating, Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import Button from "@mui/material/Button/Button"
import Card from "@mui/material/Card/Card"
import CardActions from "@mui/material/CardActions/CardActions"
import CardContent from "@mui/material/CardContent/CardContent"
import CardMedia from "@mui/material/CardMedia/CardMedia"
import Dialog from "@mui/material/Dialog/Dialog"
import DialogActions from "@mui/material/DialogActions/DialogActions"
import DialogContent from "@mui/material/DialogContent/DialogContent"
import DialogTitle from "@mui/material/DialogTitle/DialogTitle"
import FormControl from "@mui/material/FormControl/FormControl"
import IconButton from "@mui/material/IconButton/IconButton"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"
import Select from "@mui/material/Select/Select"
import AddIcon from '@mui/icons-material/Add';
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useEffect, useState } from "react"
import { createProject, editProject, getProjectCategory, getProjects, removeProjects } from "../../api/projectApi"
import { Flex, FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { ICategories } from "../category/types"
import { IProject } from "./types"
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';

import { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSnackbar } from "../../types/outletTypes/outletTypes"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Projects = () =>{
    const {setOpenSnacBar,setErrorText} = useSnackbar();
    const [projects, setProjects] = useState<IProject[]|null>(null)
    const [categories, setCategories] = useState<ICategories[]|null>(null)
    const [project, setProject] = useState<{
        link:string,
        client:string,
        rating:number|null,
        title:string,
        short_description:string,
        description:string,
        complete_date:any,
        image:any,
        uri:string
    }>({
        client:'',
        complete_date:'',
        description:'',
        image:null,
        link:'',
        rating:0,
        short_description:'',
        title:'',
        uri:''
    })
    const [selectedProjectItem, setSelectedProjectItem] = useState<IProject|null>(null)

    const [openServiceCreate, setOpenServiceCreate] = useState(false)
    const [openServiceEdit, setOpenServiceEdit] = useState(false)
    const theme = useTheme();
    const [categoryName, setcategoryName] = useState<string[]>([]);
    const [categoryIds, setcategoryIds] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof categoryName>) => {
        const {
          target: { value },
        } = event;
        setcategoryName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
        const newArr:any = []
        if(Array.isArray(value)){
            value.map(item=>{
                newArr.push(categories?.find(pr=>pr.translates[0].title === item)?.id)
            })
        }
        setcategoryIds(newArr);
        

      };

      console.log(categoryIds);


    useEffect(()=>{
        (async()=>{
            const {data} = await getProjects()
            const categoryData = await getProjectCategory()
            setCategories(categoryData.data)
            setProjects(data.data)
        })()
    },[])



    const openEditProject = (item:IProject) =>{
        setOpenServiceEdit(true)
        setSelectedProjectItem(item)

        setProject({
            ...project,
            description:item.translates[0].description,
            title:item.translates[0].title,
            rating:item.rating,
            client:item.client,
            complete_date:item.complete_date,
            link:item.link,
            short_description:item.translates[0].short_description,
            uri:item.uri
        })
    }

 

    const projectCreate = async() => {
        try {
          const form = new FormData()
          if (project.image) {
            form.append("image", project.image);
          }

          if(categoryIds.length>0){
                categoryIds.map((item,index)=>{
                    form.append(`categories[${index}]`, item);
                })
            }
      
          form.append("translates[en][title]", project.title);
          form.append("translates[en][description]", project.description);
          form.append("translates[en][short_description]", project.short_description);
          form.append("rating", project.rating?.toString()||'');
          form.append("complete_date", project.complete_date);
          form.append("uri", project.uri);
          form.append("link", project.link);
          form.append("status", "1");
          await createProject(form)
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

    const projectEdit = async() => {
        
          try {
            const form = new FormData()
            if (project.image) {
              form.append("image", project.image);
            }
  
            if(categoryIds.length>0){
                  categoryIds.map((item,index)=>{
                      form.append(`categories[${index}]`, item);
                  })
              }
        
            form.append("translates[en][title]", project.title);
            form.append("translates[en][description]", project.description);
            form.append("translates[en][short_description]", project.short_description);
            form.append("rating", project.rating?.toString()||'');
            form.append("complete_date", project.complete_date);
            form.append("uri", project.uri);
            form.append("link", project.link);
            form.append("status", "1");
            form.append("_method", "put");
            await editProject(form, selectedProjectItem?.id as number)
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
          await removeProjects(id)
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

    function getStyles(name: string, categoryName: readonly string[], theme: Theme) {
        return {
          fontWeight:
            categoryName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }
  
    return(
        <FlexColumn>
 

                 <Dialog
                  fullWidth
                  open={openServiceCreate}
                  onClose={() => setOpenServiceCreate(false)}
                  aria-labelledby="alert-dialog-titles"
                  aria-describedby="alert-dialog-descriptions"
                >
                  <DialogTitle id="alert-dialog-titles" sx={{alignItems:'center', display:'flex', gap:2}}>
                    {"Create Service item"}
                    <Rating name="read-only" value={project.rating} onChange={(event, newValue) => setProject({...project,rating:newValue})} />  
                  </DialogTitle>

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
            {project.image ? (
              <img
                src={project.image && URL.createObjectURL(project.image)}
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
                setProject({ ...project, image: e?.target?.files?.[0] })
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
                        value={project.title}
                        onChange={(e) => setProject({...project,title:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Client"
                        value={project.client}
                        onChange={(e) => setProject({...project,client:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Description"
                        value={project.description}
                        onChange={(e) => setProject({...project,description:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Short Description"
                        value={project.short_description}
                        onChange={(e) => setProject({...project,short_description:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Link"
                        value={project.link}
                        onChange={(e) => setProject({...project,link:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Uri"
                        value={project.uri}
                        onChange={(e) => setProject({...project,uri:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Complete date"
                        type={'date'}
                        value={project.complete_date}
                        onChange={(e) => setProject({...project,complete_date:e.target.value})}
                        />

                        

                         

                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={categoryName}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {categoryName.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {categories?.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.translates[0].title}
                              style={getStyles(name.translates[0].title, categoryName, theme)}
                            >
                              {name.translates[0].title}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceCreate(false)}>Cancel</Button>
                    <Button 
                    onClick={projectCreate} 
                    autoFocus>
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
                  <DialogTitle id="alert-dialog-titles" sx={{alignItems:'center', display:'flex', gap:2}}>
                    {"Edit Service item"}
                    <Rating name="read-only" value={project.rating} onChange={(event, newValue) => setProject({...project,rating:newValue})} />  
                  </DialogTitle>
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
            {project.image ? (
              <img
                src={project.image && URL.createObjectURL(project.image)}
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
                setProject({ ...project, image: e?.target?.files?.[0] })
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
                        value={project.title}
                        onChange={(e) => setProject({...project,title:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Client"
                        value={project.client}
                        onChange={(e) => setProject({...project,client:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Description"
                        value={project.description}
                        onChange={(e) => setProject({...project,description:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Short Description"
                        value={project.short_description}
                        onChange={(e) => setProject({...project,short_description:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Link"
                        value={project.link}
                        onChange={(e) => setProject({...project,link:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Uri"
                        value={project.uri}
                        onChange={(e) => setProject({...project,uri:e.target.value})}
                        />

                        <OutlinedInput
                        placeholder="Complete date"
                        type={'date'}
                        value={project.complete_date}
                        onChange={(e) => setProject({...project,complete_date:e.target.value})}
                        />

                        

                         

                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={categoryName}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {categoryName.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {categories?.map((name) => (
                            <MenuItem
                              key={name.id}
                              value={name.translates[0].title}
                              style={getStyles(name.translates[0].title, categoryName, theme)}
                            >
                              {name.translates[0].title}
                            </MenuItem>
                          ))}
                        </Select>
                        </FormControl>

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenServiceEdit(false)}>Cancel</Button>
                    <Button onClick={projectEdit} autoFocus>
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
            <Typography>Projects</Typography>
        </Box>
        <PaperBox>
            <Flex flexWrap={'wrap'} width={'100%'} gap={3}>
            {
                projects?.map(item=>{
                    return(
                        <Card sx={{ minWidth: 245 }} key={item.id}>
                          <CardContent>
                            <CardMedia 
                                sx={{ height: 140 }}
                                title="img"
                                image={item?.image?.url}
                            />
                            <Typography gutterBottom variant="h5" component="div">
                               {item.client}
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
                            onClick={()=>openEditProject(item)}
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

export default Projects