import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import localData from '../SessionsTable/SessionsTable.json'; 
type DataItem = typeof localData[0];
type Data = DataItem[];
type SortKeys = keyof DataItem;
type SortOrder = 'ascn' | 'desc';

function sortData({
	tableData,
	sortKey,
	reverse,
}: {
	tableData: Data;
	sortKey: SortKeys;
	reverse: boolean;
}) {
	if (!sortKey) return tableData;

	const sortedData = [...tableData].sort((a, b) => {
		return a[sortKey] > b[sortKey] ? 1 : -1;
	});

	return reverse ? sortedData.reverse() : sortedData;
}

function SortButton({
	sortOrder,
	columnKey,
	sortKey,
	onClick,
}: {
	sortOrder: SortOrder;
	columnKey: SortKeys;
	sortKey: SortKeys;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			style={{ backgroundColor: 'transparent', borderColor: 'transparent', color : sortKey === columnKey ? 'black' : 'grey' }} // current sort method highlighted in black
			onClick={onClick}
			className={`${
				sortKey === columnKey && sortOrder === 'desc'
					? 'sort-button sort-reverse'
					: 'sort-button'
			}`}
		>
			{sortKey === columnKey ? sortOrder === 'desc' ? '▼' : '▲'  : '■' /* display appropriate symbol for ascending, descending and no order*/}
		</button>
	);
}

function SessionTable({
	onRowClick,
}: {
	onRowClick: (session: DataItem) => void;
}) {
	const [data, setData] = useState<Data>([]);
	const [sortKey, setSortKey] = useState<SortKeys>('id');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const [selectedId, setSelectedId] = useState<number | null>(1);

	const headers: { key: SortKeys; label: string }[] = [
		{ key: 'id', label: 'Session' },
		{ key: 'coach', label: 'Coach' },
		{ key: 'duration', label: 'Duration' },
		{ key: 'date', label: 'Date' },
		{ key: 'typeOfTraining', label: 'Training' },
	];
	
	useEffect(() => {
		fetch('http://localhost:5000/api/dashboard/goals')
			.then((res) => res.json())
			.then((json) => {
				if (Array.isArray(json)) {
					setData(json);
				} else {
					throw new Error('Invalid format');
				}
			})
			.catch((err) => {
				console.warn('Using fallback JSON file:', err.message);
				setData(localData);
			});
	}, []);

	const sortedData = useCallback(
		() => sortData({ tableData: data, sortKey, reverse: sortOrder === 'desc' }),
		[data, sortKey, sortOrder]
	);

	function changeSort(key: SortKeys) {
		setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
		setSortKey(key);
	}

	function handleRowClick(session: DataItem) {
		setSelectedId(session.id);
		onRowClick(session);
	}

	return (
		<table>
			<thead>
				<tr>
					{headers.map((row) => (
						<td key={row.key}>
							{row.label}{' '}
							<SortButton
								columnKey={row.key}
								onClick={() => changeSort(row.key)}
								{...{
									sortOrder,
									sortKey,
								}}
							/>
						</td>
					))}
				</tr>
			</thead>

			<tbody>
				{sortedData().map((session) => (
					<tr
						key={session.id}
						style={{
							cursor: 'pointer',
							backgroundColor: selectedId === session.id ? 'lightblue' : '#e97462',
						}}
						onClick={() => handleRowClick(session)}
					>
						<td>{session.id}</td>
						<td>{session.coach}</td>
						<td>{session.duration}</td>
						<td>{session.date}</td>
						<td>{session.typeOfTraining}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default SessionTable;
