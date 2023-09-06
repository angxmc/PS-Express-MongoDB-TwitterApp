const React = require("react");

function New() {
  return (
    <div>
      <form action="/api/tweets" method="POST">
        Title: <input type="text" name="title" required />
        Author: <input type="text" name="author" required />
        <textarea name="body" required></textarea>
        <input type="submit" value='POST'/>
      </form>
    </div>
  );
}

module.exports = New;
