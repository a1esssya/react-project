import {ExpandMore as ExpandMoreIcon} from '@mui/icons-material'
import { Box, Card, CardActions, CardHeader, CardMedia, IconButton, styled, Collapse, Typography, CardContent, Button, CircularProgress } from "@mui/material"
import { useState } from 'react'
import api from "../../api"


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function KillerCard({data}) {
    const [expanded, setExpanded] = useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getUserdate = (milliseconds) => {
        const Userdate = new Date(milliseconds)
        const y = Userdate.getFullYear()
        let m = Userdate.getMonth() + 1;
        let d = Userdate.getDate();
        m = (m < 10) ? '0' + m : m;
        d = (d < 10) ? '0' + d : d;
        return [m, d, y].join('/');
    }

    const [loading, setLoading] = useState(false);
    const [userStatus, setUserStatus] = useState(`${data?.status}`)

    const buttonTitle = userStatus === "requested" ? "Take this job" : "Confirm murder" 


    const handleButtonClick = async () => {
        if (!loading) {
            setLoading(true)
            const newData = await api.put(`/targets/${data.id}/${userStatus === "assigned" ? "confirm" : "assign" }`)
            setUserStatus(newData?.data?.status)
            setLoading(false)
        }
    };


    return (
        <Card sx={{ width: "85%", backgroundColor: "secondary.main"}}>
            <CardHeader
            title={`${data?.name} - ${data?.price}$`}
            />
            <CardMedia
                component="img"
                height="250"
                image={data?.imageUrl}
                alt="Person photo"
            />
            <CardActions disableSpacing sx={{display: "flex", my: 2}}>
                <Box sx={{ m: 1, position: 'relative', width: "90%"}}>
                    {userStatus !== "confirmed" && (
                    <Button
                    sx={{width: "100%"}}
                    variant="outlined"
                    color="info"
                    disabled={loading}
                    onClick={handleButtonClick}
                    >
                        {buttonTitle}
                    </Button>
                    )}
                    {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                        color: "info",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                        }}
                    />
                    )}
                    {userStatus === "confirmed" && (<Typography color="error">Status: closed (this job is done)</Typography>)}
                </Box>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                    <ExpandMoreIcon color="info"/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                <Typography paragraph>Name: {data?.name}</Typography>
                <Typography paragraph>Sex: {data?.sex}</Typography>
                <Typography paragraph>Birthday: {getUserdate(data?.birthDate)}</Typography>
                <Typography paragraph>Distinctive features: {data?.description}</Typography>
                <Typography paragraph>Price: {data?.price}$</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}