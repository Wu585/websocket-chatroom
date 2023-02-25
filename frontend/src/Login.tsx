import React, {FormEventHandler, useRef} from 'react';

const Login = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const handleClick: FormEventHandler = (e) => {
    e.preventDefault();
    const username = ref.current?.value;
    localStorage.setItem('username', username || '');
    window.location.reload();
  };
  return <form onSubmit={handleClick}>
    用户名 <input type="text" ref={ref}/>
    <div>
      <button type={'submit'}>进入聊天室</button>
    </div>
  </form>;
};

export default Login;

