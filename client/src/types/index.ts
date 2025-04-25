export type Event = {
  id: string;
  eventId: string;
  title: string;
  link: string;
  date: string;
  fights: Fight[];
  createdAt: string;
  updatedAt: string;
};

type Fighter = {
  name: string;
  record: string;
  country: string; // URL to flag image
  picture: string; // URL to fighter's picture
  link: string; // URL to fighter's profile
};

export type Fight = {
  main: boolean;
  weight: string; // weight class in lbs, e.g. "135"
  fighterA: Fighter;
  fighterB: Fighter;
};
