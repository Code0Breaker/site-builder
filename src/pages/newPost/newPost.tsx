import { MenuItem, Select } from "@mui/material"
import Button from "@mui/material/Button"
import OutlinedInput from "@mui/material/OutlinedInput"
import FroalaEditor from "react-froala-wysiwyg"
import { FlexColumn, PaperBox } from "../../models/boxes"

const NewPost = () =>{
    return(
        <PaperBox>
                <FlexColumn width={'100%'} gap={3}>
                <OutlinedInput sx={{height:'55px'}} placeholder="Enter Blog title"/>
                <Select fullWidth>
                    <MenuItem  value={""}>Select category</MenuItem>
                    <MenuItem  value={"Web design"}>Web design</MenuItem>
                    <MenuItem  value={"Photography"}>Photography</MenuItem>
                    <MenuItem  value={"Technology"}>Technology</MenuItem>
                </Select>
                <FroalaEditor />
                <Button variant="contained" fullWidth>Post</Button>
            </FlexColumn>
        </PaperBox>
    )
}

export default NewPost