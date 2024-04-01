import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

export type SolutionProperties = {
    show: boolean;
    handleClose: () => void;
    success: boolean;
    violation_message: string | null;
};


export default function Solution(props: SolutionProperties) {
    return (
        <Dialog
            open={props.show}
            onClose={props.handleClose}
        >
            <DialogTitle>Solution Check</DialogTitle>
            <DialogContent>
                <Box>
                    {
                        props.success ?
                            <CheckCircleIcon /> :
                            <ErrorIcon />
                    }
                </Box>
                <Box>
                    {
                        props.violation_message === null ?
                            "You solution is correct. Congratulations!" :
                            `Your solution is incorrect: ${props.violation_message}. Press 'Start Game' to continue.`
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={props.handleClose}>Ok</Button>
            </DialogActions>
        </Dialog >
    )
}