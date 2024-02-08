/* eslint-disable react/prop-types */
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import { useContext, useRef, useState } from "react";
import CryptoContext from "../../context/cryptoContext";
import CoinInfo from "../CoinInfo/CoinInfo";

const selectStyle = {
  width: "250px",
};

const imgIconStyle = {
  width: "20px",
};

const inputNumberStyle = {
  width: "100%",
};

const validataMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AddAssetForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={selectStyle}
        onSelect={(v) => {
          setCoin(crypto.find((c) => c.id === v));
        }}
        placeholder="Select coin"
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
    );
  }

  function handleSubmit(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={handleSubmit}
      validatamessages={validataMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={inputNumberStyle}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={inputNumberStyle} />
      </Form.Item>

      <Form.Item label="Data & Time" name="data">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={inputNumberStyle} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddAssetForm;
