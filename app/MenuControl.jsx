import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from './Button';

const MenuControl = (props) => {
  const { dataItem, addChild } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    dataItem.rowType !== 'ROW' && <React.Fragment>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        tagIcon={AddIcon}
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Button 
            tagIcon={AccountTreeIcon}
            onClick={() => addChild(dataItem)}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            tagIcon={InsertDriveFileIcon}
            onClick={() => addChild(dataItem)}
          />
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default MenuControl;