const React = require("react");
const DefaultLayout = require("./Layout/Default");

//whatever we pass inside DefaultLayout will go to {children}
function Index({ tweets }) {
  return (
    <DefaultLayout title="Tweets">
      <nav>
        <a href="/tweets/new">Create a new tweet</a>
      </nav>

      <ul>
        {tweets.map((tweet) => {
          return (
            <li key={tweet._id} className="border p-5">
              <a href={`/tweets/${tweet._id}`}>{tweet.title}</a>
              <p>{tweet.body}</p>
              <p>{tweet.author}</p>

              {/* LIKE BUTTON */}
              <div>
                <a href={`/api/tweets/add-like/${tweet._id}`}>Like</a>
                <br />
                <span>Likes: {tweet.likes}</span>
              </div>

              <span>{tweet.sponsored ? "Sponsored" : ""}</span>
              <br />

              {/* EDIT BUTTON */}
              <a href={`/tweets/${tweet._id}/edit`}>Edit tweet</a>

              <form
                method="POST"
                action={`/api/tweets/${tweet._id}?_method=DELETE`}
              >
                <input type="submit" value="DELETE" />
              </form>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
}

module.exports = Index;
