import React from 'react';
import PropTypes from 'prop-types';

import {
  List as ListMui,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const defaultListStyle = {
  listStyleType: 'disc',
  mt: 2,
  mb: 2,
  pl: 5,
  pt: 0,
  pb: 0,
};

const defaultListItemStyle = {
  display: 'list-item',
  p: 0,
};

const List = ({
  items,
  listStyle = {},
  listItemStyle = {},
}) => {
  return (
    <ListMui sx={{ ...defaultListStyle, ...listStyle }}>
      {items.map((item, key) => {
        return <ListItem key={key} sx={{ ...defaultListItemStyle, ...listItemStyle }}>
          <ListItemText
            disableTypography={true}
            primary={
              <Typography
                color={item.primary.color}
                variant={item.primary.variant}
              >
                {item.primary.value}
              </Typography>
            }
            secondary={item.secondary ?
              <Typography
                color={item.secondary.color}
                variant={item.secondary.variant}
              >
                {item.secondary.value ? item.secondary.value : null}
              </Typography>
            : null}
          />
        </ListItem>
      })}
    </ListMui>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      primary: PropTypes.shape({
        color: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
        variant: PropTypes.string,
      }).isRequired,
      secondary: PropTypes.shape({
        color: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
        variant: PropTypes.string,
      })
    }).isRequired
  ).isRequired,
  listStyle: PropTypes.shape(),
  listItemStyle: PropTypes.shape(),
};

export default List;
