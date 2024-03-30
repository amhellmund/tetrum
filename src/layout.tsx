import { useState, useEffect } from "react";

import { AppBar, Button, Box, Toolbar, Typography } from "@mui/material";

import Help from "./help";
import Tetrum from "./tetrum";

import "./layout.css"
import { Position } from "./types";


export default function GameLayout() {
  const [showHelp, setShowHelp] = useState(false);
  const [numMoves, setNumMoves] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [shapePositions, setShapePositions] = useState<Map<string, Position | null>>(new Map());


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
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ marginRight: "50px" }}
                variant="contained"
                disabled={isGameRunning}
                onClick={() => setIsGameRunning(true)}
              >
                Start Game
              </Button>
            </Box>
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
                disabled={!isGameRunning}
                onClick={() => setIsGameRunning(false)}
              >
                Solve Game
              </Button>
            </Box>
            <Box alignContent="center">
              <Button
                variant="contained"
                onClick={() => setShowHelp(true)}
              >
                How To Play
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Tetrum
            width={1100}
            height={600}
            isGameRunning={isGameRunning}
            handleShapeMove={() => setNumMoves(numMoves + 1)}
            handleShapePositionUpdate={(shape_index: string, pos: Position | null) => {
              const new_map = new Map(shapePositions);
              new_map.set(shape_index, pos);
              setShapePositions(new_map);
            }}
          />
        </Box>
      </Box >
      <Help
        show={showHelp}
        handleClose={() => { setShowHelp(false); }}
      />
    </>
  )
}