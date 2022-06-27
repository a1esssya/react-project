import { Button } from "@mui/material"

export default function ButtonSecondary({title, action, sx}){
    return(
        <Button size="large" color='primary' variant="outlined" onClick={action} sx={{...sx}}>{title}</Button>
    )
}