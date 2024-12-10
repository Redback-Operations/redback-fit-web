import { MouseEventHandler, useCallback, useState } from 'react';
import data from '../SessionsTable/SessionsTable.json';

type Data = typeof data;
type SortKeys = keyof Data[0];
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

	const sortedData = data.sort((a, b) => {
		return a[sortKey] > b[sortKey] ? 1 : -1;
	});

	if (reverse) {
		return sortedData.reverse();
	}

	return sortedData;
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
			style={{ backgroundColor: 'black' }}
			onClick={onClick}
			className={`${
				sortKey === columnKey && sortOrder === 'desc'
					? 'sort-button sort-reverse'
					: 'sort-button'
			}`}
		>
			▲
		</button>
	);
}

function SessionTable({
	data,
	onRowClick,
}: {
	data: Data;
	onRowClick: (session: Data[0]) => void;
}) {
	const [sortKey, setSortKey] = useState<SortKeys>('id');
	const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
	const [selectedId, setSelectedId] = useState<number | null>(1); // Track selected item ID

	const headers: { key: SortKeys; label: string }[] = [
		{ key: 'id', label: 'Session' },
		{ key: 'coach', label: 'Coach' },
		{ key: 'duration', label: 'Duration' },
		{ key: 'date', label: 'Date' },
		{ key: 'typeOfTraining', label: 'Training' },
	];

	const sortedData = useCallback(
		() => sortData({ tableData: data, sortKey, reverse: sortOrder === 'desc' }),
		[data, sortKey, sortOrder]
	);

	function changeSort(key: SortKeys) {
		setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn');
		setSortKey(key);
	}

	function handleRowClick(session: Data[0]) {
		setSelectedId(session.id); // Set the clicked item's ID
		onRowClick(session); // Trigger parent callback
	}

	return (
		<table>
			<thead>
				<tr>
					{headers.map((row) => {
						return (
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
						);
					})}
				</tr>
			</thead>

			<tbody>
				{sortedData().map((session) => (
					<tr
						key={session.id}
						style={{
							cursor: 'pointer',
							backgroundColor: selectedId === session.id ? 'lightblue' : '#e97462', // Conditional styling
						}}
						onClick={() => handleRowClick(session)} // Pass clicked session to the parent
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
