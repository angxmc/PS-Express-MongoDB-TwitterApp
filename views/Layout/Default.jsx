
const React = require('react')
//children is built in React
function DefaultLayout({ title, children }) {
  return (
    <html>
      <head>
        <title>{title}</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body className='flex flex-col items-center'>
        <h1>{title}</h1>
        {children}
      </body>
    </html>
  );
}

module.exports = DefaultLayout;