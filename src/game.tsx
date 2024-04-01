import { useState, useEffect } from "react";

import { AppBar, Button, Box, Toolbar, Typography, IconButton, Drawer, Divider, ListItemButton, List, ListItemText, ListItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import Help from "./help";
import GameStage from "./stage";

import "./css/layout.css"

import { GameState, Position, Game } from "./types";
import Solution from "./solution";
import { checkGameSolution, GameSolutionCheck } from "./utils";
import { getGameData, getAvailableGames, GameDescription } from "./data";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export default function GameLayout() {
  const [showHelp, setShowHelp] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [numMoves, setNumMoves] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [gameState, setGameState] = useState(GameState.Init);
  const [shapePositions, setShapePositions] = useState<Map<number, Position | null>>(new Map());
  const [solutionData, setSolutionData] = useState<GameSolutionCheck>({ success: false, violation_message: null });
  const [game, setGame] = useState<Game>(getGameData("test"));

  const available_games = getAvailableGames();

  useEffect(() => {
    gameState == GameState.Started && setTimeout(() => setElapsedSeconds(elapsedSeconds + 1), 1000);
  }, [elapsedSeconds, gameState]);

  const { width, height } = useWindowDimensions();

  const handleNewGame = (game_id: string) => {
    window.location.href = `/?game_id=${game_id}`;
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => setShowSidebar(true)}
                >
                  <MenuIcon />
                </IconButton>
                <b>Tetrum</b>
              </Typography>
            </Box>
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                variant="contained"
                onClick={() => setShowHelp(true)}
              >
                How To Play
              </Button>
            </Box>
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ marginRight: "50px" }}
                variant="contained"
                disabled={gameState == GameState.Started || gameState == GameState.Finished}
                onClick={() => setGameState(GameState.Started)}
              >
                {
                  (gameState != GameState.Stopped) ? "Start Game" : "Continue Game"
                }
              </Button>
            </Box>
            <Box alignContent="center" sx={{ flexGrow: 1 }}>
              <Button
                sx={{ marginRight: "50px" }}
                variant="contained"
                disabled={gameState != GameState.Started}
                onClick={() => {
                  const solution_check = checkGameSolution(game.board, game.shapes, shapePositions);
                  if (solution_check.success) {
                    setGameState(GameState.Finished);
                  }
                  else {
                    setGameState(GameState.Stopped);
                  }
                  setSolutionData(solution_check);
                  setShowSolution(true);
                }}
              >
                Check Solution
              </Button>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Moves: {numMoves}
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Elapsed Time: {elapsedSeconds}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <GameStage
            game={game}
            width={Math.floor(width * 0.75)}
            height={Math.floor(height * 0.75)}
            gameState={gameState}
            handleShapeMove={() => setNumMoves(numMoves + 1)}
            handleShapePositionUpdate={(shape_index: number, pos: Position | null) => {
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
      <Solution
        show={showSolution}
        handleClose={() => { setShowSolution(false); }}
        success={solutionData.success}
        violation_message={solutionData.violation_message}
      />
      <Sidebar
        show={showSidebar}
        availableGames={available_games}
        handleClose={() => setShowSidebar(false)}
        handleNewGame={handleNewGame}
      />
    </>
  )
}

type SidebarProperties = {
  show: boolean;
  availableGames: Map<string, GameDescription[]>;
  handleClose: () => void;
  handleNewGame: (game_id: string) => void;
}

function Sidebar(props: SidebarProperties) {
  const lists = [];
  for (const [section, descriptions] of props.availableGames) {
    const list_items = [];
    list_items.push(
      <ListItem key={section}>
        <ListItemText key={`${section}-text`}><b>{section}</b></ListItemText>
      </ListItem>
    )
    for (const desc of descriptions) {
      list_items.push(
        <ListItem disablePadding key={`${section}-${desc.id}`}>
          <ListItemButton key={`${section}-${desc.id}-button`} onClick={() => props.handleNewGame(desc.id)}>
            <ListItemText key={`${section}-${desc.id}-text`}>
              {desc.name}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )
    }

    list_items.push(<Divider key={`${section}-divider}`} />)
    lists.push(
      <List key={`${section}-list`}>
        {list_items}
      </List>
    )
  }

  return (
    <Drawer
      open={props.show}
      onClose={props.handleClose}
      onClick={props.handleClose}
    >
      <Box role="presentation" sx={{ width: 400 }} >
        {lists}
      </Box>
    </Drawer >
  )
}