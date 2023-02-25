import React, {
  ChangeEventHandler,
  CSSProperties,
  FormEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react';
import {useAuth, useWebSocket} from './hooks';
import dayjs from 'dayjs';

export type Message = {
  user: string,
  date: string,
  message: string
}

const ScrollableContainer = ({children, style}: { children: ReactNode, style: CSSProperties }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [children]);
  return <div ref={containerRef} style={style}>
    {children}
  </div>;
};

const ChatRoom = () => {
  const {isAuth} = useAuth();
  const [message, setMessage] = useState('');
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessage(e.target.value);
  };
  const {ws, messageList} = useWebSocket('ws:120.26.164.99:9527');
  const onSendMessage: FormEventHandler = (e) => {
    e.preventDefault();
    if (!isAuth) window.location.reload();
    if (message.trim().length === 0) {
      return;
    }
    const record: Message = {
      user: localStorage.getItem('username')!,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      message
    };
    ws?.send(JSON.stringify(record));
    setMessage('');
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <ScrollableContainer style={{height: '500px', width: '300px', border: '1px solid  #000', overflow: 'auto'}}>
        {messageList.map((message, index) => <li key={index}>
          {message.user} {message.date}
          <p>消息: {message.message}</p>
        </li>)}
      </ScrollableContainer>
      <form style={{display: 'flex', width: '300px', height: '32px', marginTop: '16px'}} onSubmit={onSendMessage}>
        <input type="text" onChange={onChange} value={message}
               style={{marginRight: '16px', width: '100%', flex: 1}}/>
        <button type={'submit'}>发送消息</button>
      </form>
    </div>
  );
};

export default ChatRoom;

