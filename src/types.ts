interface IMedia {
    type: string | null,
    url: string | null,
    credit: string | null,
    description: string | null,
    thumbnail: string | null
}

interface IRssItem {
    title: string,
    link: string,
    description: string,
    pubDate: Date,
    creator: string,
    media: IMedia | null
}

export type { IMedia, IRssItem };
