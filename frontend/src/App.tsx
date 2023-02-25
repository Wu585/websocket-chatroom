import Login from './Login';
import ChatRoom from './ChatRoom';
import {useAuth} from './hooks';

function App() {
  const {isAuth} = useAuth();

  return <div>
    {isAuth ? <ChatRoom/> : <Login/>}
  </div>;
}

export default App;
