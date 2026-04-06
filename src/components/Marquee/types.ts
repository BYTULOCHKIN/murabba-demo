export type MarqueeImage = {
    src: string;
    alt?: string;
    /** Якщо є окремий thumbnail — використовується для відображення в каруселі */
    thumb?: string;
};

export type MarqueeProps = {
    images: MarqueeImage[];
    className?: string;
};
