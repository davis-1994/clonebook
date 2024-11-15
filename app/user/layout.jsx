export const metadata = {
  title: 'Clonebook | User',
  description: 'This is a user section.',
};

export default async function UserLayout({ children }) {
  return (
    <html lang='en' data-theme='winter' className='bg-base-100'>
      <body>{children}</body>
    </html>
  );
}
