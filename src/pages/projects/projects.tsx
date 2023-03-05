import uploadIcon from '../../assets/upload-icon.png'
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
import { getLanguages } from "../../api/languages"
import { ILanguages } from "../languages/types"
import { Switcher } from "../../components/switcher/switcher"
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        complete_date:any,
        image:any,
        uri:string
    }>({
        client:'',
        complete_date:'',
        image:null,
        link:'',
        rating:0,
        uri:''
    })
    const [selectedProjectItem, setSelectedProjectItem] = useState<IProject|null>(null)
    const [descriptionFocuse, setDecriptionFocuse] = useState(false)
    const [openServiceCreate, setOpenServiceCreate] = useState(false)
    const [openServiceEdit, setOpenServiceEdit] = useState(false)
    const theme = useTheme();
    const [shortDescriptionFocuse,setShortDecriptionFocuse] = useState(false)
    const [categoryName, setcategoryName] = useState<string[]>([]);
    const [categoryIds, setcategoryIds] = useState<string[]>([]);
    const [langs, setLangs] = useState<ILanguages[]|null>(null)
    const [currentLang,setCurrentLang] = useState('en')
    const [status, setStatus] = useState<'0'|'1'>('0')
    const [fields, setFields] = useState<{
      [key:string]:{
        description:string,
        title: string,
        short_description: string
      }
    }[]>([
      {
        en:{
          description:"",
          title:"",
          short_description:""
        }
      }
    ])
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
            const languages = await getLanguages()
            setLangs(languages.data)
            const dynamicFields = languages.data.map((item:ILanguages)=>{
              return {
                [item.short_code]:{
                  description:"",
                  title:"",
                  short_description:""
                }
              }
            })
      
            setFields(dynamicFields);
            const {data} = await getProjects()
            const categoryData = await getProjectCategory()
            setCategories(categoryData.data)
            setProjects(data.data)
        })()
    },[openServiceCreate])



    const openEditProject = (item:IProject) =>{
        setOpenServiceEdit(true)
        setSelectedProjectItem(item)
        setFields(item.translates.map(itm=>{
          return{
            [itm.language.short_code]:{
              description:itm.description,
              title:itm.title,
              short_description:itm.short_description,
            }
          }
        }))
        setProject({
            ...project,
            rating:item.rating,
            client:item.client,
            complete_date:item.complete_date,
            link:item.link,
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
      
            fields.map(item=>{
              for(const key in item){
                for(const field in item[key]){
                  //@ts-ignore
                  form.append(`translates[${key}][${field}]`, item[key][field]);
                }
              }
            })
          form.append("rating", project.rating?.toString()||'');
          form.append("complete_date", project.complete_date);
          form.append("uri", project.uri);
          form.append("link", project.link);
          form.append("status", status);
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
        
              fields.map(item=>{
                for(const key in item){
                  for(const field in item[key]){
                    //@ts-ignore
                    form.append(`translates[${key}][${field}]`, item[key][field]);
                  }
                }
              })
            form.append("rating", project.rating?.toString()||'');
            form.append("complete_date", project.complete_date);
            form.append("uri", project.uri);
            form.append("link", project.link);
            form.append("status", status);
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
                 maxWidth={'lg'}
                 scroll={'body'}
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
                  <FlexCenter mt={3}>
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
            {project.image ? (
              <img
                src={project.image && URL.createObjectURL(project.image)}
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
                        value={fields[fields.findIndex(item=>item[currentLang])][currentLang].title}
                        onChange={(e) => {
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, title: e.target.value};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields); 
                        }}
                        />

                        <OutlinedInput
                        placeholder="Client"
                        value={project.client}
                        onChange={(e) => setProject({...project,client:e.target.value})}
                        />

<CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setDecriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setDecriptionFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].description}
                    onChange={ ( event:any, editor:any ) => {
                        if(descriptionFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, description: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />

                <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setShortDecriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setShortDecriptionFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].short_description}
                    onChange={ ( event:any, editor:any ) => {
                        if(shortDescriptionFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, short_description: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
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
               maxWidth={'lg'}
               scroll={'body'}
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
                      flexDirection: "column",
                      flexWrap:'wrap',
                      justifyContent:'center'

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
             
<FlexAlignCenter justifyContent={'center'} width={'150px'} height={'100px'}>
                <img src={uploadIcon} width={"100px"}/>
              </FlexAlignCenter>
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
                            <FlexCenter>
                              <Switcher checked={status} setChecked={setStatus}/>
                            </FlexCenter>
                        <OutlinedInput
                        placeholder="Title"
                        value={fields[fields.findIndex(item=>item[currentLang])][currentLang].title}
                        onChange={(e) => {
                            const updatedFields = [...fields];
                            const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                            const currentLanguage = updatedFields[languageIndex][currentLang];
                            const updatedLanguage = {...currentLanguage, title: e.target.value};
                            updatedFields[languageIndex][currentLang] = updatedLanguage; 
                            setFields(updatedFields); 
                        }}
                        />

                        <OutlinedInput
                        placeholder="Client"
                        value={project.client}
                        onChange={(e) => setProject({...project,client:e.target.value})}
                        />




                <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setDecriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setDecriptionFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].description}
                    onChange={ ( event:any, editor:any ) => {
                        if(descriptionFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, description: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
                    />

                <CKEditor
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setShortDecriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                      setShortDecriptionFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].short_description}
                    onChange={ ( event:any, editor:any ) => {
                        if(shortDescriptionFocuse){
                          const data = editor.getData();
                          const updatedFields = [...fields];
                          const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                          const currentLanguage = updatedFields[languageIndex][currentLang];
                          const updatedLanguage = {...currentLanguage, short_description: data};
                          updatedFields[languageIndex][currentLang] = updatedLanguage; 
                          setFields(updatedFields);
                        }
                    } }
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
                    Save
                    </Button>
                  </DialogActions>
                </Dialog>

        <Box mb={3}>
        <Typography mb={3} variant={'h3'}>Projects</Typography>
        <Button variant="outlined" endIcon={ <AddIcon/>} onClick={()=>setOpenServiceCreate(true)}>create</Button>
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