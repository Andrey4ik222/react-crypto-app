import { Layout, Typography } from "antd";
import { useContext } from "react";
import CryptoContext from "../../context/cryptoContext";
import PortfolioChart from "../PortfolioChart/PortfolioChart";
import AssetsTable from "../AssetsTable/AssetsTable";
const { Content } = Layout;

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

const titleStyle = {
  textAlign: "left",
  color: "white",
};

const AppContent = () => {
  const { assets, crypto } = useContext(CryptoContext);

  const cryptoPriceMap = crypto.reduce((acc, curr) => {
    acc[curr.id] = curr.price;
    return acc;
  }, {});

  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={titleStyle}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, curr) => (acc += curr), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Content>
  );
};

export default AppContent;
