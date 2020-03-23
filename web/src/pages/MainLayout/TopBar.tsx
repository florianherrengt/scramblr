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
import { searchNotes } from '../../actions';
import { routerUri } from '../../config';

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
            className='MainLayout_TopBar'
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

                <div className='MainLayout_TopBar_SearchContainer width-100'>
                    <div className='MainLayout_TopBar_SearchIconContainer'>
                        <SearchIcon />
                    </div>
                    <InputBase
                        className='MainLayout_TopBar_SearchIconContainer_SearchInput width-100'
                        onChange={event => onSearchChange(event.target.value)}
                        placeholder='Search by tags (comma separed)...'
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>

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
