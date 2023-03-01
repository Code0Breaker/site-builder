import { Box, ClickAwayListener, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useState, useEffect } from "react"
import FroalaEditor from "react-froala-wysiwyg"
import { createPost, getBlogTag } from "../../api/blogApi"
import { getBlogCategory } from "../../api/categoryApi"
import { FlexAlignCenter, FlexCenter, FlexColumn, PaperBox } from "../../models/boxes"
import { IBlogCategories } from "../categories/types"
import { MultipleSelectCategories, MultipleSelectTags } from "./MultipleSelect"
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useSnackbar } from "../../types/outletTypes/outletTypes"
import { ILanguages } from "../languages/types"
import { getLanguages } from "../../api/languages"
import { Switcher } from "../../components/switcher/switcher"
//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const NewPost = () =>{
    const [categories, setCategories] = useState<IBlogCategories[]|null>(null)
    const [selectedCategories,setSelectedCategories] = useState<string[]>([])
    const [selectedTags,setSelectedTags] = useState<string[]>([])
    const [tags, setTags] = useState<{created_at:string|null,id:number,name:string,updated_at:string|null}[]|null>(null)
    const [image, setImage] = useState<any>(null)
    const {setOpenSnacBar,setErrorText} = useSnackbar();
    const [langs, setLangs] = useState<ILanguages[]|null>(null)
    const [currentLang,setCurrentLang] = useState('en')
    const [status, setStatus] = useState<'0'|'1'>('0')
    const [slug, setSlug] = useState('')
    const [fields, setFields] = useState<{
      [key:string]:{
        title:string,
        description: string,
        content: string,
      }
    }[]>([
      {
        en:{
            title:"",
            description: "",
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
            title:"",
            description: "",
            content: "",
          }
        }
      })
        setFields(dynamicFields)
        const fetchCategory = await getBlogCategory()
        const fetchTags = await getBlogTag()
        setCategories(fetchCategory.data)
        setTags(fetchTags.data)
      })()
    }, [])
    const [titleFocuse, setTitleFocuse] = useState(false)
    const [descriptionFocuse, setDescriptionFocuse] = useState(false)
    const [contentFocuse, setContentFocuse] = useState(false)

    const create = async() =>{
        try {
            const form = new FormData()

        if(image){
            form.append('image',image) 
        }

        fields.map(item=>{
            for(const key in item){
              for(const field in item[key]){
                //@ts-ignore
                form.append(`translates[${key}][${field}]`, item[key][field]);
              }
            }
          })
        form.append('published',status) 
        form.append('slug',slug) 

        selectedCategories.map(item=>{
            form.append(`categories[${item}]`, item) 
        })
        
        selectedTags.map(item=>{
            form.append(`tags[${item}]`, item) 
        })

        await createPost(form)
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
console.log(fields);

    return(
        <PaperBox>
                <FlexColumn width={'100%'} gap={3}>
                
                <FlexCenter>
                    <label htmlFor="upload-flag">
                        <FlexAlignCenter justifyContent={'center'} sx={{cursor:'pointer'}} width={200} height={200}>
                            {image?<img src={image&&URL.createObjectURL(image)} width={'100%'} height={"100%"} style={{objectFit:'contain'}}/>:<InsertPhotoIcon/>}
                        </FlexAlignCenter>
                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setImage(e?.target?.files?.[0])} type='file' accept="image/png, image/gif, image/jpeg" hidden id="upload-flag"/>
                      </label>
                    </FlexCenter>
                    <FlexCenter mb={3}>
            <Switcher checked={status} setChecked={setStatus}/>
          </FlexCenter>
                    <label>

                    <FlexCenter gap={10}>
         
        
      </FlexCenter>
      <Box mb={2}>
      <OutlinedInput
          fullWidth
            placeholder="Enter slug"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value)
            }
          />
      </Box>
          
                    {categories&&<MultipleSelectCategories title={'Categories'} category={selectedCategories} setCategory={setSelectedCategories} names={categories}/>}
                    <br/>
         
                    {tags&&<MultipleSelectTags title={'Tags'} category={selectedTags} setCategory={setSelectedTags} names={tags}/>}
                    <br/>
                    <FlexCenter gap={3} mb={3} mt={3}>
                   
          
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
          </FlexCenter>
                    <Typography>Title</Typography>
                     
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
                    </label>

                <label className="editorHeight">
                <Typography>Description</Typography>
                <CKEditor
                    
                    onInit={(editor:any) => {
                      console.log(editor);
                      
                      editor.editing.view.change((writer:any) => {
                      writer.setStyle(
                          "height",
                          "500px",
                          editor.editing.view.document.getRoot()
                      );
                      });
                  }}
                    editor={ ClassicEditor }
                    onFocus={ ( event:any, editor:any ) => {
                      setDescriptionFocuse(true)
                  } }
                  onBlur={ ( event:any, editor:any ) => {
                    setDescriptionFocuse(false)
                  } }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].description}
                    onChange={ ( event:any, editor:any ) => {
                       if(descriptionFocuse){
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        const updatedFields = [...fields];
                        const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                        const currentLanguage = updatedFields[languageIndex][currentLang];
                        const updatedLanguage = {...currentLanguage, description: data};
                        updatedFields[languageIndex][currentLang] = updatedLanguage; 
                        setFields(updatedFields);
                       }
                    } }
                />
                </label>
                <label className="editorHeight">
                    <Typography>Content</Typography>
                    <CKEditor
                    editor={ ClassicEditor }
                    data={fields[fields.findIndex(item=>item[currentLang])][currentLang].content}
                    onFocus={ ( event:any, editor:any ) => {
                        setContentFocuse(true)
                    } }
                    onBlur={ ( event:any, editor:any ) => {
                      setContentFocuse(false)
                    } }
                    onChange={ ( event:any, editor:any ) => {
                       if(contentFocuse){
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                        const updatedFields = [...fields];
                        const languageIndex = updatedFields.findIndex(item => item[currentLang]);
                        const currentLanguage = updatedFields[languageIndex][currentLang];
                        const updatedLanguage = {...currentLanguage, content: data};
                        updatedFields[languageIndex][currentLang] = updatedLanguage; 
                        setFields(updatedFields);
                       }
                    } }
                />
                </label>
                <Button variant="contained" fullWidth onClick={create}>Post</Button>
            </FlexColumn>
        </PaperBox>
    )
}

export default NewPost