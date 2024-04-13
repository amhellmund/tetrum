// Copyright 2024 Andi Hellmund

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Box, Grid } from '@mui/material';

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
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Box>
                            {
                                props.success ?
                                    <CheckCircleIcon /> :
                                    <ErrorIcon />
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            {
                                props.violation_message === null ?
                                    "You solution is correct. Congratulations!" :
                                    `Your solution is incorrect: ${props.violation_message}. Press 'Continue Game' to continue.`
                            }
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={props.handleClose}>Ok</Button>
            </DialogActions>
        </Dialog >
    )
}