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
  ConfigProvider,
  Space,
} from 'antd';
import {
  RollbackOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { fetchPlayers } from '../data/fetchPlayers';
import { fetchPlayerGames } from '../data/fetchPlayerGames';
import AppHeader from '../components/Header';

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

      setPlayerGames(prevGames => [
        {
          diceOne: response.data.diceOne,
          diceTwo: response.data.diceTwo,
          result: response.data.result,
        },
        ...prevGames,
      ]);
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

  const handleDeleteButton = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/api/games/${playerId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log('Player games deleted successfully:', response.status);

      if (response.status === 200) {
        setPlayerGames([]);
      }

      console.log('Player games deleted successfully:', response.data);
      message.success('Player games deleted successfully!');
    } catch (error) {
      console.error('Failed to delete player games:', error);
      message.error('Failed to delete player games.');
    }
  };

  return (
    <>
      <AppHeader />
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
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: '#b37feb',
                colorPrimaryHover: '#b37feb',
                colorPrimaryActive: '#b37feb',
              },
            },
          }}
        >
          <Button type="primary" onClick={rollDice} disabled={rolling}>
            {rolling ? 'Rolling...' : 'Roll Dice'}
          </Button>
        </ConfigProvider>
      </div>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '10px',
          maxWidth: '500px',
          margin: '0 auto',
        }}
      >
        <List
          style={{ padding: 0 }}
          size="small"
          header={
            <Space size="small">
              <Title style={{ padding: 10, margin: 0 }} level={4}>
                {playerName}'s Games
              </Title>
              <Button
                onClick={handleDeleteButton}
                type="link"
                icon={<DeleteOutlined />}
              ></Button>
            </Space>
          }
          pagination={{ pageSize: 5 }}
          itemLayout="horizontal"
          dataSource={playerGames}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                key={index}
                title={
                  <Title
                    style={{ padding: 0, margin: 0 }}
                    type={item.result ? 'success' : 'danger'}
                    level={5}
                  >
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
