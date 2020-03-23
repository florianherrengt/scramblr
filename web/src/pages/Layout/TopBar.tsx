import { AppBar, IconButton, InputBase, Toolbar } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from '@material-ui/icons';
import { useThrottledFn } from 'beautiful-react-hooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { searchNotes } from '../../actions';
import { routerUri } from '../../config';

const SearchContainer = styled.div`
  position: relative;
  margin-left: 24px;
  width: 100%;
`;

const SearchIconContainer = styled.div`
  height: 100%;
  width: 56px;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled(InputBase)`
  width: 100%;
  & {
    input {
      padding: 8px 8px 8px 56px;
    }
  }
`;

interface TopBarProps {
  onMenuClick(): void;
}

export const TopBar: React.SFC<TopBarProps> = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSearchChange = (useThrottledFn((searchValue: string) => {
    dispatch(
      searchNotes({
        searchValue,
      }),
    );
  }, 100) as unknown) as Function;

  return (
    <AppBar
      style={{ color: grey[500] }}
      color='default'
      variant='outlined'
      position='sticky'
    >
      <Toolbar>
        <IconButton
          className='TopBar_IconButton_Menu'
          onClick={() => props.onMenuClick()}
          edge='start'
          color='inherit'
          aria-label='menu'
        >
          <MenuIcon />
        </IconButton>

        <SearchContainer>
          <SearchIconContainer>
            <SearchIcon />
          </SearchIconContainer>
          <SearchInput
            // autoFocus={!!searchValue}
            onChange={event => onSearchChange(event.target.value)}
            // defaultValue={searchValue}
            placeholder='Search by tags (comma separed)...'
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchContainer>

        <div style={{ flexGrow: 1 }} />

        <IconButton
          onClick={() => history.push(routerUri.settings)}
          edge='end'
          color='inherit'
          aria-label='menu'
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
