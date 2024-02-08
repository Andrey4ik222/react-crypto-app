import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { capitalize } from "../../helpers";
import CryptoContext from "../../context/cryptoContext";

const { Sider } = Layout;

const siderStyle = {
  padding: "1rem",
};

const cardStyle = {
  marginBottom: "1rem",
};

const AppSider = () => {
  const { assets } = useContext(CryptoContext);

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={uuidv4()} style={cardStyle}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
              // { title: "Difference", value: asset.growPercent },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.grow
                        ? `+${asset.growPercent}%`
                        : `-${asset.growPercent}%`}
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Sider>
  );
};

export default AppSider;
