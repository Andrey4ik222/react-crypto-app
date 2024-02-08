import { Layout, Spin } from "antd";

import AppHeader from "./components/Layout/AppHeader";
import AppSider from "./components/Layout/AppSider";
import AppContent from "./components/Layout/AppContent";

import { useContext } from "react";
import CryptoContext from "./context/cryptoContext";

import "./App.css";

function App() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  } else {
    return (
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
      </Layout>
    );
  }
}

export default App;
