import FroalaEditor from "react-froala-wysiwyg";
import 'froala-editor/js/froala_editor.pkgd.min.js';
  
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { FlexColumn, PaperBox } from "../../models/boxes";
import { List, ListItem, Typography } from "@mui/material";

const Summernote = () => {
 const onChange = (content:any) => {
    console.log('onChange', content);
  }

    return (
        <FlexColumn>
            <PaperBox p={'20px'} flexDirection={'column'} gap={5}>
                <Typography>Summernote</Typography>
                <FroalaEditor />
            </PaperBox>
            <PaperBox p={'20px'} flexDirection={'column'} gap={5}>
                <Typography>Inline Editor</Typography>
                <FlexColumn>
                    <Typography>You can select content and edit inline</Typography>
                    <Typography variant="h6" mt={1}>Title Heading will be apear here</Typography>
                    <Typography mt={1}>
                    It is a long established fact that a reader 
                    will be distracted by the readable content of 
                    a page when looking at its layout. The point 
                    of using Lorem Ipsum is that it has a more-or-less 
                    normal distribution of letters, as opposed to using 
                    'Content here, content here', making it look like readable English
                    </Typography>
                    <List>
                        <ListItem>There are many variations of passages</ListItem>
                        <ListItem>If you are going to use a passage of Ipsum</ListItem>
                        <ListItem>Contrary to popular belief, Ipsum is not simply</ListItem>
                    </List>
                </FlexColumn>
            </PaperBox>
        </FlexColumn>
    );
}

export default Summernote;