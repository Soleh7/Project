import React, { useEffect } from "react";
import { IBasePage, PAGES } from "../PageManager";

import './Preloader.scss';

const Preloader: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;

    useEffect(() => {
        setTimeout(() => setPage(PAGES.MAIN), 1);
    });

    return (
        <div className="preloader">
            <div className="preloader-wrapper"></div>
            <div>
                <div className="preloader__dots" />
            </div>
            <span>Загрузка...</span>
           
        </div>
    );
}

export default Preloader;