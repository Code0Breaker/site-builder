import { Flex, FlexColumn, PaperBox } from "../../models/boxes"

const BlogList = () =>{
    return(
        <Flex width={'100%'}>
            <FlexColumn gap={3} width={'70%'}>
                <PaperBox></PaperBox>
                <PaperBox></PaperBox>
            </FlexColumn>
            <FlexColumn gap={3} width={'30%'}>
                <PaperBox></PaperBox>
                <PaperBox></PaperBox>
            </FlexColumn>
        </Flex>
    )
}

export default BlogList