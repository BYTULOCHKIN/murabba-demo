import clsx from 'clsx';
import { PhotoProvider } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

import { MarqueeRow } from './components/MarqueRow/MarqueeRow';
import s from './Marquee.module.css';
import { MarqueeProps } from './types';

export const Marquee = ({ images, className }: MarqueeProps) => {
    const mid = Math.ceil(images.length / 2);
    const row1 = images.slice(0, mid);
    const row2 = images.slice(mid);

    return (
        // Один PhotoProvider = єдина галерея для обох рядів
        <PhotoProvider maskOpacity={0.7} photoClassName={s.photo}>
            <div className={clsx(s.container, className)}>
                <MarqueeRow images={row1} direction="left" indexOffset={0} />
                <MarqueeRow images={row2} direction="right" indexOffset={mid} />
            </div>
        </PhotoProvider>
    );
};
