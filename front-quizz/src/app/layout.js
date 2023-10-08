import './globals.css'

export const metadata = {
  title: 'The JaneQuizz',
  description: 'A quizz game',
}

export default function RootLayout({ children }) {
  return (
    <html >
      <body className='bg-base-200 min-h-screen'>
      {children}
      </body>
    </html>
  )
}
