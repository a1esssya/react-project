import { Box } from "@mui/material";


export default function PageBackground({ backgroundImg, backgroundColor, sx, ...otherProps }) {
    return(
        <Box sx={{
            height: "120vh", 
            width: "100%", 
            backgroundColor: `${backgroundColor}`, 
            backgroundImage: `url(${backgroundImg})`, 
            backgroundSize: "cover", 
            ...sx,
        }}
        {...otherProps}
        />
    )
}