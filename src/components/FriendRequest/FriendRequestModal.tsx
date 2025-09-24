import React, { useEffect, useState } from 'react';
import type { FriendRequestItem, ID } from './types';
import { acceptFriendRequest, declineFriendRequest, fetchFriendRequests } from './services/friendsService';

interface Props {
  onClose: () => void;
  onAnyChange?: () => void; // optional: to refresh friends after accept
}

const FriendRequestModal: React.FC<Props> = ({ onClose, onAnyChange }) => {
  const [requests, setRequests] = useState<FriendRequestItem[]>([]);
  const [busy, setBusy] = useState<Record<ID, boolean>>({});

  useEffect(() => {
    fetchFriendRequests().then(setRequests).catch(e => alert(String(e)));
  }, []);

  const handleAccept = async (req: FriendRequestItem) => {
    setBusy(b => ({ ...b, [req.id]: true }));
    await acceptFriendRequest(req.id, req);
    setRequests(prev => prev.filter(r => r.id !== req.id));
    setBusy(b => ({ ...b, [req.id]: false }));
    onAnyChange?.();
  };

  const handleDecline = async (req: FriendRequestItem) => {
    setBusy(b => ({ ...b, [req.id]: true }));
    await declineFriendRequest(req.id);
    setRequests(prev => prev.filter(r => r.id !== req.id));
    setBusy(b => ({ ...b, [req.id]: false }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Incoming Friend Requests</h2>

        {requests.map(req => (
          <div key={req.id} className="request-item">
            <img src={req.avatar} alt={req.name} />
            <span>{req.name}</span>
            <div className="request-actions">
              <button className="accept" disabled={!!busy[req.id]} onClick={() => handleAccept(req)}>
                {busy[req.id] ? 'Accepting…' : 'Accept'}
              </button>
              <button className="decline" disabled={!!busy[req.id]} onClick={() => handleDecline(req)}>
                {busy[req.id] ? 'Declining…' : 'Decline'}
              </button>
            </div>
          </div>
        ))}

        {requests.length === 0 && <p className="modal-subtext">No pending requests.</p>}
      </div>
    </div>
  );
};

export default FriendRequestModal;
