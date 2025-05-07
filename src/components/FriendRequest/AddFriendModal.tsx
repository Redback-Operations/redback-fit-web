import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const dummySuggestions = [
  { name: 'Ava Carter', avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Liam Patel', avatar: 'https://i.pravatar.cc/150?img=6' },
  { name: 'Emily Zhao', avatar: 'https://i.pravatar.cc/150?img=7' },
  { name: 'Noah Singh', avatar: 'https://i.pravatar.cc/150?img=8' },
];

const AddFriendModal: React.FC<Props> = ({ onClose }) => {
  const [search, setSearch] = useState('');

  const filtered = dummySuggestions.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

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
          {filtered.map((user, i) => (
            <div key={i} className="user-card">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
              <button className="accept">Add Friend</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFriendModal;
