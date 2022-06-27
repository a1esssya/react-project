import {Box} from '@mui/material'
import KillerImg from './KillerImg'
import MainPageInfo from './MainPageInfo'
import MainPagePhone from '../../img/mainPagePhone.png'
import PageBackground from '../../components/PageBackground'

export default function HomePage() {

  return (
    <PageBackground backgroundImg={MainPagePhone} backgroundColor="primary.dark">
      <Box sx={{position: "fixed", display: "flex", flexDirection: {lg: 'row', md: 'row', xs: 'column'}, justifyContent:{lg: 'space-around',md: 'space-around', xs: 'center'}, alignItems: 'center', width: '90%', height: '100vh', ml: {lg: '100px', md: '70px', xs: '0px'}}}>
        <MainPageInfo/>
        <KillerImg/>
      </Box>
    </PageBackground>
  )
}