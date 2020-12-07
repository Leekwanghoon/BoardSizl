import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getSize = (size) => {
    return `${size}px`;
}

const Text = styled.span`
    font-weight: 600;
    font-size: ${props => getSize(props.size)};
    color:${props => props.theme.darkGreyColor};
`;

const FatText = ({text, className, size}) => {
    return(
        <>
            <Text 
                className={className}
                size={size}
            >
                {text}
            </Text>
        </>
    );
}

export default FatText;