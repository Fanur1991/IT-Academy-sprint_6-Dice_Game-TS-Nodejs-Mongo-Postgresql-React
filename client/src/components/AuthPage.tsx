import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { TabPane } = Tabs;
const { Title } = Typography;

const MainPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        'http://localhost:3002/api/players/login',
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Login error:', error.response.data);
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post('http://localhost:3002/api/players', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log('Registration successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log('Registration error:', error.response.data);
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };

  return (
    <div style={{ width: '350px', margin: '100px auto' }}>
      <Title style={{ color: '#597ef7', margin: '30px 0' }} level={3}>
        Welcome to the Dice Game
      </Title>
      <Tabs
        activeKey={activeTab}
        defaultActiveKey="login"
        onChange={key => setActiveTab(key)}
      >
        <TabPane tab="Login" key="login">
          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Register" key="register">
          <Form name="register_form" onFinish={handleRegister}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                iconRender={visible =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MainPage;
