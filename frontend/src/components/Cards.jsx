import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';


const cardStyle = makeStyles({
    wrapper: (props) => {
        if(props.type ==='confirmed') return {borderLeft: '10px solid red'};
        // if(props.type ==='recovered') return {borderLeft: '5px solid yellow'};
        // if(props.type ==='tested') return {borderLeft: '5px solid green'};
        else return {borderLeft: '10px solid gray'}
    },
    title: {
        fontSize: 18, marginBottom:5
    },
    count: {
        fontWeight: 'bold',
        fontSize:42
    }
})

export default function Cards ({title, count, type}){
    const useCardStyle = cardStyle({type})
    return(
    <Card className = {useCardStyle.wrapper}>
        <CardContent>
            <Typography component="span" variant="body2" className={useCardStyle.count}> 
                <CountUp end={count} separator=' ' duration={1} />
            </Typography>
            <Typography component="p" variant="body2" className={useCardStyle.title}> {title} </Typography>
        </CardContent>
    </Card>

    )

}