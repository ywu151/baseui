/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import type {
  StatefulContainerPropsT,
  StateReducerT,
  StateT,
  ParamsT,
  ChangeActionT,
} from './types';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulSelectContainer extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  static defaultProps = {
    initialState: {
      selectedOptions: [],
    },
    stateReducer: defaultStateReducer,
    onTextInputChange: () => {},
    onChange: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onFocus: () => {},
    onBlur: () => {},
  };

  state = {...this.props.initialState};

  onChange = (e: SyntheticInputEvent<HTMLInputElement>, params: ParamsT) => {
    this.internalSetState(params.type, e, params);
    const {onChange} = this.props;
    return onChange(e, params);
  };

  onTextInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onTextInputChange} = this.props;
    onTextInputChange && onTextInputChange(e);
  };

  onMouseEnter = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onMouseEnter} = this.props;
    onMouseEnter && onMouseEnter(e);
  };

  onMouseLeave = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onMouseLeave} = this.props;
    onMouseLeave && onMouseLeave(e);
  };

  onFocus = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onFocus} = this.props;
    onFocus && onFocus(e);
  };

  onBlur = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const {onBlur} = this.props;
    onBlur && onBlur(e);
  };

  internalSetState = (
    type: ChangeActionT,
    e: SyntheticInputEvent<HTMLInputElement>,
    params: ParamsT,
  ) => {
    const nextState = {
      selectedOptions: params.selectedOptions,
    };
    const {stateReducer} = this.props;
    const newState = stateReducer(type, nextState, this.state, e, params);
    this.setState(newState);
  };

  render() {
    const {
      children = (childProps: {}) => null, // eslint-disable-line no-unused-vars
      initialState, // eslint-disable-line no-unused-vars
      stateReducer, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const {
      onChange,
      onTextInputChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    } = this;
    return children({
      ...rest,
      ...this.state,
      onChange,
      onTextInputChange,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }
}

export default StatefulSelectContainer;
