import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
const { Header } = Layout;
import { useContext, useState, useEffect } from "react";
import CryptoContext from "../../context/cryptoContext";
import CoinInfoModel from "../CoinInfoModel/CoinInfoModel";
import AddAssetForm from "../AddAssetForm/AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: "1rem",
  display: "flex",
  background: "white",
  justifyContent: "space-between",
  alignItems: "center",
};

const selectStyle = {
  width: "250px",
};

const imgIconStyle = {
  width: "20px",
};

const AppHeader = () => {
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useContext(CryptoContext);

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Header style={headerStyle}>
      <Select
        style={selectStyle}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="Select coin"
        options={crypto.map((coin) => ({
          lable: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              src={option.data.icon}
              alt={option.data.lable}
              style={imgIconStyle}
            />{" "}
            {option.data.lable}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModel coin={coin} />
      </Modal>

      <Drawer
        title="Add Asset"
        width={600}
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
