import { useState, useEffect } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import Help from "./help";
import Game from "./game";

import "./layout.css"

export default function GameLayout () {
  const [showHelp, setShowHelp] = useState(false);
  const [numMoves] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(true);

  useEffect(() => {
    isGameRunning && setTimeout(() => setElapsedSeconds(elapsedSeconds + 1), 1000);
  }, [elapsedSeconds, isGameRunning]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <b>Tetrum</b>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Moves: {numMoves}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Elapsed Time: {elapsedSeconds}
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => setShowHelp(true)}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Game />
      </Box>
      <Help
        show={showHelp}
        handleClose={() => {setShowHelp(false); setIsGameRunning(true)}}
      />
    </>
  )
}