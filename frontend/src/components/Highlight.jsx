import { Grid } from '@material-ui/core';
import React from 'react';
import Cards from './Cards';
export default function Highlight( {infor} ) {
    return  (
    <Grid container spacing={3}>
        { 
            infor.map((item) =>        
            <Grid item sm={3} xs={9}>
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