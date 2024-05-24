import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Roboto Mono, sans-serif',
        },
        components: {
          Button: {
            colorPrimary: '#b37feb',
            colorPrimaryHover: '#b37feb',
            colorPrimaryActive: '#b37feb',
            primaryColor: '#292929',
            colorTextLightSolid: '#292929',
          },
          Card: {
            colorBgContainer: '#fff0f6',
          },
          List: {
            padding: 0,
            itemPaddingSM: '0 0 0 0',
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
