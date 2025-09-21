import type { Friend, FriendRequestItem, ID } from '../types';

const F_KEY = 'mock_friends';
const R_KEY = 'mock_friend_requests';

function load<T>(k: string, fallback: T): T {
  const raw = localStorage.getItem(k);
  return raw ? (JSON.parse(raw) as T) : fallback;
}
function save(k: string, v: any) {
  localStorage.setItem(k, JSON.stringify(v));
}

let friends = load<Friend[]>(F_KEY, [
  { id: 'u_alice', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: 'u_ben',   name: 'Ben Kumar',    avatar: 'https://i.pravatar.cc/150?img=11' }
]);

let friendRequests = load<FriendRequestItem[]>(R_KEY, [
  { id: 'r_olivia', name: 'Olivia Ray',  avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 'r_marcus', name: 'Marcus Lee',  avatar: 'https://i.pravatar.cc/150?img=21' }
]);

// API
export async function fetchFriends(): Promise<Friend[]> {
  return [...friends];
}

export async function fetchFriendRequests(): Promise<FriendRequestItem[]> {
  return [...friendRequests];
}

export async function sendFriendRequest(target: FriendRequestItem) {
  friendRequests.push({ ...target, id: `r_${Date.now()}` });
  save(R_KEY, friendRequests);
  return { success: true as const };
}

export async function acceptFriendRequest(requestId: ID, person: FriendRequestItem) {
  friends.push(person);
  save(F_KEY, friends);
  friendRequests = friendRequests.filter(r => r.id !== requestId);
  save(R_KEY, friendRequests);
  return { success: true as const };
}

export async function declineFriendRequest(requestId: ID) {
  friendRequests = friendRequests.filter(r => r.id !== requestId);
  save(R_KEY, friendRequests);
  return { success: true as const };
}
