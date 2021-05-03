export default interface User {
  name: string;
  auth?: {
    email?: string;
    password?: string;
  };
}

export interface House {
  name: string;
  planets: string | string[];
}

export interface Cordinate {
  x: number;
  y: number;
}


export interface BaseEvent {
  user: string;
  time: number;
}

export interface EventMap {
  addToCart: BaseEvent & { quantity: number; productId: string };
  checkOut: BaseEvent;
}

export interface Rank<T> {
  item: T;
  rank: number;
}

export interface Pokemon {
  name: string;
  hp: number;
}
