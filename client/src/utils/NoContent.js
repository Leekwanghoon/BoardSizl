import React  from 'react';
import styled from 'styled-components';
import FatText from './FatText';
import { XMarkIcon } from './Icons';

const Wrapper = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    width:100%;
    white-space: nowrap;
    height:100%;
`;


const NoContent = () => {
    return(<Wrapper>
        <FatText size="30" text="등록된 글이 없습니다 &nbsp;" />
        <XMarkIcon />
    </Wrapper>)
}

export default React.memo(NoContent);