
import React from 'react';

interface Props {
  onClose: () => void;
}

const friendRequests = [
  { name: 'Olivia Ray', avatar: 'https://i.pravatar.cc/150?img=20' },
  { name: 'Marcus Lee', avatar: 'https://i.pravatar.cc/150?img=21' },
];

const FriendRequestModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Incoming Friend Requests</h2>
        {friendRequests.map((req, i) => (
          <div key={i} className="request-item">
            <img src={req.avatar} alt={req.name} />
            <span>{req.name}</span>
            <div className="request-actions">
              <button className="accept">Accept</button>
              <button className="decline">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequestModal;
