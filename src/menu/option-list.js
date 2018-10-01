/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
// Components
import {ListItem as StyledListItem} from './styled-components';
import {OPTION_LIST_SIZE} from './constants';
import {getOverrideObject} from '../helpers/overrides';
// Types
import type {OptionListPropsT} from './types';

export default function OptionList({
  item,
  getItemLabel,
  size,
  overrides,
  ...restProps
}: OptionListPropsT) {
  const {component: ListItem, props: listItemProps} = getOverrideObject(
    overrides.ListItem,
    StyledListItem,
  );
  const sharedProps = {
    $size: size,
  };
  return (
    <ListItem {...sharedProps} {...restProps} {...listItemProps}>
      {getItemLabel(item)}
    </ListItem>
  );
}

OptionList.defaultProps = {
  getItemLabel: (item: *) => (item ? item.label : ''),
  size: OPTION_LIST_SIZE.default,
  overrides: {},
};
