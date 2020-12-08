import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Wrapper } from '../LandingPage/LandingPage';
import InterativeButton from '../../../utils/InterativeButton';

function BoardUpdate(props) {

    const userId = props.match.params.userId;
    useEffect(() => {
        axios.get(`/api/board/boards_by_userId?id=${userId}`)
            .then(response => {
                if(response.data.success) {
                    console.log("데이터불러오는데 성공")
                    console.log(response.data,"하하");
                } else {
                    console.log("데이터 부르는데 실패");
                }
            })
    },[userId])

    const onDelete = () => {
        let body = {};
        axios.post('/api/board/delete', body)
            .then(response => {
                if(response.data.success) {
                    alert("게시글지우는데 성공")
                } else {
                    alert("게시글 지우는데 실패")
                }
        })
    }

    return (
        <Wrapper>
            BoardUpdate
            <InterativeButton text="게시글 삭제" onClick={onDelete} />
        </Wrapper>
    )
}

export default BoardUpdate
