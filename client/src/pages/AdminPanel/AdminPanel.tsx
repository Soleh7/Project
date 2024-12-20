import React, { useState, useContext, useEffect } from 'react';
import { StoreContext, ServerContext } from '../../App';
import { useBannerContext } from '../../components/BannerContext/BannerContext';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../../pages/PageManager';
import { TBanner } from '../../services/server/types';
import {
    Container,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Box,
    Button as MuiButton
} from '@mui/material';

const AdminPanel: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);
    const server = useContext(ServerContext);
    const { banners, setBanners } = useBannerContext();
    const user = store.getUser();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [newsTitle, setNewsTitle] = useState('');
    const [newsText, setNewsText] = useState('');
    const [newsImage, setNewsImage] = useState('');

    useEffect(() => {
        (async () => {
            if (!banners) {
                const bannersRes = await server.getBanners();
                setBanners(bannersRes);
            }
        })();
    }, [banners, server, setBanners]);

    const addUser = async () => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password, name, role }),
        });
        const result = await response.json();
        if (result.error) {
            alert('Ошибка при добавлении пользователя: ' + result.error);
        } else {
            alert('Пользователь успешно добавлен');
        }
    };

    const addBanner = async () => {
        const response = await server.addBanner(title, text, image, url);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Баннер успешно добавлен');
        } else {
            alert('Ошибка при добавлении баннера');
        }
    };

    const deleteBanner = async (id: number) => {
        const response = await server.deleteBanner(id);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Баннер успешно удален');
        } else {
            alert('Ошибка при удалении баннера');
        }
    };

    const hideBanner = async (id: number, hidden: boolean) => {
        const response = await server.updateBanner(id, hidden);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Баннер успешно скрыт');
        } else {
            alert('Ошибка при скрытии баннера');
        }
    };

    const setBannerOrder = async (id: number, priority: number) => {
        const response = await server.setBannerOrder(id, priority);
        if (response) {
            const bannersRes = await server.getBanners();
            setBanners(bannersRes);
            alert('Приоритет баннера успешно изменен');
        } else {
            alert('Ошибка при изменении приоритета баннера');
        }
    };

    const addNews = async () => {
        const response = await server.addNews(newsTitle, newsText, newsImage);
        if (response) {
            alert('Новость успешно добавлена');
        } else {
            alert('Ошибка при добавлении новости');
        }
    };

    if (user && user.role !== 'admin') {
        return <div>Доступ запрещен</div>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Админ панель
            </Typography>
            <Box
                sx={{
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    padding: '16px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Box mb={4}>
                    <TextField
                        label="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Роль</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="user">Пользователь</MenuItem>
                            <MenuItem value="admin">Администратор</MenuItem>
                            <MenuItem value="executor">Исполнитель</MenuItem>
                        </Select>
                    </FormControl>
                    <MuiButton variant="contained" color="primary" onClick={addUser}>
                        Добавить пользователя
                    </MuiButton>
                </Box>
                <Box mb={4}>
                    <TextField
                        label="Заголовок баннера"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Текст баннера"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Изображение баннера"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="URL баннера"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <MuiButton variant="contained" color="primary" onClick={addBanner}>
                        Добавить баннер
                    </MuiButton>
                </Box>
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom>
                        Список баннеров
                    </Typography>
                    {banners && banners.map((banner: TBanner) => (
                        <Box key={banner.id} mb={2}>
                            <Typography>{banner.title}</Typography>
                            <MuiButton variant="contained" color="secondary" onClick={() => deleteBanner(banner.id)}>
                                Удалить
                            </MuiButton>
                            <MuiButton variant="contained" color="primary" onClick={() => hideBanner(banner.id, !banner.hidden)}>
                                {banner.hidden ? "Показать" : "Скрыть"}
                            </MuiButton>
                            <TextField
                                label="Приоритет"
                                type="number"
                                value={banner.priority}
                                onChange={(e) => setBannerOrder(banner.id, parseInt(e.target.value))}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    ))}
                </Box>
                <Box mb={4}>
                    <TextField
                        label="Заголовок новости"
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Текст новости"
                        value={newsText}
                        onChange={(e) => setNewsText(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Изображение новости"
                        value={newsImage}
                        onChange={(e) => setNewsImage(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <MuiButton variant="contained" color="primary" onClick={addNews}>
                        Добавить новость
                    </MuiButton>
                </Box>
                <MuiButton variant="contained" color="inherit" onClick={() => setPage(PAGES.MAIN)}>
                    Назад
                </MuiButton>
            </Box>
        </Container>
    );
};

export default AdminPanel;
