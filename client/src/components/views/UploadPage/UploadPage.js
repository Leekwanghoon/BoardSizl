import React,{useState, useCallback} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Input from '../../../utils/Input';
import useInput from '../../../Hooks/useInput';
import TextareaAutosize from 'react-autosize-textarea';
import InterativeButton from '../../../utils/InterativeButton';
import FileUpload from '../utilsComponents/FileUpload';

//생각해야할 것 props로 받는게 이득일까
// useSelector로 받는게 이득일까
// reflow: 하나의 dom 객체의 크기나 위치변화시 발생
// repaint: 색상이 변경되거나 글자의 내용이 바뀌면 발생
// react는 조화비교 알고리즘이란 것을 통해서reflow와 repaint를 줄인다.
const Wrapper = styled.div`
    height: 80vh;
`;

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:100%;
`;

const Form = styled.form`
    display:flex;
    flex-direction: column;
`;

const InputClick = styled(Input)`
    cursor: pointer;
    opacity:0.8;
    width:80%;
    margin-bottom: 10px;
    &:hover {
        opacity:1;
        border-bottom: 1px solid black;
        border-radius: 0;
    }
`;

const Text = styled(TextareaAutosize)`
    all: unset;
    border:0;
    border:${props => props.theme.boxBorder};
    border-radius:${props => props.theme.borderRadius};
    background-color: ${props => props.theme.bgColor};
    width: 76.4%;
    font-size: 12px;
    padding: 0 15px;
    margin: 10px auto;
    cursor: pointer;
    opacity:0.8;
    &:hover {
        opacity:1;
        border-bottom: 1px solid black;
        border-radius: 0;
    }
`;

const UploadPage = (props) => {

    const uploadLoading = "";
    const {userData} = props.user;
    

    const Title = useInput("");
    const SubTitle = useInput("");
    const [Description, setDescription] = useState("");
    const [images,setImages] = useState([]);
    const Views = useInput(0);

    const DescriptionChangeHandler = useCallback((e) => {
        const { value } = e.target;
        setDescription(value);
    },[])

   
    const updateImages = (newPath) => {
        setImages(newPath)
    }

    const onSubmitBoard = (e) => {
        e.preventDefault();
        if( !Title || !SubTitle || !Description || !images) {
            return alert("모든 값을 입력해주세요.");
        }

        const body = {
            writer: userData._id,
            title: Title.value,
            subTitle: SubTitle.value,
            description: Description,
            images: images,
            views: Views.value
        }

        axios.post("/api/board", body)
            .then(response => {
                if(response.data.success) {
                    alert("게시글 작성에 성공했습니다");
                    props.history.push("/");
                } else {
                    alert("게시글 작성에 실패했습니다!")
                }
            })
    }
    // {userData && userData.name ? userData.name : uploadLoading} 
    return(
        <Wrapper>    
            <Helmet>
                <title>UploadPage | {userData && userData.name ? userData.name : uploadLoading}</title>
            </Helmet>
            <Container>
                <Form onSubmit={onSubmitBoard}>
                    <FileUpload 
                        updateImages={updateImages}
                    />
                    <InputClick 
                        type="text"
                        {...Title}
                        placeholder="제목을 입력하세요"
                    />
                    <InputClick 
                        type="text"
                        {...SubTitle}
                        placeholder="부제목을 입력하세요"
                    />
                    <Text 
                        placeholder="설명을 해주세요!"
                        value={Description}
                        onChange={DescriptionChangeHandler}
                    />
                    <InterativeButton onClick={onSubmitBoard} text="게시판 등록" />
                </Form>
            </Container>
        </Wrapper>
    );
}

export default React.memo(withRouter(UploadPage));