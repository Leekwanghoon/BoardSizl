import React,{useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../_actions/user_action';
import Helmet from "react-helmet";
import styled from 'styled-components';
import InterativeButton from '../../../utils/InterativeButton';
import Board from '../Board/Board';
import LoadingPage from '../../../utils/LoadingPage';

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
    const [Loading, setLoading] = useState(true);
    const [BoardInfo, setBoardInfo] = useState([]); //토탈정보
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);

    useEffect(() => {
        let body = {
            skip:Skip,
            limit:Limit
        };
        getBoards(body);
    },[Skip,Limit])

    const getBoards = (body) => {
        axios.post('http://www.kinggodgeneral.tk/api/getBoards', body)
            .then(response => {
                if(response.data.success) {
                    setBoardInfo(response.data.boardInfo);
                    setLoading(false);
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

    const onClickPage = useCallback((pageNum) => {
        console.log(pageNum,"checking")
        const pageNum1 = parseInt(pageNum) + 1;
        const skip = 4*(pageNum1-2); 
        let body = {
            skip,
            limit: Limit
        }
        getBoards(body);
        setSkip(skip);
        
    },[Limit])

    return( 
        <>
        {!Loading ? 
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
                        <Board BoardInfo={BoardInfo} onClickPage={onClickPage} />
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
    );
}

export default React.memo(withRouter(LandingPage));