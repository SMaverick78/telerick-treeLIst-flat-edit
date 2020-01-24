import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: 25,
    width: 25
  }
});

const Button = props => {
  const classes = useStyles();
  const { tagIcon: TagIcon, onClick } = props;

  return (
    <IconButton onClick={onClick} size={'small'}>
      <TagIcon />
    </IconButton>
  );
};

export default Button;