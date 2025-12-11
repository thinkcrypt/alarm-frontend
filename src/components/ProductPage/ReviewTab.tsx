import React, { useEffect, useState } from 'react';
import {
	Box,
	VStack,
	Heading,
	Text,
	HStack,
	Textarea,
	Input,
	Button,
} from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useGetSelfQuery } from '@/store/services/authApi';
import { useGetAllQuery, usePostMutation } from '@/store/services/commonApi';
import { Toaster, toaster } from '../ui/toaster';
import { tabSectionStyles } from './styles';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';

const ReviewTab = ({ product }: any) => {
	const averageRating = product?.rating;
	const { data } = useGetSelfQuery({});
	const [trigger, result] = usePostMutation();
	const { data: reviewData, isFetching } = useGetAllQuery({
		path: `/reviews?product=${product?._id}`,
		limit: 16,
		sort: '-createdAt',
	});
	const [rating, setRating] = useState(0);
	const [hoveredRating, setHoveredRating] = useState(0);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		rating: rating || 0,
		title: '',
		description: '',
		images: [],
		product: product?._id,
	});

	const handleStarClick = (starRating: number) => {
		setRating(starRating);
		setFormData(prev => ({
			...prev,
			rating: starRating,
		}));
	};

	const handleStarHover = (starRating: number) => {
		setHoveredRating(starRating);
	};
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const showToast = (message: string, type: 'success' | 'error') => {
		toaster.create({
			title: type === 'success' ? 'Success' : 'Error',
			description: message,
			type: type,
			duration: 5000,
		});
	};
	const renderStars = (interactive = false) => {
		return [1, 2, 3, 4, 5].map(i => {
			const isFilled = interactive ? i <= (hoveredRating || rating) : i <= 4; // Default rating for display

			return interactive ? (
				<Box
					key={i}
					cursor='pointer'
					onClick={() => handleStarClick(i)}
					onMouseEnter={() => handleStarHover(i)}
					onMouseLeave={() => setHoveredRating(0)}
				>
					{isFilled ? (
						<AiFillStar color='gold' size={20} />
					) : (
						<AiOutlineStar color='gold' size={20} />
					)}
				</Box>
			) : isFilled ? (
				<AiFillStar key={i} color='gold' size={20} />
			) : (
				<AiOutlineStar key={i} color='gold' size={20} />
			);
		});
	};
	const handleEnhancedSubmitReview = () => {
		if (!rating) {
			showToast(
				'Please select a rating before submitting your review.',
				'error'
			);
			return;
		}
		if (!formData?.description?.trim()) {
			showToast('Please write a review before submitting.', 'error');

			return;
		}
		if (!formData?.name?.trim() || !formData?.phone?.trim()) {
			showToast('Please fill in your name and phone.', 'error');

			return;
		}
		// send formdata
		trigger({
			path: '/reviews',
			body: formData,
			invalidate: [`/reviews?product=${product?._id}`],
		});

		// Reset form
		setRating(0);
		setHoveredRating(0);
		setFormData({
			name: '',
			phone: '',
			rating: 0,
			title: '',
			description: '',
			images: [],
			product: product?._id,
		});
	};
	// effects
	useEffect(() => {
		if (data) {
			setFormData({
				name: data?.name || '',
				phone: data?.phone || '',
				rating: 5,
				description: '',
				title: '',
				images: [],
				product: product?._id,
			});
		}
	}, [data, product?._id]);
	// review
	useEffect(() => {
		if (result?.isLoading) return;
		if (result.isSuccess) {
			showToast('Review submitted successfully', 'success');
			setFormData({
				...formData,
				title: '',
				rating: 5,
			});
		} else if (result.isError) {
			showToast(
				(result as any).error.data.message || 'Failed to submit review',
				'error'
			);
		}
	}, [result]);
	return (
		<VStack align='start' gap={6} width='100%'>
			{/* Sample existing review */}
			{/* <Box
				p={6}
				border='1px solid'
				borderColor='gray.200'
				borderRadius='md'
				width='100%'
				maxW='2xl'
				bg='white'
				boxShadow='sm'
			>
				<HStack justify='space-between' mb={2}>
					<Text fontWeight='bold'>Sarah Johnson</Text>
					<HStack>{renderStars(false)}</HStack>
				</HStack>
				<Text color='gray.600' fontSize='sm' mb={2}>
					Verified Purchase • 2 weeks ago
				</Text>
				<Text color='gray.700'>
					{
						"Absolutely love this cashmere sweater! The quality is exceptional and it's incredibly soft. Perfect fit and the color is exactly as shown. Highly recommend!"
					}
				</Text>
			</Box> */}
			<Box flex={1}>
				<HStack align='center' justify='space-between' mb={6}>
					<Text {...tabSectionStyles.sectionTitle}>Customer Reviews</Text>

					<HStack align='center'>
						<StarRating rating={Number(averageRating)} size='sm' />
						<Text fontSize='sm' color='gray.600'>
							({reviewData?.totalDocs} review
							{reviewData?.totalDocs !== 1 ? 's' : ''})
						</Text>
					</HStack>
				</HStack>

				{isFetching ? (
					<Text {...tabSectionStyles.emptyState}>Loading Reviews...</Text>
				) : reviewData?.totalDocs === 0 ? (
					<Text {...tabSectionStyles.emptyState}>
						No reviews yet. Be the first to review this product!
					</Text>
				) : (
					<VStack gap={4} align='stretch'>
						{reviewData?.doc?.map((review: any) => (
							<ReviewCard key={review._id} review={review} />
						))}
					</VStack>
				)}
			</Box>
			{/* Write a Review Form */}
			<Box
				width={{ base: '100%', md: '60%' }}
				maxW='2xl'
				p={6}
				bg='white'
				border='1px solid'
				borderColor='gray.200'
				borderRadius='md'
				boxShadow='sm'
			>
				<Heading size='md' mb={4} color='gray.800'>
					Write a Review
				</Heading>

				<VStack align='start' gap={4}>
					{/* Rating */}
					<Box>
						<Text fontWeight='semibold' mb={2} color='gray.700'>
							Your Rating *
						</Text>
						<HStack>{renderStars(true)}</HStack>
						{rating > 0 && (
							<Text fontSize='sm' color='gray.600' mt={1}>
								You rated this product {rating} out of 5 stars
							</Text>
						)}
					</Box>

					{/* Review Text */}
					<Box width='100%'>
						<Text fontWeight='semibold' mb={2} color='gray.700'>
							Your Review *
						</Text>
						<Textarea
							placeholder='Share your experience with this product...'
							value={formData?.description}
							name='description'
							onChange={handleInputChange}
							border={'1px solid #e2e8f0'}
							minH='120px'
							_focus={{
								borderColor: 'blue.500',
								boxShadow: '0 0 0 1px blue.500',
							}}
						/>
					</Box>

					{/* Name & Email */}
					<HStack width='100%' gap={4}>
						<Box flex={1}>
							<Text fontWeight='semibold' mb={2} color='gray.700'>
								Your Name *
							</Text>
							<Input
								placeholder='Enter your name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								border={'1px solid #e2e8f0'}
								_focus={{
									borderColor: 'blue.500',
									boxShadow: '0 0 0 1px blue.500',
								}}
							/>
						</Box>
						<Box flex={1}>
							<Text fontWeight='semibold' mb={2} color='gray.700'>
								Your Phone *
							</Text>
							<Input
								placeholder='Enter your phone'
								name='phone'
								type='text'
								value={formData?.phone}
								onChange={handleInputChange}
								border={'1px solid #e2e8f0'}
								_focus={{
									borderColor: 'blue.500',
									boxShadow: '0 0 0 1px blue.500',
								}}
							/>
						</Box>
					</HStack>

					{/* Submit Button */}
					<Button
						colorScheme='blue'
						onClick={handleEnhancedSubmitReview}
						size='lg'
						mt={2}
						loading={result?.isLoading}
					>
						Submit Review
					</Button>

					<Text fontSize='sm' color='gray.500'>
						* Required fields. Your review will be published after moderation.
					</Text>
					<Toaster />
				</VStack>
			</Box>
		</VStack>
	);
};

export default ReviewTab;
