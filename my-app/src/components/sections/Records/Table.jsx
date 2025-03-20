// import React, { useEffect } from 'react';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { visuallyHidden } from '@mui/utils';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import PropTypes from 'prop-types';  // Importing PropTypes
// import { FormControlLabel, Switch } from '@mui/material';
// import API from '../../../api/api';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   { id: 'activityName', numeric: false, disablePadding: true, label: 'Activity Name' },
//   { id: 'timestamp', numeric: true, disablePadding: false, label: 'Date' },
//   { id: 'duration', numeric: true, disablePadding: false, label: 'Duration' },
//   { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox" sx={{ display: "none" }}>
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,  // Adding prop validation
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar sx={[{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }, numSelected > 0 && { bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) }]}>
//       {numSelected > 0 ? (
//         <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
//           RECORDS
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,  // Adding prop validation
// };

// export default function RecordTable() {
//   const [order, setOrder] = React.useState('desc');
//   const [orderBy, setOrderBy] = React.useState('timestamp');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(true);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);
//   const [rows, setRows] = React.useState([]);

//   useEffect(() => {
//     const fetchRecordData = async () => {
//       try {
//         const response = await API.get('/records');
//         setRows(response.data);
//       } catch (error) {
//         console.error("Error fetching Records", error);
        
//       }
//     }
//     fetchRecordData();

//     const interval = setInterval(fetchRecordData, 10000);
//     return () => clearInterval(interval);
//   }, [])

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage, rows]
//   );

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar  />
//         <TableContainer>
//           <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
//             <EnhancedTableHead
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = selected.includes(row.recordId);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow hover onClick={(event) => handleClick(event, row.recordId)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.recordId} selected={isItemSelected} sx={{ cursor: 'pointer' }}>
//                     <TableCell padding="checkbox" sx={{ display: "none" }}>
//                       <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
//                     </TableCell>
//                     <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ textTransform: "capitalize" }}>
//                       {row.activityName}
//                     </TableCell>
//                     <TableCell align="right" sx={{ textTransform: "capitalize" }}>{new Date(row.timestamp).toLocaleDateString()}</TableCell>
//                     <TableCell align="right" sx={{ textTransform: "capitalize" }}>{row.duration} {row.duration === 1 ? "Minute" : "Minutes"}</TableCell>
//                     <TableCell align="right" sx={{ textTransform: "capitalize" }}>{row.status}</TableCell>
//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel control={<Switch  checked={dense} onChange={handleChangeDense}/>} label="Dense padding" sx={{ display: "none" }} />
//     </Box>
//   );
// }






















import React, { useEffect } from 'react';
// import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { visuallyHidden } from '@mui/utils';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@mui/material';
import API from '../../../api/api';

const headCells = [
  { id: 'no', numeric: true, disablePadding: false, label: 'No.' },
  { id: 'activityName', numeric: false, disablePadding: true, label: 'Activity Name' },
  { id: 'timestamp', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'duration', numeric: true, disablePadding: false, label: 'Duration (Minute/s)' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function EnhancedTableHead({ order, orderBy, darkModePref }) {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 600, color: darkModePref ? 'green' : '#d1d5db' }}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.string.isRequired,
  darkModePref: PropTypes.bool.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default function RecordTable({darkModePref, filterType}) {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const fetchRecordData = async () => {
      try {
        const response = await API.get('/records');
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching Records", error);
      }
    };
    fetchRecordData();
    const interval = setInterval(fetchRecordData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredRows = filterType === "all" ? rows : rows.filter((row) => row.status === filterType);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    return [...filteredRows]
      .reverse()
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, filteredRows]);

  return (
    
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer className={`${darkModePref ? "bg-white" : "bg-gray-800"}`}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead darkModePref={darkModePref}/>
            <TableBody>
              {visibleRows.map((row, index) => {
                const rowNumber = page * rowsPerPage + index + 1;
                return (
                  <TableRow
                    sx={{
                      color: darkModePref ? "black" : "white",
                      cursor: "pointer"
                    }}
                    className={`${darkModePref ? "bg-white" : "bg-gray-800 text-gray-300"}`}
                    tabIndex={-1} key={row.recordId}
                  >
                    <TableCell align='center' sx={{textTransform: "capitalize", mr: 3, color: darkModePref ? "black" : '#d1d5db'}}>{rowNumber}</TableCell>
                    <TableCell align='center' sx={{ textTransform: "capitalize", color: darkModePref ? "black" : '#d1d5db' }}>{row.activityName}</TableCell>
                    <TableCell align="center" sx={{color: darkModePref ? "black" : '#d1d5db'}}>{new Date(row.timestamp).toLocaleString()}</TableCell>
                    <TableCell align="center" sx={{color: darkModePref ? "black" : '#d1d5db'}}>
                      {row?.duration || '----'}
                    </TableCell>
                    <TableCell align='center' sx={{ textTransform: 'capitalize', color: darkModePref ? "black" : '#d1d5db'    }}>{row.status}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={`${darkModePref ? "bg-white" : "bg-gray-800"}`}
          sx={{
            color: darkModePref ? "black" : '#d1d5db',
            "& .MuiSvgIcon-root": {
              color: darkModePref ? "black" : "#d1d5db", // Changes color of pagination icons
            },
            "& .MuiTablePagination-actions": {
              "& button": {
                color: darkModePref ? "black" : "#d1d5db", // Ensures buttons (prev/next) match the theme
              },
            },
          }}
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" sx={{ display: "none" }} />
    </Box>
  );
};

RecordTable.propTypes = {
  darkModePref: PropTypes.bool.isRequired,
  filterType: PropTypes.string.isRequired,
}
