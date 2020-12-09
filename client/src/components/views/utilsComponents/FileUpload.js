import React,{useState} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { ProfileIcon } from '../../../utils/Icons';


const Wrapper = styled.div`
    display:flex;
    justify-content:space-between;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 300px;
    border: 1px solid red;
`;

const PageZone = styled.div`
    display:flex;
    width: 400px;
    height: 300px;
    overflow-x:auto;

`;
const Image = styled.img`
    max-width:400px;
    width:400px;
    height:300px;
    overflow-x: scroll;
`;

const FileUpload = (props) => {
    
    const [filePath, setFilePath] = useState([]);

    const deleteHandler = (path) => {
        const currentIndex = filePath.indexOf(path);
        
        let newImages = [...filePath];
        newImages.splice(currentIndex, 1); //현재 array에서 한개 지워라
        setFilePath(newImages);
        props.updateImages(newImages);
    }

    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])

        axios.post('/api/profile/image', formData, config)
            .then(response => {
                if(response.data.success) {
                    setFilePath([...filePath, response.data.filePath]);
                    props.updateImages([...filePath, response.data.filePath]);
                } else {
                    alert("파일저장하는데 실패했습니다");
                }
            })       
    }
    return (
        <Wrapper>
            <Dropzone onDrop={dropHandler}>
                {
                    ({getRootProps, getInputProps}) => (
                        <Container {...getRootProps()}>
                            <input {...getInputProps()}/>
                            <ProfileIcon />
                        </Container>
                    )
                }
            </Dropzone>
            <PageZone>
                {filePath.map((path,index) => {
                    return (<div 
                        onClick={() => deleteHandler(path)}
                        key={index}>
                        <Image 
                            src={`http://localhost:4000/${path}`}
                            alt="해당 사진을 불러올 수 없습니다"
                        />
                    </div>)
                })}
            </PageZone>
        </Wrapper>
    );
}

FileUpload.propTypes = {
    filePath:PropTypes.string
}

// Greeting.propTypes = {     name: PropTypes.string   };
export default FileUpload;