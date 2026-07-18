import './globals.css'

export const metadata = {
  title: 'AI Call Center Solutions - Interactive Demo',
  description: 'Configure your AI-powered call center with our interactive platform',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}
