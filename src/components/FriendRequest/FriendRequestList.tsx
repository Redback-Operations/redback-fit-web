
import React from 'react';

const friendRequests = ['Olivia Ray', 'Marcus Lee'];

const FriendRequestList: React.FC = () => {
  return (
    <div className="request-list">
      <h3>Incoming Friend Requests</h3>
      {friendRequests.map((name, i) => (
        <div key={i} className="request-item">
          <span>{name}</span>
          <button>Accept</button>
          <button>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
