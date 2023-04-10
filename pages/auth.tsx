import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Input from '@/components/input';
import { signIn } from 'next-auth/react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [type, setType] = useState<'login' | 'register'>('login');

  const toggleType = useCallback(() => {
    setType((current) => current === 'login' ? 'register' : 'login');
  }, [type]);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        username,
        password,
      });
      login();
    } catch (error) {
      console.error(error);
    }
  }, [username, email, password, login]);

  return (
    <div className=" relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full md:bg-opacity-50">
        <nav className="px-12 py-12">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>

        <div className="flex items-center justify-center">
          <div className="bg-black bg-opacity-70 px-12 py-12 w-full self-center rounded-md mt-2 lg:w-2/5 md:max-w-md">
            <h2 className="text-white text-3xl font-semibold">
              {type === 'login' ? 'Login' : 'Register'}
            </h2>
            <div className="mt-2 flex flex-col gap-4">
              {type === 'register' && (
                <Input
                  type="text" id='username' label='Username' value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                />
              )}
              <Input
                type="email" id='email' label='Email' value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              <Input
                type="password" id='password' label='Password' value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="bg-red-600 text-white w-full py-2 rounded-md mt-4 font-semibold hover:bg-red-700"
                onClick={type === 'login' ? login : register}
              >
                {type === 'login' ? 'Login' : 'Register'}
              </button>
              <p className="text-neutral-500">
                {type === 'login' ? 'New to netflix?' : 'Already have an account?'}
                <a className="ml-1 text-white font-semibold hover:underline" onClick={toggleType}>
                  {type === 'login' ? 'Create an account' : 'Login'}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;