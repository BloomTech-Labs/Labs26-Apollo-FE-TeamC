import React, { useState } from 'react';
import FormInput from '../../../common/FormInput';
import { Button, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const RenderDeliveryTopicSetup = ({ topic, setTopic }) => {
  const handleQuestionsChange = (e, index) => {
    setTopic({
      ...topic,
      default_questions2: topic.default_questions2.map((q, i) => {
        if (index === i) return { content: e.target.value };
        return q;
      }),
    });
  };

  const [count, setCount] = useState('1');

  const onClick = ({ key }) => {
    setCount(key);
    console.log(count);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Default Questions 1</Menu.Item>
      <Menu.Item key="2">Default Questions 2</Menu.Item>
      <Menu.Item key="3">Default Questions 3</Menu.Item>
    </Menu>
  );

  return (
    <>
      <h1>Delivery Topic</h1>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Choose default questions <DownOutlined />
        </a>
      </Dropdown>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>Context Questions</h2>

        {count === '1'
          ? topic.default_questions.map((question, index) => {
              return (
                <>
                  <FormInput
                    value={question.content}
                    labelId={`Question ${index + 1}`}
                    onChange={e => handleQuestionsChange(e, index)}
                  />
                  <Button
                    onClick={() =>
                      setTopic({
                        ...topic,
                        default_questions: topic.default_questions.filter(
                          (q, i) => {
                            return i !== index ? q : null;
                          }
                        ),
                      })
                    }
                  >
                    Delete
                  </Button>
                </>
              );
            })
          : null}

        {count === '2'
          ? topic.default_questions2.map((question, index) => {
              return (
                <>
                  <FormInput
                    value={question.content}
                    labelId={`Question ${index + 1}`}
                    onChange={e => handleQuestionsChange(e, index)}
                  />
                  <Button
                    onClick={() =>
                      setTopic({
                        ...topic,
                        default_questions2: topic.default_questions2.filter(
                          (q, i) => {
                            return i !== index ? q : null;
                          }
                        ),
                      })
                    }
                  >
                    Delete
                  </Button>
                </>
              );
            })
          : null}

        {count === '3'
          ? topic.default_questions3.map((question, index) => {
              return (
                <>
                  <FormInput
                    value={question.content}
                    labelId={`Question ${index + 1}`}
                    onChange={e => handleQuestionsChange(e, index)}
                  />
                  <Button
                    onClick={() =>
                      setTopic({
                        ...topic,
                        default_questions3: topic.default_questions3.filter(
                          (q, i) => {
                            return i !== index ? q : null;
                          }
                        ),
                      })
                    }
                  >
                    Delete
                  </Button>
                </>
              );
            })
          : null}
      </div>
      {count === '1' ? (
        <Button
          onClick={() =>
            setTopic({
              ...topic,
              default_questions: [...topic.default_questions, ''],
            })
          }
        >
          Add New Question
        </Button>
      ) : null}
      {count === '2' ? (
        <Button
          onClick={() =>
            setTopic({
              ...topic,
              default_questions2: [...topic.default_questions2, ''],
            })
          }
        >
          Add New Question
        </Button>
      ) : null}
      {count === '3' ? (
        <Button
          onClick={() =>
            setTopic({
              ...topic,
              default_questions3: [...topic.default_questions3, ''],
            })
          }
        >
          Add New Question
        </Button>
      ) : null}
    </>
  );
};

export default RenderDeliveryTopicSetup;