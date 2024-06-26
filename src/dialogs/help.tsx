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

import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';

import "./help.css"

import animated_help from "./help.gif";

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
                <Box>
                    <ul>
                        <li>Start the game by pressing the <i>Start Game</i> button.</li>
                        <li>Move the shapes from the <i>Shape Area</i> to the <i>Board</i>.</li>
                        <li>A shape must cover board cells in such a way that the sum of numbers covered by the shape corresponds to the size of the shape. The size of a shape is the number of squared blocks.</li>
                        <li>
                            The <i>Board</i> as well as the <i>Shape Area</i> get highlighted by a surrounding border whenever a shape is moved in either of the areas.
                            <img style={{ margin: "20px" }} src={animated_help} width={400} />
                        </li>
                        <li>Press the <i>Check Solution</i> button to check if the game is won.</li>
                    </ul>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog >
    )
}