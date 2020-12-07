import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.button`
    width: 140px;
    height: 45px;
    font-family: 'Roboto, sans-serif';
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight:500;
    color: black;
    background-color: #fff;
    border: none;
    border-radius: 45px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: #2EE59D;
        box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
        color: #fff;
        transform: translateY(-7px);
    }
`;

const InterativeButton = ({onClick, text="BUTTON"}) => {
    return(
        <Wrap>
            <Container onClick={onClick}>{text}</Container>
        </Wrap>
    )
}

export default InterativeButton;