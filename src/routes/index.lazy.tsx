import { createLazyFileRoute } from '@tanstack/react-router';
import Carousel from '@/modules/Carousel';

export const Route = createLazyFileRoute('/')({
    component: Carousel,
});
