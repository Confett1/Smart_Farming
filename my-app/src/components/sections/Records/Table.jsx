// import * as React from 'react';
import Table from '@mui/joy/Table';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Date', 159, 6.0, 24, 4.0),
  createData('Activity', 237, 9.0, 37, 4.3),
  createData('Status', 262, 16.0, 24, 6.0),
  createData('Duration', 305, 3.7, 67, 4.3),
  createData('Action', 356, 16.0, 49, 3.9),
];

export default function RecordTable() {
  return (
    <Table sx={{bgcolor: 'white', border: '1px solid #e1e1e1'}}>
      <caption>A caption should be a summary of the table.</caption>
      <thead>
        <tr>
          <th style={{ width: '20%' }}>Date</th>
          <th>Activity</th>
          <th>Duration&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Status&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody className='text-left'>
        {rows.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.calories}</td>
            <td>{row.fat}</td>
            <td>{row.carbs}</td>
            <td>{row.protein}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
