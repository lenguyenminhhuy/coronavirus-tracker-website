import { Grid } from '@chakra-ui/react';
import React from 'react';
import Cards from './Cards';
export default function Highlight( {infor} ) {
    return  (
    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
        { 
            infor.map((item) =>        
            <Grid 
            columns={{ sm: 2, md: 4 }}
            // spacing="5"
            p="10"
            textAlign="center"
            rounded="lg"
            >
                <Cards 
                    title={item.title} 
                    count={item.count}  
                    type={item.type} 
                />
            </Grid> )
            
        } 
    </Grid>
    );
}