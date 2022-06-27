import AppBar from "../../components/AppBar";
import CardList from "../../components/CardList";
import Page from "../../components/Page";
import Phone from "../../img/mainPagePhone.png"


export default function KillerPage(){

    return(
        <Page sx={{backgroundColor: "black", backgroundImage: `url(${Phone})`, backgroundSize: "cover", backgroundAttachment: "fixed"}}>
            <AppBar title={sessionStorage.email}/>
            <CardList isKiller={true}/>
        </Page>
    )
}