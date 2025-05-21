import { useEffect, useState } from 'react';

const LastSynced = () => {
	const [lastSynced, setLastSynced] = useState<Date | null>(null);

	useEffect(() => {
		const syncData = async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			setLastSynced(new Date());
		};

		syncData();
		const interval = setInterval(syncData, 60000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
			{lastSynced ? `Last Synced: ${lastSynced.toLocaleTimeString()}` : 'Syncing...'}
		</div>
	);
};

export default LastSynced;
