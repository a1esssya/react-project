import {AppBar as MuiAppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {PersonOutlineOutlined as PersonIcon} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";


export default function AppBar({title}){

    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.token = ''
        sessionStorage.email = ''
        navigate('/', { replace: true })
    }

  return (
    <MuiAppBar sx={{backgroundColor: "secondary.dark", position:"fixed"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="success"
            aria-label="person"
            sx={{ mr: 2 }}
          >
            <PersonIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "success.main" }}>
            {title}
          </Typography>
          <Button color="success" size="large" onClick={handleLogout}>Log out</Button>
        </Toolbar>
    </MuiAppBar>
  )
}