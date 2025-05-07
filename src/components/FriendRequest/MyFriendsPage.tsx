
import React, { useState } from 'react';
import './FriendRequest.css';
import AddFriendModal from './AddFriendModal';
import FriendRequestModal from './FriendRequestModal';

const dummyFriends = [
  { name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=10' },
  { name: 'Ben Kumar', avatar: 'https://i.pravatar.cc/150?img=11' },
  { name: 'Daisy Lim', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Owen Park', avatar: 'https://i.pravatar.cc/150?img=13' },
];

const MyFriendsPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  return (
    <div className="friends-page">
      <h1>My Friends</h1>
      <ul className="friends-list">
        {dummyFriends.map((friend, idx) => (
          <li key={idx} className="friend-item">
            <img src={friend.avatar} alt={friend.name} />
            <span>{friend.name}</span>
          </li>
        ))}
      </ul>
      <div className="friend-page-buttons">
        <button onClick={() => setShowRequests(true)}>Friend Requests</button>
        <button onClick={() => setShowAddModal(true)}>Add Friend</button>
      </div>

      {showRequests && <FriendRequestModal onClose={() => setShowRequests(false)} />}
      {showAddModal && <AddFriendModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
};

export default MyFriendsPage;
