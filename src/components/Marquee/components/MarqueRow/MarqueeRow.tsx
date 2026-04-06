import clsx from 'clsx';
import { PhotoView } from 'react-photo-view';

import 'react-photo-view/dist/react-photo-view.css';

import s from '../../Marquee.module.css';
import { MarqueeRowProps } from './types';

export const MarqueeRow = ({ images, direction, indexOffset }: MarqueeRowProps) => {
    return (
        <div className={s.row}>
            <div className={clsx(s.track, direction === 'right' && s.trackReverse)}>
                {/* Оригінальні картки — інтерактивні, входять у галерею */}
                {images.map((img, i) => {
                    return (
                        <PhotoView key={`orig-${indexOffset + i}`} src={img.thumb}>
                            <button
                                type="button"
                                className={clsx(s.card, 'focus-primary')}
                                aria-label={img.alt ?? `Зображення ${indexOffset + i + 1}`}
                            >
                                <img
                                    src={img.thumb ?? img.src}
                                    alt={img.alt ?? ''}
                                    className={s.image}
                                    draggable={false}
                                />
                            </button>
                        </PhotoView>
                    );
                })}
                {/* Дублікати — суто візуальні, приховані від a11y */}
                {images.map((img, i) => {
                    return (
                        <div key={`dup-${indexOffset + i}`} className={s.card} aria-hidden="true">
                            <img src={img.thumb ?? img.src} alt="" className={s.image} draggable={false} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
