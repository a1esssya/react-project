import { Box} from '@mui/material'
import PageBackground from '../../components/PageBackground'
import RegistrationForm from './RegistrationForm'
import PagePhone from '../../img/enterPagePhone.png'
import RegistrationNavigation from './RegistrationNavigation'
  
export default function HomePage() {

  return (
    <PageBackground backgroundImg={PagePhone} backgroundColor='primary.dark'>
      <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "fixed", width: '100%', height: "100vh"}}>
        <RegistrationForm/>
        <RegistrationNavigation sx={{width:{lg: '60%', xs: '70%'}, mt: 5, flexDirection:{lg: 'row', xs: 'column'}}}/>
      </Box>
    </PageBackground>
  )
}