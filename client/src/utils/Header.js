import React from 'react';
import { Link } from 'react-router-dom';
import styled,{ keyframes } from 'styled-components';
import FatText from './FatText';
import { WorldIcon } from './Icons';

const AnimationHeader = keyframes`
    0% {
        opacity:0
    }
    50% {
        opacity:1
    }
    100% {
        opacity: 0;
    }
`;

const HeaderWrap = styled.div`
    position: relative;
    top: 40px;
    color: ${props => props.theme.blackColor};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:1;
`;

const HeaderLink = styled(Link)`
    color: black;
`;
const HeaderText = styled(FatText)`
    margin-right:10px;
    letter-spacing: 0.55rem;
    &:hover {
        animation: ${AnimationHeader} 3s linear infinite;
    }
`;


const Header = () => {
    return (<HeaderWrap>
        <HeaderLink to="/">
            <HeaderText text="SIZL BOARD" size={24} />
            <WorldIcon />
        </HeaderLink>
    </HeaderWrap>);
}

export default React.memo(Header);