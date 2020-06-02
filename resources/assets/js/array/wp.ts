export interface wp {
    id:             number;
    date:           Date;
    date_gmt:       Date;
    modified:       Date;
    modified_gmt:   Date;
    slug:           string;
    status:         string;
    type:           string;
    link:           string;
    // title:          GUID;
    // content:        Content;
    // excerpt:        Content;
    author:         number;
    featured_media: number;
    comment_status: string;
    ping_status:    string;
    sticky:         boolean;
    template:       string;
    format:         string;
    meta:           any[];
    categories:     number[];
    tags:           number[];
    custom_tag:     number[];
}
