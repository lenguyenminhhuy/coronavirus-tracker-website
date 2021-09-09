import React from 'react';
import {Stack, Text } from "@chakra-ui/react";
import CountUp from 'react-countup';
import styled from "styled-components";

const CardStyle = styled.div`
    border-left: ${props => props.type === 'confirmed' ? "10px solid #c2a72f" : "10px solid #e33719" }};
    ${props => props.type === 'vaccinated' && `
    border-left: 10px solid green
    `};
    box-shadow: 6px 6px 5px #f2f7ff;
    background-color: #d1e2f;
    border-radius: 7px;
    height: 110%;
    width: 90%;
    align-items: center
`;

export default function Cards ({title, count, type}){
    return(
    <CardStyle type={type}>
        <Stack >
            <Text component="p" variant="body2" marginBottom="2%" marginTop="5%" fontWeight="bold" fontSize="18"> 
                <CountUp end={count} separator=' ' duration={1} />
            </Text>
            <Text component="p" variant="body2"  marginBottom="2%" > {title} </Text>
        </Stack>
    </CardStyle>

    )
}