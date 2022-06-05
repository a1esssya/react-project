import { Box } from "@mui/material"
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../components/ButtonSecondary"


export default function RegistrationNavigation({sx}){

    const navigate = useNavigate()
    const toLoginPage = () => { navigate('/login')}
    const toMainPage = () => {navigate('/')}

    return(
        <Box 
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            ...sx,
        }}
        >
            <ButtonSecondary title='Back to main page' action={toMainPage} sx={{mb: {lg: '0px', xs: '20px'}}}/>
            <ButtonSecondary title='Go to login page' action={toLoginPage}/>
        </Box>
    )
}