import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Statistic,
  Typography,
  Input,
  message,
  List,
} from 'antd';
import { RollbackOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { fetchPlayers } from '../data/fetchPlayers';
import { fetchPlayerGames } from '../data/fetchPlayerGames';

const { Title } = Typography;

const MainPage: React.FC = () => {
  const [diceOne, setDiceOne] = useState<number>(1);
  const [diceTwo, setDiceTwo] = useState<number>(1);
  const [result, setResult] = useState<boolean>(false);
  const [rolling, setRolling] = useState<boolean>(false);
  const [playerId, setPlayerId] = useState<string>(
    localStorage.getItem('userId') || ''
  );
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ''
  );
  const [playerName, setPlayerName] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [playerGames, setPlayerGames] = useState<any[]>([]);

  const getPlayer = () => {
    fetchPlayers().then(data => {
      const playerName = data.filter((player: any) => player.id === playerId)[0]
        .name;
      setPlayerName(playerName);
    });
  };

  const getPlayerGames = () => {
    fetchPlayerGames(playerId, token).then(data => {
      setPlayerGames(data);
    });
  };

  useEffect(() => {
    getPlayer();
    getPlayerGames();
  }, []);

  const rollDice = async () => {
    if (!playerId) {
      console.log('No user ID found');
      return;
    }
    setRolling(true);
    try {
      const response = await axios.post(
        `http://localhost:3002/api/games/${playerId}`,
        null,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      console.log('Dice roll successful:', response.data);
      setDiceOne(response.data.diceOne);
      setDiceTwo(response.data.diceTwo);
      setResult(response.data.result);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Dice roll error:', error.response.data);
      } else {
        console.log('Unexpected error:', error);
      }
    }
    setRolling(false);
  };

  const handleNameChange = async () => {
    if (editName === playerName) {
      message.info('No changes to save.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3002/api/players/${playerId}`,
        {
          name: editName,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log('Player name changed successfully:', response.data);
      setPlayerName(editName);
      setEditName('');
      message.success('Player name updated successfully!');
    } catch (error) {
      console.error('Failed to fetch players:', error);
      message.error('Failed to update player name.');
    }
  };

  return (
    <>
      <Title style={{ color: '#597ef7', margin: '30px 0' }} level={2}>
        The Dice Game
      </Title>
      <Card
        bordered={false}
        style={{ maxWidth: '300px', margin: 'auto' }}
        title={<Title level={4}>{playerName}</Title>}
      >
        <Input
          style={{ width: '250px', marginRight: '10px' }}
          value={editName}
          onChange={e => setEditName(e.target.value)}
          onPressEnter={handleNameChange}
          placeholder="Change name here..."
          suffix={
            <Button
              icon={<CheckOutlined />}
              onClick={handleNameChange}
              disabled={editName === playerName}
            />
          }
        />
      </Card>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="Dice One"
                value={diceOne}
                prefix={<RollbackOutlined rotate={diceOne * 60} />}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Result"
                value={result ? 'Win' : 'Lose'}
                valueStyle={{ color: result ? 'green' : 'red' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Dice Two"
                value={diceTwo}
                prefix={<RollbackOutlined rotate={diceTwo * 60} />}
              />
            </Card>
          </Col>
        </Row>
        <Button type="primary" onClick={rollDice} disabled={rolling}>
          {rolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
      </div>
      <div
        style={{
          backgroundColor: '#f9f0ff',
          borderRadius: '10px',
          padding: '20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <List
          style={{ padding: 0 }}
          size="small"
          header={<Title level={4}>{playerName}'s Games</Title>}
          pagination={{ pageSize: 5 }}
          itemLayout="horizontal"
          dataSource={playerGames}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                key={index}
                title={
                  <Title type={item.result ? 'success' : 'danger'} level={5}>
                    {item.result ? 'Win' : 'Lose'}
                  </Title>
                }
                description={item.diceOne + ' vs ' + item.diceTwo}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default MainPage;
