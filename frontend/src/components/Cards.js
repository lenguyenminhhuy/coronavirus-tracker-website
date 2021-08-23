import React from 'react';
import { Box, Stack, Text } from "@chakra-ui/react";
import CountUp from 'react-countup';


// const cardStyle = useStyleConfig({
//     wrapper: (props) => {
//         if(props.type ==='confirmed') return {borderLeft: '10px solid red'};
//         // if(props.type ==='recovered') return {borderLeft: '5px solid yellow'};
//         // if(props.type ==='tested') return {borderLeft: '5px solid green'};
//         else return {borderLeft: '10px solid gray'}
//     },
//     title: {
//         fontSize: 18, marginBottom:2
//     },
//     count: {
//         fontWeight: 'bold',
//         fontSize:42
//     }
// })

export default function Cards ({title, count, type}){
    // const useCardStyle = cardStyle({type})
    return(
    // <Box className = {useCardStyle.wrapper}>
    <Box boxShadow="outline" p="10" rounded="md" bg="#d1e2ff" borderWidth="3px" borderRadius="lg">
        <Stack >
            <Text component="span" variant="body2" > 
                <CountUp end={count} separator=' ' duration={1} />
            </Text>
            <Text component="p" variant="body2" > {title} </Text>
        </Stack>
    </Box>

    )

}