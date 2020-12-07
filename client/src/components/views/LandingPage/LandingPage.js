import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../_actions/user_action';
import Helmet from "react-helmet";
import styled from 'styled-components';
import InterativeButton from '../../../utils/InterativeButton';
import Board from '../Board/Board';

export const Wrapper = styled.div`
    width:100%;
    height:80vh;
    display: flex;
    justify-content: center;
    position: relative;    
`;

const ButtonControl = styled.div`
    position: absolute;
    top: 7%;
    right: 5%;
`;

const Container = styled.div`
    width:45%;
    height: 60%;
    position:absolute;
    top: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
`;




const LandingPage = (props) => {
    
    const welcomeHelmet = "환영합니다";

    const dispatch = useDispatch();
    //객체 배열로 map못씀
    const [BoardInfo, setBoardInfo] = useState([]);
    
    
    //auth에서 user데이터를 넘겨주기때문에 dispatch auth는 무시됨 코드 간결성
    // const [Data, setData] = useState({});
    // const name = Data.name;
    
    useEffect(() => {
        // axios.get('/api/user/auth')
        // .then(response => {
        //     setData(response.data);
        // })

        let body = {

        };
        getBoards(body);

    },[])

    const getBoards = (body) => {
        axios.post('/api/getBoards', body)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data,"boardInfo");
                    setBoardInfo(response.data.boardInfo);
                } else {
                    alert("게시글 가져오기 실패!");
                }
            })
    }

    const onLogoutButton = () => {
        dispatch(logoutUser())
            .then(response => {
                if(response.payload.success) {
                    props.history.push("/");
                } else {
                    alert("Failed to logout");
                }
            })
    }
    const onGoLoginPage = () => {
        props.history.push("/login");
    }

    return(  
        <Wrapper>
            <Helmet>
                <title>
                    Board(SIZL) | {props?.user?.userData?.name ? props.user.userData.name : welcomeHelmet}
                </title>
            </Helmet>
                <ButtonControl>
                    {props?.user?.userData?.isAuth ? 
                        <InterativeButton onClick={onLogoutButton} text="로그아웃" /> : 
                        <InterativeButton onClick={onGoLoginPage} text="로그인으로 가기" />
                    }
                </ButtonControl>
                <Container>
                    <Board BoardInfo={BoardInfo} />
                </Container>
        </Wrapper>
    );
}

export default withRouter(LandingPage);