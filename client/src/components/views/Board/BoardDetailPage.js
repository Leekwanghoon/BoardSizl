import React,{useEffect} from 'react';
import axios from 'axios';
import { Wrapper } from '../LandingPage/LandingPage';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:50px;

`;

function BoardDetailPage(props) {
    console.log(props,"하");
    const boardId = props.match.params.boardId;

    useEffect(() => {
        // axios.get(`/api/board/boards_by_id?id=`${boardId}`)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(err => alert(err));
    },[])

    return (
        <Wrapper>
            <Container>
                BoardDetailPage
            </Container>
        </Wrapper>
    )
}

export default BoardDetailPage
