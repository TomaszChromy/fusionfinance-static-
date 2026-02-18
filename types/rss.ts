export interface RssItem {
  title: string;
  link?: string;
  description?: string;
  contentSnippet?: string;
  content?: string;
  isoDate?: string;
  date?: string;
  creator?: string;
  categories?: string[];
  category?: string;
  enclosure?: {
    url?: string;
  };
  source?: string;
  image?: string;
}

export interface RssResponse {
  items: RssItem[];
}
