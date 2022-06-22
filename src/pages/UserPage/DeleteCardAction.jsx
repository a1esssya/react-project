import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useQueryClient } from "react-query";
import api from "../../api";


export default function DeleteCard({onClose, open, id}){

    const queryClient = useQueryClient()

    const deleteCard = async() => {
        await api.delete(`/targets/${id}`)
        queryClient.invalidateQueries('cards')
        onClose()
    }

    return(
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete this card?</DialogTitle>
            <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={deleteCard} autoFocus>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}