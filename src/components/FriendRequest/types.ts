export type ID = string;

export interface Person {
  id: ID;
  name: string;
  avatar: string;
}

export interface Friend extends Person {}

export interface FriendRequestItem extends Person {}
