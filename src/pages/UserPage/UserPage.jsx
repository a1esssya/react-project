import AppBar from "../../components/AppBar";
import Phone from "../../img/mainPagePhone.png"
import Page from "../../components/Page";
import PageBackground from "../../components/PageBackground";
import AddCardButton from "./AddCardButton";
import CardList from "./CardList";


export default function UserPage(){

    return(
        <Page sx={{backgroundColor: "black", backgroundImage: `url(${Phone})`, backgroundSize: "cover", backgroundAttachment: "fixed"}}>
            <AppBar title={sessionStorage.email}/>
            <CardList/>
            <AddCardButton/>
        </Page>
    )
}