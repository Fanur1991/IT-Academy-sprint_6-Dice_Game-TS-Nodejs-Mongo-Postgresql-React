import { Flex, Space, Layout, ConfigProvider } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const { Header } = Layout;

const AppHeader = () => {
  const handleButton = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  return (
    <Header
      style={{ backgroundColor: 'white', width: '980px', height: '64px' }}
    >
      <Flex align="center" justify="space-between">
        <img style={{ height: '40px' }} src={logo} alt="logo" />
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultActiveColor: '#B37FEB',
              },
            },
          }}
        >
          <Link onClick={handleButton} style={{ color: '#B37FEB' }} to="/login">
            <Space>
              Logout
              <LogoutOutlined />
            </Space>
          </Link>
        </ConfigProvider>
      </Flex>
    </Header>
  );
};

export default AppHeader;
