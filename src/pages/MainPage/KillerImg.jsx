import { CardMedia } from "@mui/material"
import phoneImg from "../../img/mainPageImg.png"

export default function KillerImg(){
    return(
        <CardMedia
        component="img"
        image={phoneImg}
        alt=""
        sx={{width: '50%', display: {lg: 'block',md: 'block', xs: 'none'}, my: 'auto'}}
      />
    )
}