import React, { useEffect, useState } from 'react';
import './FriendRequest.css';
import AddFriendModal from './AddFriendModal';
import FriendRequestModal from './FriendRequestModal';
import { fetchFriends } from './services/friendsService';
import type { Friend } from './types';

const MyFriendsPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFriends = async () => {
    setLoading(true);
    try {
      const data = await fetchFriends();
      setFriends(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadFriends(); }, []);

  return (
    <div className="dashboardContent friends-page">
      <h1>My Friends</h1>

      {loading ? (
        <p className="modal-subtext">Loading friends…</p>
      ) : (
        <ul className="friends-list">
          {friends.map(friend => (
            <li key={friend.id} className="friend-item">
              <img src={friend.avatar} alt={friend.name} />
              <span>{friend.name}</span>
            </li>
          ))}
          {friends.length === 0 && <p className="modal-subtext">No friends yet.</p>}
        </ul>
      )}

      <div className="friend-page-buttons">
        <button onClick={() => setShowRequests(true)}>Friend Requests</button>
        <button onClick={() => setShowAddModal(true)}>Add Friend</button>
      </div>

      {showRequests && (
        <FriendRequestModal
          onClose={() => setShowRequests(false)}
          onAnyChange={loadFriends}
        />
      )}
      {showAddModal && <AddFriendModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default MyFriendsPage;
