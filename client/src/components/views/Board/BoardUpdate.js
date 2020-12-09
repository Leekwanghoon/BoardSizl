import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Wrapper } from '../LandingPage/LandingPage';
import InterativeButton from '../../../utils/InterativeButton';
import { Content, Title } from './Board';
import styled from 'styled-components';
import NoContent from '../../../utils/NoContent';
import LoadingPage from '../../../utils/LoadingPage';

const ReWrapper = styled(Wrapper)`
    height:80vh;
    position:relative;
`;

const ReTitle = styled(Title)`
    position: absolute;
    top: 20%;
    display:grid;
    grid-template-rows: 50px;
    grid-template-columns: 150px 150px 150px 150px 150px 150px;
    border: 1px solid black;
`;

const BoardContentGrid = styled.div`
    display: grid;
    grid-template-rows: 75px;
    grid-template-columns: 150px 150px 150px 150px 150px 150px;
    opacity:0.5;
    &:hover {
        opacity:1;
    }
`;

const BoardContent = styled.div`
    border-bottom: 1px solid black;
    border-top:1px solid black;
    font-size:16px;
    display: flex;
    justify-content:center;
    align-items: center;
    &:last-child {
        border-right:1px solid black;
    }
    &:first-child {
        border-left:1px solid black;
    }
`;

const LinkWrap = styled(Link)`
    color: black;
    &:hover {
        color: black;
    }
`;


function BoardUpdate(props) {


    const pathName = props.location.pathname;
    const userId = props.match.params.userId;
    
    const [MyBoardData, setMyBoardData] = useState([]);
    const [Loading, setLoading] = useState(true);
    const length = MyBoardData.length;
    useEffect(() => {
        axios.get(`/api/board/boards_by_userId?id=${userId}`)
            .then(response => {
                if(response.data.success) {
                    setMyBoardData(response.data.board);
                    setLoading(false);
                } else {
                    console.log("데이터 부르는데 실패");
                }
            })
    },[userId])

    const onDelete = (boardId) => {
        axios.get(`/api/board/delete?id=${boardId}`)
            .then(response => {
                if(response.data.success) {
                    alert("게시글지우는데 성공")
                    props.history.push(`${pathName}`);
                } else {
                    alert("게시글 지우는데 실패")
                }
        })
    }
    
    return (
        <>
        {Loading ? 
            <ReWrapper>
                <Helmet><title>Loading...</title></Helmet>
                <LoadingPage />
            </ReWrapper>
        :
        <ReWrapper>
            <Helmet>
                <title>SIZL | Update or Delete</title>
            </Helmet>
            <ReTitle>
                <Content>작성자</Content>
                <Content>타이틀</Content>
                <Content>작성일자</Content>
                <Content>조회수</Content>
                <Content>삭제</Content>
                <Content>수정</Content>
            
            {length === 0 ? <NoContent /> : (
                <div>
                    {MyBoardData && MyBoardData.map((item,index) => {
                        const id = item._id;
                        return(
                            <LinkWrap to={`/board/${item?._id}`} key={index}>
                                <BoardContentGrid>
                                    <BoardContent>{item?.writer?.name}</BoardContent>
                                    <BoardContent>{item?.title}</BoardContent>
                                    <BoardContent>{item?.createdAt}</BoardContent>
                                    <BoardContent>{item?.views}</BoardContent>
                                    <BoardContent><InterativeButton text="삭제" onClick={() => onDelete(id)} /></BoardContent>
                                    <BoardContent>
                                        <Link to={`/edit/Myboard/${id}`}>
                                            <InterativeButton text="수정" />
                                        </Link>
                                    </BoardContent>
                                </BoardContentGrid>
                            </LinkWrap>
                        )
                    })}
                </div>
            )}
            </ReTitle>
        </ReWrapper>
        }
        </>
    )
}

export default React.memo(BoardUpdate);
