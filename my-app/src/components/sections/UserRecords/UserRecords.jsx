import React, { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import PropTypes from 'prop-types';  // Importing PropTypes
import { FormControlLabel, MenuItem, Switch } from '@mui/material';
import API from '../../../api/api';
import { MoreVerticalIcon } from 'lucide-react';
import { Menu } from '@mui/joy';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'userProfile', numeric: false, disablePadding: true, label: 'User Name' },
  { id: 'dateCreated', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'role', numeric: true, disablePadding: false, label: 'Role' },
  { id: 'userStatus', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,  // Adding prop validation
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar sx={[{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }, numSelected > 0 && { bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) }]}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          USERS
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired, 
};



export default function UsersRecordTable() {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('userStatus');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredRow, setHoveredRow] = React.useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await API.get('/user');
        setRows(response.data); 
      } catch (error) {
        console.error("Error fetching User Records", error);
        
      }
    }
    fetchUserData();
  }, [])

  const handleMenuOpen = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setHoveredRow(userId);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setHoveredRow(null);
  };

  const handleAccept = async (userId) => {
    try {
    const response = await API.post(`/user/accept/${userId}`);
    console.log(userId);
    
    console.log(response.data);
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.userId === userId ? { ...row, userStatus: 'ACTIVE' } : row
      )
    );
    } catch (err) {
      console.error("Error acceoting user application: ", err);
    }
    handleMenuClose();
  }

  const handleReject = async (userId) => {
    try {
      const response = await API.post(`user/reject/${userId}`);
      console.log(response.data);
      setRows((prevRows) =>
        prevRows.filter((row) =>
          row.userId !== userId
        )
      );
    } catch (err) {
      console.error("Error rejecting application: ", err); 
    }
    handleMenuClose();
  }
  
  const handleDemote = async (userId) => {
    try{
      const response = await API.post(`/user/demote/${userId}`);
      console.log(response.data);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.userId === userId ? { ...row, role: 'member' } : row
        )
      );
    } catch (err){
      console.error("Error promoting user: ", err);
    }
    handleMenuClose(); 
  }

  const handlePromote = async (userId) => {
    try{
      const response = await API.post(`/user/promote/${userId}`);
      console.log(response.data);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.userId === userId ? { ...row, role: 'admin' } : row
        )
      );
    } catch (err){
      console.error("Error promoting user: ", err);
    }
    handleMenuClose(); 
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

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

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.userId);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover onClick={(event) => handleClick(event, row.userId)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.userId} selected={isItemSelected} sx={{ cursor: 'pointer' }}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>
                    <TableCell sx={{textTransform: "capitalize"}} component="th" id={labelId} scope="row" padding="none">
                      {row.lastName}, {row.firstName} {row.suffix || ''} {row.middleName}
                    </TableCell>
                    <TableCell align="right">{new Date(row.dateCreated).toLocaleDateString()}</TableCell>
                    <TableCell align="right">{row.role? row.role.toUpperCase() : ''}</TableCell>
                    <TableCell align="right">{row.userStatus}</TableCell>
                    <TableCell align="right">
                      <IconButton 
                          onMouseEnter={(event) => handleMenuOpen(event, row.userId)}
                        >
                          <MoreVerticalIcon />
                        </IconButton>
                        <Menu 
                          anchorEl={hoveredRow === row.userId ? anchorEl : null}
                          open={Boolean(anchorEl) && hoveredRow === row.userId}
                          onMouseLeave={handleMenuClose}
                        >
                          {row.userStatus === 'PENDING' && (
                            <>
                              <MenuItem onClick={() => handleAccept(row.userId)}>Accept</MenuItem>
                              <MenuItem onClick={() => handleReject(row.userId)}>Reject</MenuItem>
                            </>
                          )}
                          
                          {row.userStatus === 'ACTIVE' && row.role === 'member'  && (
                            <MenuItem onClick={() => handlePromote(row.userId)}>Promote to Admin</MenuItem>
                          )}

                          {row.role === 'admin' && (
                            <>
                              <MenuItem onClick={() => handleDemote(row.userId)}>Demote to Member</MenuItem>
                            </>
                          )}
                        </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
    </Box>
  );
}
