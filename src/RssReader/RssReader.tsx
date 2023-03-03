import React, { useEffect, useState } from "react";
import moment from "moment";
import { IMedia, IRssItem } from "../types";
import { NewsItem } from "../NewsItem/NewsItem";
import "./RssReader.css";

const RssReader = () => {
  const [nodeHolder, setNodeHolder] = useState<IRssItem[]>([]);
  const [updateTime, setUpdateTime] = useState<Date>(new Date(Date.now()));
  const rssUrl = "https://www.di.se/rss";

  const fetchRss = async () => {
    try {
      const response = await fetch(rssUrl);
      const text = await response.text();
      const parsedXml = await new window.DOMParser().parseFromString(
        text,
        "text/xml"
      );
      const snippet = parsedXml.querySelectorAll("item");

      let temporaryNodeHolder: IRssItem[] = [];

      snippet.forEach((rssItem) => {
        let mediaContent: null | IMedia = null;
        if (rssItem.getElementsByTagName("media:content")) {
          mediaContent = {
            type: rssItem
              .getElementsByTagName("media:content")[0]
              ?.getAttribute("type"),
            url: rssItem
              .getElementsByTagName("media:content")[0]
              ?.getAttribute("url"),
            credit:
              rssItem.getElementsByTagName("media:content")[0]?.children[0]
                ?.innerHTML,
            description:
              rssItem.getElementsByTagName("media:content")[0]?.children[1]
                ?.innerHTML,
            thumbnail: rssItem
              .getElementsByTagName("media:content")[0]
              ?.children[2]?.getAttribute("url"),
          };
        }

        const newsItem: IRssItem = {
          title: rssItem.getElementsByTagName("title")[0]?.innerHTML,
          link: rssItem.getElementsByTagName("link")[0]?.innerHTML,
          description:
            rssItem.getElementsByTagName("description")[0]?.innerHTML,
          pubDate: new Date(
            Date.parse(rssItem.getElementsByTagName("pubDate")[0]?.innerHTML)
          ),
          creator: rssItem.getElementsByTagName("dc:creator")[0]?.innerHTML,
          media: mediaContent,
        };

        temporaryNodeHolder.push(newsItem);
      });

      temporaryNodeHolder = sortFeed(temporaryNodeHolder);
      setNodeHolder(temporaryNodeHolder);
    } catch (error) {
      console.error("☹️ Oh no! ", error);
    }
  };

  const sortFeed = (feed: IRssItem[]) => {
    feed.sort((a, b) => {
      const dateA = a["pubDate"];
      const dateB = b["pubDate"];
      return moment(dateA).isBefore(dateB) ? 1 : -1;
    });

    return feed;
  };

  useEffect(() => {
    fetchRss();

    const updateTimer = setInterval(() => {
      const timeNow = new Date(Date.now());
      setUpdateTime(timeNow);
      fetchRss();
    }, 30000);
  }, []);

  return (
    <div className="RssReader__container">
      <p className="RssReader__updateTime">
        Uppdaterades senast:{" "}
        {updateTime.toLocaleTimeString("sv", {
          timeZone: "Europe/Stockholm",
        })}
      </p>
      <div className="RssReader__feed">
        {nodeHolder.slice(0, 10).map((n) => (
          <NewsItem rssItem={n} key={n.title} />
        ))}
      </div>
    </div>
  );
};

export { RssReader };
