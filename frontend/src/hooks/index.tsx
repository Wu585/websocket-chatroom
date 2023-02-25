import {useEffect, useRef, useState} from 'react';
import {Message} from '../ChatRoom';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      setIsAuth(true);
    }
    username ? setIsAuth(true) : setIsAuth(false);
  }, []);
  return {isAuth};
};

export const useWebSocket = (url: string) => {
  const [messageList, setMessageList] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  useEffect(() => {
    wsRef.current = new WebSocket(url);
    const ws = wsRef.current;
    ws.onopen = () => {
      console.log('ws open');
    };
    ws.onclose = () => {
      console.log('ws close');
    };
    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      /*// 过时的闭包
      const newList = [...messageList,message]
      setMessageList(newList)*/
      setMessageList((prevMessageList) => [...prevMessageList, message]);
    };
  }, []);
  return {ws: wsRef.current, messageList, setMessageList};
};
