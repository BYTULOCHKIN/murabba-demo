import clsx from 'clsx';
import { Marquee } from '@/components/Marquee/Marquee';
import { IMAGES } from './constants';
import s from './style.module.css';

const Carousel: React.FC = () => {
    return (
        <main className={clsx(s.page, 'full-height')}>
            <div className={s.hero}>
                <h1 className={s.title}>Welcome Text</h1>
                <img className={s.logo} src="/logos/new_murabba_logo.png" alt="logo" />
            </div>
            <Marquee images={IMAGES} />
        </main>
    );
};

export default Carousel;
