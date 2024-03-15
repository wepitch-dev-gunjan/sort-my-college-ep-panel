import "./style.scss";
import { useState } from "react";
import Feed from "../../components/feed";

const MyFeeds = () => {
  const [feeds, setFeeds] = useState([
    {
      _id: "hfdghfghfg",
      feed_link:
        "https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0&h=180",
      feed_likes: 12,
      feed_visibility: true,
      feed_caption: "this is my new feed",
    },
    {
      _id: "hfdghfghfg",
      feed_link:
        "https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0&h=180",
      feed_likes: 12,
      feed_visibility: true,
      feed_caption: "this is my new feed",
    },
    {
      _id: "hfdghfghfg",
      feed_link:
        "https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0&h=180",
      feed_likes: 12,
      feed_visibility: true,
      feed_caption: "this is my new feed",
    },
    {
      _id: "hfdghfghfg",
      feed_link:
        "https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0&h=180",
      feed_likes: 12,
      feed_visibility: true,
      feed_caption: "this is my new feed",
    },
    {
      _id: "hfdghfghfg",
      feed_link:
        "https://tse2.mm.bing.net/th?id=OIP.avb9nDfw3kq7NOoP0grM4wHaEK&pid=Api&P=0&h=180",
      feed_likes: 12,
      feed_visibility: true,
      feed_caption: "this is my new feed",
    },
  ]);
  return (
    <div className="Feeds-container">
      <div className="feeds">
        {feeds.map((feed, i) => (
          <Feed
            key={i}
            id={feed._id}
            feed_link={feed.feed_link}
            feed_likes={feed.feed_likes}
            feed_visibility={feed.feed_visibility}
            feed_caption={feed.feed_caption}
          />
        ))}
      </div>
    </div>
  );
};

export default MyFeeds;
