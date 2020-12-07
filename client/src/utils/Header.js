import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FatText from './FatText';
import { WorldIcon } from './Icons';

const Header = styled.div`
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
`;


export default() => {
    return (<Header>
        <HeaderLink to="/">
            <HeaderText text="SIZL BOARD" size={24} />
            <WorldIcon />
        </HeaderLink>
    </Header>);
}