import React, { useContext, useEffect, useState } from 'react';
import { ServerContext } from '../../App';
import { TNews } from '../../services/server/types';
import { IBasePage } from '../PageManager';
import CONFIG from '../../config';

//import './NewsPage.scss';

const { STATIC } = CONFIG;

const NewsPage: React.FC<IBasePage> = (props: IBasePage) => {
    const server = useContext(ServerContext);
    const [news, setNews] = useState<TNews[] | null>(null);

    useEffect(() => {
        (async () => {
            if (!news) {
                const newsRes = await server.getNews();
                setNews(newsRes);
            }
        })();
    }, [news, server]);

    return (
        <div className='news-page'>
            <h1>Новости</h1>
            {news && news.map((item) => (
                <div key={item.id} className='news-item'>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                    {item.image && <img src={`${STATIC}${item.image}`} alt={item.title} />}
                    <p>{new Date(item.date).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default NewsPage;
