import React from 'react';
import styled,{ keyframes } from 'styled-components';

const Animation = keyframes`
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

const LoadingIng = styled.div`
    font-size: 24px;
    animation: ${Animation} 1s linear infinite;
    display:flex;
    align-items:center;
`;

function LoadingPage() {
    return (
        <LoadingIng>
            Loading...
        </LoadingIng>
    )
}

export default React.memo(LoadingPage);
