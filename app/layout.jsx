import './globals.css';

export const metadata = {
  title: 'Clonebook',
  description:
    'This is a full stack practice project using Next.js and MongoDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='winter' className='bg-base-100'>
      <body>{children}</body>
    </html>
  );
}
