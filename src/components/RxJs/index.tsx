import { useEffect, useState } from "react";
import { Space, Form, Input, Button, Empty, Typography } from "antd";
import { subject$, subjectProcessor$ } from "./config";

import { style } from "../../style";

const RxJs = () => {
  const [data, setData] = useState<Array<string>>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const subscribtion = subjectProcessor$.subscribe({
      next: ({ message }) => {
        setData((prev) => [...prev, message]);
      },
      error: () => {
        setError("Oops, something went wrong!");
      },
      complete: () => console.log("The connection is completed!"),
    });

    return () => subscribtion.unsubscribe();
  });

  const handleFinish = ({ input: message }: any) => {
    subject$.subscribe();
    message && subject$.next({ message }); // or { message, token: 'some token' }
  };

  return (
    <Space direction="vertical" style={style}>
      <Typography.Title level={3} style={{ color: "#2a9d8f" }}>
        RxJs Web Socket
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
            disabled={!!error}
          />
        </Form.Item>
      </Form>
      <div>{error || (data.length && data) || <Empty />}</div>
    </Space>
  );
};

export default RxJs;
