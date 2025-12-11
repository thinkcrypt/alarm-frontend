import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
// import { StarRatingProps } from './types';

// Full star icon component
const StarIcon = ({
	filled,
	half,
	size,
}: {
	filled: boolean;
	half?: boolean;
	size: number;
}) => {
	if (half) {
		return (
			<svg
				width={size * 6}
				height={size * 6}
				viewBox='0 0 24 24'
				style={{ display: 'block' }}
			>
				<defs>
					<linearGradient id='half-fill'>
						<stop offset='50%' stopColor='#F6D55C' />
						<stop offset='50%' stopColor='#E2E8F0' />
					</linearGradient>
				</defs>
				<path
					d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
					fill='url(#half-fill)'
					stroke='#F6D55C'
					strokeWidth='1'
				/>
			</svg>
		);
	}

	return (
		<svg
			width={size * 6}
			height={size * 6}
			viewBox='0 0 24 24'
			fill={filled ? '#F6D55C' : '#E2E8F0'}
			stroke={filled ? '#F6D55C' : '#CBD5E0'}
			strokeWidth='1'
			style={{ display: 'block' }}
		>
			<path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
		</svg>
	);
};

const StarRating: FC<any> = ({
	rating,
	interactive = false,
	size = 'md',
	onChange,
}) => {
	const handleStarClick = (starRating: number) => {
		if (interactive && onChange) {
			onChange(starRating);
		}
	};

	const starSize =
		size === 'sm' ? 4 : size === 'lg' ? 10 : size === 'xl' ? 12 : 6;

	const getStarState = (starNumber: number) => {
		if (rating >= starNumber) {
			return { filled: true, half: false };
		} else if (rating >= starNumber - 0.5) {
			return { filled: false, half: true };
		} else {
			return { filled: false, half: false };
		}
	};

	return (
		<HStack gap={1}>
			{[1, 2, 3, 4, 5].map(star => {
				const { filled, half } = getStarState(star);

				return (
					<Box
						key={star}
						cursor={interactive ? 'pointer' : 'default'}
						onClick={() => handleStarClick(star)}
						display='flex'
						alignItems='center'
						justifyContent='center'
						transition='transform 0.1s'
						_hover={interactive ? { transform: 'scale(1.1)' } : {}}
					>
						<StarIcon filled={filled} half={half} size={starSize} />
					</Box>
				);
			})}
		</HStack>
	);
};

export default StarRating;
