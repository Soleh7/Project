import React, { useContext } from 'react';
import { StoreContext } from '../../App';
import Button from '../Button/Button';
import { IBasePage, PAGES } from '../../pages/PageManager';

const Menu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const user = store.getUser();

    return (
        <div className='menu'>
            {user && <div>{`Привет! ${user.name}`}</div>}
            <Button text='Главная' onClick={() => setPage(PAGES.MAIN)} />
            <Button text='Новости' onClick={() => setPage(PAGES.NEWS)} />
            <Button text='Обращения' onClick={() => setPage(PAGES.CHAT)} />
            <Button text='Авторизация' onClick={() => setPage(PAGES.LOGIN)} />
            <Button text='Админ панель' onClick={() => setPage(PAGES.ADMIN_PANEL)} />
            {user && user.role === 'admin' && (
                <>
                    <Button text='Карты' onClick={() => setPage(PAGES.MAPS)} />
                    <Button text='Админ панель' onClick={() => setPage(PAGES.ADMIN_PANEL)} />
                </>
            )}
        </div>
    );
}

export default Menu;
