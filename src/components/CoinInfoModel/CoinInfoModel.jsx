/* eslint-disable react/prop-types */

import { Divider, Flex, Tag, Typography } from "antd";
import {
  TwitterOutlined,
  RedditOutlined,
  ChromeOutlined,
} from "@ant-design/icons";
import CoinInfo from "../CoinInfo/CoinInfo";

const CoinInfoModel = ({ coin }) => {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}%
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Price BTC: </Typography.Text>
        {coin.priceBtc}$
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: </Typography.Text>
        {coin.marketCap}
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text strong>Contract Address: </Typography.Text>
        {coin.contractAddress}
      </Typography.Paragraph>

      <Divider />

      <Flex justify="space-evenly">
        <a href={coin.twitterUrl} target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
        <a href={coin.redditUrl} target="_blank" rel="noreferrer">
          <RedditOutlined />
        </a>
        <a href={coin.websiteUrl} target="_blank" rel="noreferrer">
          <ChromeOutlined />
        </a>
      </Flex>
    </>
  );
};

export default CoinInfoModel;
