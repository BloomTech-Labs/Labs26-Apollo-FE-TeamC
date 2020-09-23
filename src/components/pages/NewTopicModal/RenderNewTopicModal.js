import React, { useState } from 'react';
import RenderContextRadio from './ContextPages/RenderContextRadio';
import RenderDeliveryTopicSettings from './ContextPages/RenderDeliveryTopicSettings';
import RenderDeliveryTopicSetup from './ContextPages/RenderDeliveryTopicSetup';
import { Button, Modal, Steps } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as axios from 'axios';

import { toggleDisplayModal } from '../../../state/actions/displayModalAction';

function RenderNewTopicModal() {
  const displayModal = useSelector(state => state.displayModal);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);

  const [topic, setTopic] = useState({
    created_by: '00ulthapbErVUwVJy4x6',
    title: 'Development Team',
    frequency: 'Daily',
    context_questions: [
      'What is the current priority?',
      'Do you have any key learnings to share with the team from stakeholders or customers?',
      'What upcoming demos or events should the team be aware of?',
    ],
    default_questions: [
      {
        content: 'What did you accomplish yesterday?',
        response_type: 'String',
      },
      { content: 'What are you working on today?', response_type: 'String' },
      {
        content: 'Are there any monsters in your path?',
        response_type: 'String',
      },
    ],
  });

  const { Step } = Steps;
  const steps = [
    {
      title: 'Context',
      content: 'What type of context do you provide to the team?',
    },
    {
      title: 'Frequency',
      content: 'How frequently do you want to be notified?',
    },
    {
      title: 'Context Questions',
      content: `Let's set up the questions you will answer for the team as part of your request`,
    },
  ];

  // const showModal = () => {
  //   setDisplayModal(true);
  // };

  const closeModal = e => {
    e.preventDefault();
    dispatch(toggleDisplayModal());
  };

  const nextPage = e => {
    e.preventDefault();
    setPage(page + 1);
  };

  const prevPage = e => {
    e.preventDefault();
    setPage(page - 1);
  };

  const submit = e => {
    e.preventDefault();
    axios
      .post('https://apollo-c-api.herokuapp.com/topics', topic)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        title="New Topic"
        visible={displayModal}
        onCancel={closeModal}
        onOk={submit}
      >
        <Steps current={page}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div>{steps[page].content}</div>
        {page === 0 ? (
          <RenderContextRadio topic={topic} setTopic={setTopic} />
        ) : null}
        {page === 1 ? (
          <RenderDeliveryTopicSettings topic={topic} setTopic={setTopic} />
        ) : null}
        {page === 2 ? (
          <RenderDeliveryTopicSetup topic={topic} setTopic={setTopic} />
        ) : null}

        <div>
          {page !== 0 ? <Button onClick={prevPage}>Prev</Button> : null}
          {page < steps.length - 1 ? (
            <Button onClick={nextPage}>Next</Button>
          ) : null}
        </div>
      </Modal>
      {/* <Button onClick={showModal} type="primary">
        New Topic
      </Button> */}
    </>
  );
}

export default RenderNewTopicModal;
