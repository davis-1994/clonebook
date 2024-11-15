import LoginForm from '@/components/auth/LoginForm';

const Home = async () => {
  return (
    <div className='min-h-screen flex items-center justify-center gap-5 flex-col md:flex-row text-center md:text-left'>
      {/* message */}
      <section>
        <span className='font-bold md:text-6xl text-4xl text-blue-600'>
          clonebook
        </span>
        <p className='md:text-2xl text-xl'>
          Connect with friends and the world around you on Facebook.
        </p>
      </section>

      {/* login form */}
      <section>
        <LoginForm />
      </section>
    </div>
  );
};

export default Home;
