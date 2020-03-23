import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import {
    ArrowLeft as ArrowLeftIcon,
    Label as LabelIcon,
    Note as NoteIcon,
    Settings as SettingsIcon,
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
                        className='MainLayout_Drawer_ListItem_Notes'
                        button
                        onClick={() => {
                            history.push(routerUri.notes);
                            setDrawerOpen(false);
                        }}
                    >
                        <ListItemIcon>
                            <NoteIcon />
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
                    <Divider />
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
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Settings' />
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
