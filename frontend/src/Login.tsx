import React, {useRef} from 'react';

const Login = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    const username = ref.current?.value;
    localStorage.setItem('username', username || '');
    window.location.reload()
  };
  return <div>
    用户名 <input type="text" ref={ref}/>
    <div>
      <button onClick={handleClick}>进入聊天室</button>
    </div>
  </div>
};

export default Login;

