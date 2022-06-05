import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainPageInfo(props){
    
    const navigate = useNavigate()
    const toRegistrPage = () => {
        navigate('/registration')
    }
    const toLoginPage = () => {
        navigate('/login')
    }

    return(
        <Box sx={{width:{lg: "30%", md: "30%", xs: "90%"}}} {...props}>
            <Typography mb={5} style={{fontWeight: 700, fontSize: "61px", lineHeight: "120%", color: "white"}}>Kill or <span style={{color:"#00C851"}}>be</span> <br/>Killed</Typography>
            <Typography width="90%" color="rgba(248, 246, 250, 0.6)" mb={5}>If you want money and you think morality is a relic of the past,  sign up as a killer. If you are a serious person who solves your problems in any way, sign up as a user.</Typography>
            <Button 
            variant="contained" 
            size="large" 
            color="success" 
            sx={{mb:5, width: "100%"}} 
            onClick = {toRegistrPage}
            >sign up </Button>
            <Button 
            variant="outlined" 
            color="success"
            size="large" 
            sx={{width: "100%"}}
            onClick = {toLoginPage}
            >sign in </Button>
        </Box>
    )
}