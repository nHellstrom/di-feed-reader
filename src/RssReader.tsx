import React from "react"

const RssReader = () => {
    const rssUrl = 'https://www.di.se/rss';

    const fetchRss = async () => {
        const response = await fetch(rssUrl);
        const text = await response.text();
        const parsedXml = await new window.DOMParser().parseFromString(text,'text/xml');


        console.log("🐸 RESPONSE: ", response);
        console.log("🐸 TEXT: ", text);
        console.log("🐸 XML: ", parsedXml);

        const snippet = parsedXml.getElementsByTagName("item")

        console.log("🐸 XML Snippet: ", snippet);

        const oneItem = snippet[0];

        console.log("🐸 One Snippet: ", oneItem);

        const oneItemPubDate = oneItem.getAttribute("pubDate");

        console.log("🐸 Snippet Date: ", oneItemPubDate);
    }

    return <>
    <h2>Yo, rss reader here</h2>
    <button onClick={fetchRss}>Click me to fetch the stream</button>
    </>
}

export { RssReader }