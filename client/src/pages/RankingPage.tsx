import React, { useEffect, useState } from 'react';
import { Card, Col, List, Row, Typography, Flex, Space } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

interface Player {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  successRate?: number;
}

const RankingPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [averageSuccessRate, setAverageSuccessRate] = useState<number>(0);
  const [winner, setWinner] = useState<any>({});
  const [loser, setLoser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRankings();
    fetchWinner();
    fetchLoser();
  }, []);

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3002/api/ranking', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setPlayers(response.data.players);
      setAverageSuccessRate(response.data.averageSuccessRate);
      console.log('Rankings fetched successfully:', response.data);
    } catch (error) {
      console.error('Failed to fetch rankings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWinner = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3002/api/ranking/winner',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      setWinner(response.data);
      console.log('Players fetched successfully:', response.data);
    } catch (error) {
      console.error('Failed to fetch winner:', error);
    }
  };

  const fetchLoser = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3002/api/ranking/loser',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      setLoser(response.data);
      console.log('Players fetched successfully:', response.data);
    } catch (error) {
      console.error('Failed to fetch loser:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Flex style={{ margin: 20 }} justify="center" align="center" gap="large">
        <Link style={{ color: '#B37FEB' }} to="/">
          Back to home
        </Link>
        <Title style={{ margin: 0 }} level={3}>
          Player Rankings
        </Title>
      </Flex>
      <Text style={{ display: 'block', marginBottom: 20 }}>
        Overall Average Success Rate: {averageSuccessRate}%
      </Text>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="The Best Player" bordered={false}>
            {winner ? (
              <Space direction="vertical">
                <Text strong>{winner.name}</Text>
                <Text>Success Rate: {winner.successRate}%</Text>
              </Space>
            ) : (
              <Text>Loading...</Text>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="The Worst Player" bordered={false}>
            {loser ? (
              <Space direction="vertical">
                <Text strong>{loser.name}</Text>
                <Text>Success Rate: {loser.successRate}%</Text>
              </Space>
            ) : (
              <Text>Loading...</Text>
            )}
          </Card>
        </Col>
      </Row>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={players}
        renderItem={player => (
          <List.Item>
            <List.Item.Meta
              title={player.name}
              description={`Success Rate: ${player.successRate}%`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RankingPage;
