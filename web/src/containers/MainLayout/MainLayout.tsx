import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import {
    Search as SearchIcon,
    ArrowLeft as ArrowLeftIcon,
    Label as LabelIcon,
    Notes as NotesIcon,
    BarChart as InsightsIcon,
    AccountCircle as AccountIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { routerUri } from '../../config';
import { TopBar } from './TopBar';

interface MainLayoutProps {}

const MainLayout: React.SFC<MainLayoutProps> = props => {
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <div className='MainLayout'>
            <TopBar onMenuClick={() => setDrawerOpen(true)} />
            <Drawer
                color='inherit'
                anchor='left'
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <List className='MainLayout_DrawerList'>
                    <ListItem button onClick={() => setDrawerOpen(false)}>
                        <ListItemIcon>
                            <ArrowLeftIcon />
                        </ListItemIcon>
                        <ListItemText primary='Back' />
                    </ListItem>
                    <Divider />
                    <ListItem
                        className='MainLayout_Drawer_ListItem_Search'
                        button
                        onClick={() => {
                            history.push(routerUri.search);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary='Search' />
                    </ListItem>
                    <ListItem
                        className='MainLayout_Drawer_ListItem_Notes'
                        button
                        onClick={() => {
                            history.push(routerUri.notes);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <NotesIcon />
                        </ListItemIcon>
                        <ListItemText primary='Notes' />
                    </ListItem>
                    <ListItem
                        className='MainLayout_Drawer_ListItem_Tags'
                        button
                        onClick={() => {
                            history.push(routerUri.tags);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <LabelIcon />
                        </ListItemIcon>
                        <ListItemText primary='Tags' />
                    </ListItem>
                    <ListItem
                        className='MainLayout_Drawer_ListItem_Insights'
                        button
                        onClick={() => {
                            history.push(routerUri.insights);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <InsightsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Insights' />
                    </ListItem>
                    <div style={{ flexGrow: 1 }} />
                    <ListItem
                        className='MainLayout_Drawer_ListItem_Settings'
                        button
                        onClick={() => {
                            history.push(routerUri.settings);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText primary='Account' />
                    </ListItem>
                </List>
            </Drawer>
            <div>
                <div className='MainLayout_Content'>{props.children}</div>
            </div>
        </div>
    );
};

export { MainLayout };
