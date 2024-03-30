import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export type HelpProperties = {
    show: boolean;
    handleClose: () => void;
};


export default function Help(props: HelpProperties) {
    return (
        <Dialog
            open={props.show}
            onClose={props.handleClose}
        >
            <DialogTitle>How To Play Tetrum?</DialogTitle>
            <DialogContent>
                <ul>
                    <li>Start the game by pressing the <i>Start Game</i> button.</li>
                    <li>Move the shapes from the <i>Shape Area</i> to the <i>Board</i>.</li>
                    <li>A shape must cover board cells in such a way that the sum of numbers covered by the shape corresponds to the size of the shape. The size of a shape is the number of squared blocks.</li>
                    <li>Press the <i>Solve Game</i> button to check if the game is won.</li>
                </ul>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}