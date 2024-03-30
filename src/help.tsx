import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export type HelpProperties = {
    show: boolean;
    handleClose: () => void;
};
   

export default function Help(props: HelpProperties) {
    return (
        <Modal
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "1px solid black",
                boxShadow: 24,
                p: 4,
            }}
            open={props.show}
            onClose={props.handleClose}
        >
            <Box>
                <Typography>
                    Help Instructions 2
                </Typography>
            </Box>
        </Modal>
    )
}