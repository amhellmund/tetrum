import { useState, useEffect } from "react";

import { AppBar, Button, Box, Toolbar, Typography, IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import Help from "./help";
import Tetrum from "./tetrum";

import "./layout.css"


export default function GameLayout() {
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
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ marginRight: "50px" }}
                variant="contained"
              >
                Solve Game
              </Button>
            </Box>
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Tetrum width={1100} height={600} />
        </Box>
      </Box >
      <Help
        show={showHelp}
        handleClose={() => { setShowHelp(false); setIsGameRunning(true) }}
      />
    </>
  )
}