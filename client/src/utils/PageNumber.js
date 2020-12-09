import React,{useEffect, useState, useMemo} from 'react';
import axios from 'axios';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    height: 40px;
    justify-content: space-evenly;
`;

const Number = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100px;
    font-size: 20px;
    &:hover {
        color:red;
    }
`;


function PageNumber({onClickPage}) {

    const [Count, setCount] = useState(0);

    const length = Math.ceil(Count / 4);
    
    useEffect(() => {
        axios.get('/api/board/length')
            .then(response => {
                if(response.data.success) {
                    setCount(response.data.count);
                } else {
                    alert("length실패");
                }
            })
    })
    
    

    const createRegion = (length) => {
        const copy = [];
        for( let i=1; i<length+1; i++) {
            copy.push(i);
        }
        return(
            <Wrapper>
                {copy && copy.map((item,index) => {
                    const index1 = parseInt(index) + 1;
                    return(
                        <Number key={index} onClick={() => onClickPage(`${index1}`)}>{index1}</Number>
                    )
                })}
            </Wrapper>
        );
    }

    return (
        <div>
            {length && length > 1 && createRegion(length) }
        </div>

    )
}

export default React.memo(PageNumber)
