import React from 'react';
import PropTypes from 'prop-types';

import {
  List as ListMui,
  ListItem,
} from '@mui/material';

const defaultListStyle = {
  listStyleType: 'disc',
  mt: 2,
  mb: 2,
  pl: 5,
  pt: 0,
  pb: 0,
};

const defaultItemStyle = {
  display: 'list-item',
  p: 0,
};

const List2 = ({
  items,
  itemStyle = {},
  listStyle = {},
}) =>
  <ListMui sx={{ ...defaultListStyle, ...listStyle }}>
    {items.map((item, key) =>
      <ListItem key={key} sx={{ ...defaultItemStyle, ...itemStyle }}>
        {item}
      </ListItem>
    )}
  </ListMui>;

List2.propTypes = {
  items: PropTypes.array,
  listStyle: PropTypes.shape(),
  itemStyle: PropTypes.shape(),
};

export default List2;
