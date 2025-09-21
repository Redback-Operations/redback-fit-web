import React, { useState } from 'react';
import type { FriendRequestItem } from './types';
import { sendFriendRequest } from './services/friendsService';

interface Props { onClose: () => void; }

const dummySuggestions: FriendRequestItem[] = [
  { id: 'u_ava',   name: 'Ava Carter',  avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'u_liam',  name: 'Liam Patel',  avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 'u_emily', name: 'Emily Zhao',  avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 'u_noah',  name: 'Noah Singh',  avatar: 'https://i.pravatar.cc/150?img=8' },
];

const AddFriendModal: React.FC<Props> = ({ onClose }) => {
  const [search, setSearch] = useState('');
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sent, setSent] = useState<Record<string, boolean>>({});

  const filtered = dummySuggestions.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = async (user: FriendRequestItem) => {
    try {
      setSendingId(user.id);
      await sendFriendRequest(user);
      setSent(prev => ({ ...prev, [user.id]: true }));
    } finally {
      setSendingId(null);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>

        <input
          type="text"
          placeholder="Search for users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <h2>Suggestions</h2>
        <p className="modal-subtext">Here are some people you might want to connect with.</p>

        <div className="user-list">
          {filtered.map(user => (
            <div key={user.id} className="user-card">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
              <button
                className="accept"
                disabled={!!sent[user.id] || sendingId === user.id}
                onClick={() => handleSend(user)}
              >
                {sent[user.id] ? 'Request Sent' : (sendingId === user.id ? 'Sending…' : 'Add Friend')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
