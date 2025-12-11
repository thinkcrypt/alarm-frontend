import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { tabSectionStyles } from './styles';
import StarRating from './StarRating';

const ReviewCard: FC<any> = ({ review }) => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase();
	};

	return (
		<Box {...tabSectionStyles.reviewCard}>
			<HStack justify='space-between' mb={2}>
				<HStack>
					<Box
						w={8}
						h={8}
						bg='gray.200'
						borderRadius='full'
						display='flex'
						alignItems='center'
						justifyContent='center'
						fontSize='xs'
						fontWeight='500'
					>
						{getInitials(review.name)}
					</Box>
					<VStack align='start' gap={0}>
						<Text fontSize='sm' fontWeight='500'>
							{review.name}
						</Text>
						<Text fontSize='xs' color='gray.500'>
							{formatDate(review.createdAt)}
						</Text>
					</VStack>
				</HStack>
				<StarRating rating={review?.rating} size='sm' />
			</HStack>
			<Text fontSize='sm' color='gray.700' mt={2}>
				{review?.description}
			</Text>
		</Box>
	);
};

export default ReviewCard;
