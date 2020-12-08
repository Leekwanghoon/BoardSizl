import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Wrapper } from '../LandingPage/LandingPage';
import styled from 'styled-components';
import FatText from '../../../utils/FatText';

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top:100px;
    width: 70%;
    height: 90%;
    position:relative;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    display:flex;
    flex-direction: column;
    width:100%;
    height: 15%;
`;

const Title = styled.div`
    font-size: 16px;
    margin: 10px;
`;

const SubContainer = styled.div`
    font-size: 14px;
    margin: 10px;
    display:flex;
    justify-content: space-between;
    height: 15%;
`;

const SubTitle = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const DescriptionContainer = styled.div`
    display:flex;
    width:100%;
    margin-top: 30px;
    font-size: 16px;
`;

const ImageContainer = styled.img`
    display: flex;
    width: 400px;
    height: 300px;
    position:relative;
    top: 20%;
`;




function BoardDetailPage(props) {

    const [DetailData, setDetailData] = useState([]);
    const boardId = props.match.params.boardId;

    const url = DetailData[0]?.images[0];
    console.log(url);
    useEffect(() => {
        axios.get(`/api/board/boards_by_id?id=${boardId}`)
            .then(response => {
                setDetailData(response.data);
            })
            .catch(err => alert(err))
    },[boardId])



    return (
        <Wrapper>
            <Container>
                <TitleContainer>
                    <Title><FatText text="제목 :" />&nbsp;&nbsp;{DetailData[0]?.title}</Title>
                    <Title><FatText text="부제목 :" />&nbsp;&nbsp;{DetailData[0]?.subTitle}</Title>
                </TitleContainer>
                <SubContainer>
                    <SubTitle>
                        <FatText text="유저이름" /> {DetailData[0]?.writer?.name}
                    </SubTitle>
                    <SubTitle>    
                        <FatText text="조회수" /> {DetailData[0]?.views}
                    </SubTitle>
                    <SubTitle>
                        <FatText text="작성일자" /> {DetailData[0]?.createdAt}
                    </SubTitle>
                </SubContainer>
                <MainContainer>
                    <DescriptionContainer>{DetailData[0]?.description}</DescriptionContainer>
                    {/* <ImageContainer url={`http://localhost:4000/${url}`}></ImageContainer> */}
                    <ImageContainer src={`http://localhost:4000/${url}`} alt="이미지" />
                </MainContainer>
            </Container>
        </Wrapper>
    )
}

export default BoardDetailPage
