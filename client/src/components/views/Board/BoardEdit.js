import React,{ useState, useCallback} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import TextareaAutosize from 'react-autosize-textarea';
import Input from '../../../utils/Input';
import InterativeButton from '../../../utils/InterativeButton';
import FileUpload from '../utilsComponents/FileUpload';
import useInput from '../../../Hooks/useInput';

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

function BoardEdit(props) {

    console.log(props,"boardEdit");
    const boardId = props.match.params.boardId;
    const {userData} = props.user;
    const Title = useInput("");
    const SubTitle = useInput("");
    const [Description, setDescription] = useState("");
    const [images,setImages] = useState([]);

    const DescriptionChangeHandler = useCallback((e) => {
        const { value } = e.target;
        setDescription(value);
    },[])

    const updateImages = (newPath) => {
        setImages(newPath)
    }

    const onSubmitBoard = (e) => {
        // e.preventDefault();
        // if( !Title || !SubTitle || !Description || !images) {
        //     return alert("모든 값을 입력해주세요.");
        // }

        const body = {
            _id: boardId,
            writer: userData._id,
            title: Title.value,
            subTitle: SubTitle.value,
            description: Description,
            images: images,
        }

        axios.post("/api/edit/Myboard", body)
            .then(response => {
                if(response.data.success) {
                    alert("게시글 수정에 성공했습니다");
                    props.history.goBack();
                } else {
                    alert("게시글 수정에 실패했습니다!")
                }
            })
    }

    return (
        <Wrapper>    
            <Helmet>
                <title>BoardEdit | 게시글수정(edit) </title>
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
                    <InterativeButton onClick={onSubmitBoard} text="수정" />
                </Form>
            </Container>
        </Wrapper>
    )
}

export default React.memo(BoardEdit);
