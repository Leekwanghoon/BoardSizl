import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NoContent from '../../../utils/NoContent';
import PageNumber from '../../../utils/PageNumber';

export const Title = styled.div`
    display:grid;
    grid-template-rows: 50px;
    grid-template-columns: 150px 150px 150px 150px;
    border: 1px solid black;
`;

export const Content = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BoardContentGrid = styled.div`
    display: grid;
    grid-template-rows: 75px;
    grid-template-columns: 150px 150px 150px 150px;
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


function Board({BoardInfo,onClickPage}) {

    const length = BoardInfo.length;
    return (
        <div>
            <Title>
                <Content>작성자</Content>
                <Content>타이틀</Content>
                <Content>작성일자</Content>
                <Content>조회수</Content>
                
                {length === 0 ? <NoContent />:(<div>
                {BoardInfo && BoardInfo.map((item,index) => {
                return (
                <LinkWrap to={`/board/${item?._id}`} key={index}>
                <BoardContentGrid>
                <BoardContent>{item?.writer?.name}</BoardContent>
                <BoardContent>{item?.title}</BoardContent>
                <BoardContent>{item?.createdAt}</BoardContent>
                <BoardContent>{item?.views}</BoardContent>
                </BoardContentGrid>
                </LinkWrap>
                )
                })}
                </div>)}
            </Title>
            <PageNumber BoardInfo={BoardInfo} onClickPage={onClickPage} />
        </div>
    )
}

export default Board
