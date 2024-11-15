import { logout } from '@/actions/auth-actions';
import { getUser } from '@/lib/session';
import { Suspense } from 'react';

const Home = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
