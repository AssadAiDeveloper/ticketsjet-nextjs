export type Block =
  | { t: "p"; text: string }
  | { t: "h2" | "h3"; text: string; id?: string }
  | { t: "ul" | "ol"; items: string[] }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "callout"; title?: string; text: string }
  | { t: "image"; src: string; alt: string; caption?: string; credit?: string };

export type PostMeta = {
  slug: string;
  published: string;
  updated?: string;
  minutes: number;
  image?: { src: string; alt: string };
  related?: string[];
};

export type PostContent = {
  title: string;
  description: string;
  blocks: Block[];
  faq?: { q: string; a: string }[];
};
