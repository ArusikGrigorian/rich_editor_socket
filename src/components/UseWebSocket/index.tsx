import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Space, Form, Input, Button, Empty, Typography } from "antd";

import { style } from "../../style";

const UseWebSocket = () => {
  const [data, setData] = useState<Array<string>>([]);
  const [error, setError] = useState<string>("");

  const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:3001", {
    onOpen: () => {
      console.log("The connection is established!");
    },
    onClose: () => {
      console.log("The connection is terminated!");
    },
    onError: () => {
      setError("Oops, something went wrong!");
    },
    shouldReconnect: () => true,
    reconnectAttempts: 1,
    retryOnError: true,
  });

  useEffect(() => {
    lastMessage && setData((prev) => [...prev, lastMessage.data]);
  }, [lastMessage, setData]);

  const handleFinish = useCallback(
    ({ input: message }: any) => {
      message && sendMessage(message);
    },
    [sendMessage]
  );

  return (
    <Space direction="vertical" style={style}>
      <Typography.Title level={3} style={{ color: "#9381ff" }}>
        UseWebSocket
      </Typography.Title>
      <Form layout="inline" onFinish={handleFinish}>
        <Form.Item name={"input"}>
          <Input size="large" placeholder="Type here" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            children="Send"
            disabled={readyState !== ReadyState.OPEN}
          />
        </Form.Item>
      </Form>
      <div>{error || (data.length && data) || <Empty />}</div>
    </Space>
  );
};

export default UseWebSocket;
