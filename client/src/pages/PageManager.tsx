import React, { useState } from 'react';

import Preloader from './Preloader/Preloader';
import Main from './Main/Main';
import Login from './Login/Login';
import Chat from './Chat/Chat';
//import GamePage from './Game/Game';
import NotFound from './NotFound/NotFound';
//import Maps from './Maps/Maps';
import NewsPage from './News/NewsPage';
import AdminPanel from './AdminPanel/AdminPanel';

export enum PAGES {
    PRELOADER,
    MAIN,
    LOGIN,
    CHAT,
    GAME,
    NOT_FOUND,
    MAPS,
    ADMIN_PANEL,
    NEWS
}

export interface IBasePage {
    setPage: (name: PAGES) => void
}

const PageManager: React.FC = () => {
    const [page, setPage] = useState<PAGES>(PAGES.PRELOADER);

    return (
        <>
            {page === PAGES.PRELOADER && <Preloader setPage={setPage} />}
            {page === PAGES.MAIN && <Main setPage={setPage} />}
            {page === PAGES.LOGIN && <Login setPage={setPage} />}
            {page === PAGES.CHAT && <Chat setPage={setPage} />}
            
            {page === PAGES.NOT_FOUND && <NotFound setPage={setPage} />}
            {page === PAGES.MAPS && <NotFound setPage={setPage} />}
            {page === PAGES.ADMIN_PANEL && <AdminPanel setPage={setPage} />}
            {page === PAGES.NEWS && <NewsPage setPage={setPage} />}
        </>
    );
}

export default PageManager;