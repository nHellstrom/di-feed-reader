import React from "react";
import { IRssItem } from "../types";
import "./NewsItem.css";

const NewsItem = ({ rssItem }: any) => {
  const renderMediaContent = () => {
    if (rssItem.media.url) {
      return (
        <div className="NewsItem__media">
          <img src={rssItem.media.url} alt={rssItem.media.description} width={"100%"} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="NewsItem__container">
      {renderMediaContent()}
      <h3 className="NewsItem__title">{rssItem.title}</h3>
      <div className="NewsItem__pubInfo">
        <span className="NewsItem__pubDate">
          Publicerad{" "}
          {rssItem.pubDate.toLocaleString("sv", {
            timeZone: "Europe/Stockholm",
          })}
        </span>
        <span className="NewsItem__creator">
          Källa: {rssItem.creator ? rssItem.creator : "Okänd"}
        </span>
      </div>
      <p className="NewsItem__description">
        {rssItem.description ? rssItem.description : "Beskrivning saknas"}
      </p>
      <a className="NewsItem__link" href={rssItem.link}>
        Länk
      </a>
    </div>
  );
};

export { NewsItem };
