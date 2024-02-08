/* eslint-disable react/prop-types */
import { Flex, Typography } from "antd";

const modalImgStyle = {
  width: "40px",
};

const titleStyle = {
  margin: 0,
  marginRigth: "10px",
};

const CoinInfo = ({ coin, withSymbol }) => {
  return (
    <Flex align="center" gap={10}>
      <img src={coin.icon} alt={coin.name} style={modalImgStyle} />
      <Typography.Title level={2} style={titleStyle}>
        {withSymbol && `(${coin.symbol})`} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
