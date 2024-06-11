'use client';

import { Star } from 'lucide-react';
import { Review } from '@prisma/client';

const HalfFilledStar = ({ size }: { size: number }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24">
            <defs>
                <mask id="half">
                    <rect x="0" y="0" width="12" height="24" fill="white" />
                </mask>
            </defs>
            <Star fill="none" stroke="currentColor" strokeWidth="2" />
            <Star fill="currentColor" mask="url(#half)" />
        </svg>
    );
};

interface ReviewStarsProps {
    reviews: Review[];
    size?: number;
    onClick?: () => void;
    reviewCounter?: boolean
}

const ReviewStars = ({ reviews, size = 16, onClick, reviewCounter }: ReviewStarsProps) => {
    const avgReview = reviews && reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0;

    return (
        <div className={`flex items-center gap-0.5`} onClick={onClick}>
            {Array.from({ length: Math.floor(avgReview) }, (_, i) => (
                <Star key={i} size={size} className="fill-current" />
            ))}
            {avgReview - Math.floor(avgReview) >= 0.5 && <HalfFilledStar size={size} />}
            {Array.from({ length: 5 - Math.ceil(avgReview) }, (_, i) => (
                <Star key={i} size={size} />
            ))}
            {reviewCounter && <div className='font-bold text-xs pl-1'>({reviews.length})</div> }
        </div>
    );
};

export default ReviewStars;
