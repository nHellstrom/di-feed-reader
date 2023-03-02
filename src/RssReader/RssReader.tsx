import React from "react";
import moment from "moment";
import { IMedia, IRssItem } from "../types";

const RssReader = () => {
    const rssUrl = 'https://www.di.se/rss';
    // let nodeHolder:Element[] = [];
    let nodeHolder:IRssItem[] = [];

    const fetchRss = async () => {
        const response = await fetch(rssUrl);
        const text = await response.text();
        const parsedXml = await new window.DOMParser().parseFromString(text,'text/xml');
        const snippet = parsedXml.querySelectorAll("item");

        console.log("🐸 XML Snippet: ", snippet);

        snippet.forEach(rssItem => {

            let mediaContent: null | IMedia = null;
            if (rssItem.getElementsByTagName("media:content")) {
                mediaContent = {
                    type: rssItem.getElementsByTagName("media:content")[0]?.getAttribute("type"),
                    url: rssItem.getElementsByTagName("media:content")[0]?.getAttribute("url"),
                    credit: rssItem.getElementsByTagName("media:content")[0]?.children[0]?.innerHTML,
                    description: rssItem.getElementsByTagName("media:content")[0]?.children[1]?.innerHTML,
                    thumbnail: rssItem.getElementsByTagName("media:content")[0]?.children[2]?.getAttribute("url"),

                }
            }

            const newsItem: IRssItem = {
                title: rssItem.getElementsByTagName("title")[0].innerHTML,
                link: rssItem.getElementsByTagName("link")[0].innerHTML,
                description: rssItem.getElementsByTagName("description")[0].innerHTML,
                pubDate: rssItem.getElementsByTagName("pubDate")[0].innerHTML,
                creator: rssItem.getElementsByTagName("dc:creator")[0].innerHTML,
                media: mediaContent
            }


            nodeHolder.push(newsItem);
            
            // console.log("🐳", rssItem)
            // console.log("🦩", rssItem.getElementsByTagName("media:content")[0])
            // console.log("🦩", rssItem.getElementsByTagName("media:content")[0]?.getAttribute("type"))
            // console.log("🦩", rssItem.getElementsByTagName("media:content")[0]?.getAttribute("url"))
            // console.log("🦩", rssItem.getElementsByTagName("media:content")[0]?.children)
            console.log("🌈", rssItem.getElementsByTagName("media:content")[0]?.children[2])
            // console.log("🦩", rssItem.getElementsByTagName("media:content")[0]?.children.namedItem("credit"))
            // console.log("🐄", publishDate)
            console.log(nodeHolder);
            // console.log(nodeHolder[0].getElementsByTagName("pubDate")[0].innerHTML);
        });
    }

    const sortFeed = () => {
        nodeHolder.sort((a,b) => {
            const dateA = a["pubDate"];

            const dateB = b["pubDate"];

            return moment(dateA).isBefore(dateB) ? 1 : -1;
        })

        nodeHolder.forEach((x,i) => console.log(x["pubDate"], i))
        console.log(nodeHolder.length)
    }

    return <>
    <h2>Yo, rss reader here</h2>
    <button onClick={fetchRss}>Click me to fetch the stream</button>
    <button onClick={sortFeed}>Click me to sort</button>
    </>
}

export { RssReader }