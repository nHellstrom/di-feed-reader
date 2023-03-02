import React from "react";
import moment from "moment";

const RssReader = () => {
    const rssUrl = 'https://www.di.se/rss';

    const fetchRss = async () => {
        const response = await fetch(rssUrl);
        const text = await response.text();
        const parsedXml = await new window.DOMParser().parseFromString(text,'text/xml');

        // const snippet = parsedXml.getElementsByTagName("item")
        // const oneItem = snippet[0];
        // const oneItemPubDate = oneItem.getElementsByTagName("pubDate");
        const snippet2 = parsedXml.querySelectorAll("item");

        // console.log("🐸 RESPONSE: ", response);
        // console.log("🐸 TEXT: ", text);
        // console.log("🐸 XML: ", parsedXml);
        // console.log("🐸 XML Snippet: ", snippet);
        // console.log("🐸 One Snippet: ", oneItem);
        // console.log("🐸 Snippet Date: ", oneItemPubDate);
        console.log("🐸 XML Snippet2: ", snippet2);

        // const nodeHolder:NodeList[] = [];
        const nodeHolder:Element[] = [];
        let listFull = false;

        snippet2.forEach(rssItem => {
            // nodeHolder.push(rssItem);
            // console.log("🐳", rssItem)
            // const childNodes = rssItem.childNodes;
            const publishDate = Date.parse(rssItem.getElementsByTagName("pubDate")[0].innerHTML);
            
            console.log("🐳", rssItem)
            console.log("🐳", rssItem.childNodes)
            console.log("🐄", publishDate)
            
            if (nodeHolder.length < 10) {
                nodeHolder.push(rssItem);
            } else if (nodeHolder.length === 10 && !listFull) {
                listFull = true;
                nodeHolder.sort((a,b) => {
                    const dateA = Date.parse(a.getElementsByTagName("pubDate")[0].innerHTML);
                    const dateB = Date.parse(rssItem.getElementsByTagName("pubDate")[0].innerHTML);

                    return moment(dateA).isBefore(dateB) ? -1 : 1;
                })
            } 

            console.log(nodeHolder);
            console.log(nodeHolder[0]);
        });
    }

    const sortFeed = () => {

    }

    return <>
    <h2>Yo, rss reader here</h2>
    <button onClick={fetchRss}>Click me to fetch the stream</button>
    </>
}

export { RssReader }