import { useState, useEffect } from "react";

import { Layout, Button, Typography, Row, Col } from "antd";
import {
  QuestionCircleOutlined
} from '@ant-design/icons';

import Help from "./help";
import Game from "./game";

import "./layout.css"

const { Header, Content } = Layout;
const { Title } = Typography;

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
      <Layout>
        <Header className="header">
          <Row gutter={40} align="middle" className="header-row">
            <Col span={6}>
              <Title level={1} className="title">Tetrum</Title>
            </Col>
            <Col span={6}>
              <Title level={3}>Moves: {numMoves}</Title>
            </Col>
            <Col span={6}>
              <Title level={3}>Elapsed Seconds: {elapsedSeconds}</Title>
            </Col>
            <Col span={6} className="header-help">
              <Button
                type="primary"
                icon={<QuestionCircleOutlined />}
                size={"middle"}
                onClick={() => {setIsGameRunning(false); setShowHelp(true)}}
              />
            </Col>
          </Row>
        </Header>
        <Content>
          <Game />
        </Content>
      </Layout>
      <Help
        show={showHelp}
        handleClose={() => {setShowHelp(false); setIsGameRunning(true)}}
      />
    </>
  )
}