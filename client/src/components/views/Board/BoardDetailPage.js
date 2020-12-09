import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import { Wrapper } from '../LandingPage/LandingPage';
import styled from 'styled-components';
import FatText from '../../../utils/FatText';
import LoadingPage from '../../../utils/LoadingPage';


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
    justify-content: baseline;
    letter-spacing: 0.025rem;
    width:100%;
    margin-top: 30px;
    margin-left: 30px;
    font-size: 16px;
`;

const ImageContainer = styled.img`
    display: flex;
    width: 500px;
    height: 400px;
    position:relative;
    top: 10%;
`;




function BoardDetailPage(props) {

    const [DetailData, setDetailData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const boardId = props.match.params.boardId;

    

    let views = DetailData[0]?.views;
    const url = DetailData[0]?.images[0];
    console.log(url,"url");
    
    useEffect(() => {
        axios.get(`/api/board/boards_by_id?id=${boardId}`)
            .then(response => {
                setDetailData(response.data);
                setLoading(false);
            })
            .catch(err => alert(err))

        let body ={
            _id: boardId,
            views
        }
        axios.post('/api/board/viewInc', body)
            .then(response => {
                if(response.data.success) {
                    console.log("조회수올리는데 성공");
                } else {
                    alert("조회수 올리는데 실패했당");
                }
            })
    },[boardId,views])

    return (
        <>
            {!Loading ?
                 <Wrapper>   
                 <Helmet><title>SIZL | {DetailData[0].title} </title></Helmet>
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
                         <ImageContainer src={`http://localhost:4000/${url}`} alt="이미지를 찾을 수 없습니다" />
                     </MainContainer>
                 </Container>
                 </Wrapper>
                : 
                <Wrapper>
                    <Helmet>
                       <title>SIZL | Loading...</title>
                    </Helmet>
                    	<LoadingPage />
                </Wrapper>
                }        
        </>
    )
}

export default React.memo(BoardDetailPage);
