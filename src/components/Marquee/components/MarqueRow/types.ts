import { MarqueeImage } from '../../types';

export type MarqueeRowProps = {
    images: MarqueeImage[];
    direction: 'left' | 'right';
    /** Зсув індексу для коректної навігації у lightbox */
    indexOffset: number;
};
