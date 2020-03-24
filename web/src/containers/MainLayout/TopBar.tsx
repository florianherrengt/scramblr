import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    useMediaQuery,
    useScrollTrigger,
    useTheme,
    Slide,
} from '@material-ui/core';
import {
    AccountCircle as AccountIcon,
    BarChart as InsightsIcon,
    Label as LabelIcon,
    Menu as MenuIcon,
    Notes as NotesIcon,
    Search as SearchIcon,
} from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router';
import { routerUri } from '../../config';
import { Title } from './Title';

interface TopBarProps {
    onMenuClick(): void;
}

export const TopBar: React.SFC<TopBarProps> = props => {
    const history = useHistory();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const scrollTriggerHide = useScrollTrigger();
    const scrollTriggerElevation = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return (
        <Slide appear={false} direction='down' in={!scrollTriggerHide}>
            <AppBar
                className='MainLayout_TopBar'
                elevation={scrollTriggerElevation ? 4 : 0}
                variant='elevation'
                position='sticky'
                color='inherit'
            >
                <Toolbar>
                    <IconButton
                        onClick={() => props.onMenuClick()}
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                    >
                        <MenuIcon />
                    </IconButton>
                    <Title />
                    <div style={{ flexGrow: 1 }} />
                    {isDesktop && (
                        <Fragment>
                            <Button
                                onClick={() => history.push(routerUri.search)}
                                startIcon={<SearchIcon />}
                                color='inherit'
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => history.push(routerUri.notes)}
                                startIcon={<NotesIcon />}
                                color='inherit'
                            >
                                Notes
                            </Button>
                            <Button
                                onClick={() => history.push(routerUri.tags)}
                                startIcon={<LabelIcon />}
                                color='inherit'
                            >
                                Tags
                            </Button>
                            <Button
                                onClick={() => history.push(routerUri.insights)}
                                startIcon={<InsightsIcon />}
                                color='inherit'
                            >
                                Insights
                            </Button>
                        </Fragment>
                    )}
                    <Button
                        onClick={() => history.push(routerUri.settings)}
                        startIcon={<AccountIcon />}
                        color='inherit'
                    >
                        Account
                    </Button>
                </Toolbar>
            </AppBar>
        </Slide>
    );
};
