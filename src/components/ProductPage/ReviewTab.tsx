import React, { useState } from 'react';
import { Box, VStack, Heading, Text, HStack, Textarea, Input, Button } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ReviewTab = () => {
	const [rating, setRating] = useState(0);
	const [reviewText, setReviewText] = useState('');
	const [hoveredRating, setHoveredRating] = useState(0);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const handleStarClick = (starRating: number) => {
		setRating(starRating);
	};

	const handleStarHover = (starRating: number) => {
		setHoveredRating(starRating);
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
					onMouseLeave={() => setHoveredRating(0)}>
					{isFilled ? (
						<AiFillStar
							color='gold'
							size={20}
						/>
					) : (
						<AiOutlineStar
							color='gold'
							size={20}
						/>
					)}
				</Box>
			) : isFilled ? (
				<AiFillStar
					key={i}
					color='gold'
					size={20}
				/>
			) : (
				<AiOutlineStar
					key={i}
					color='gold'
					size={20}
				/>
			);
		});
	};
	const handleEnhancedSubmitReview = () => {
		if (!rating) {
			alert('Please select a rating before submitting your review.');
			return;
		}
		if (!reviewText.trim()) {
			alert('Please write a review before submitting.');
			return;
		}
		if (!name.trim() || !email.trim()) {
			alert('Please fill in your name and email.');
			return;
		}

		// Reset form
		setRating(0);
		setReviewText('');
		setName('');
		setEmail('');

		alert('Thank you for your review! It will be published after moderation.');
	};
	return (
		<VStack
			align='start'
			gap={6}
			width='100%'>
			<Heading
				size='lg'
				color='gray.800'>
				Customer Reviews
			</Heading>

			{/* Sample existing review */}
			{/* <Box
                            p={6}
                            border='1px solid'
                            borderColor='gray.200'
                            borderRadius='md'
                            width='100%'
                            maxW='2xl'
                            bg='white'
                            boxShadow='sm'>
                            <HStack
                                justify='space-between'
                                mb={2}>
                                <Text fontWeight='bold'>Sarah Johnson</Text>
                                <HStack>{renderStars(false)}</HStack>
                            </HStack>
                            <Text
                                color='gray.600'
                                fontSize='sm'
                                mb={2}>
                                Verified Purchase • 2 weeks ago
                            </Text>
                            <Text color='gray.700'>
                                {
                                    "Absolutely love this cashmere sweater! The quality is exceptional and it's incredibly soft. Perfect fit and the color is exactly as shown. Highly recommend!"
                                }
                            </Text>
                        </Box> */}

			{/* Write a Review Form */}
			<Box
				width={{ base: '100%', md: '60%' }}
				maxW='2xl'
				p={6}
				bg='white'
				border='1px solid'
				borderColor='gray.200'
				borderRadius='md'
				boxShadow='sm'>
				<Heading
					size='md'
					mb={4}
					color='gray.800'>
					Write a Review
				</Heading>

				<VStack
					align='start'
					gap={4}>
					{/* Rating */}
					<Box>
						<Text
							fontWeight='semibold'
							mb={2}
							color='gray.700'>
							Your Rating *
						</Text>
						<HStack>{renderStars(true)}</HStack>
						{rating > 0 && (
							<Text
								fontSize='sm'
								color='gray.600'
								mt={1}>
								You rated this product {rating} out of 5 stars
							</Text>
						)}
					</Box>

					{/* Review Text */}
					<Box width='100%'>
						<Text
							fontWeight='semibold'
							mb={2}
							color='gray.700'>
							Your Review *
						</Text>
						<Textarea
							placeholder='Share your experience with this product...'
							value={reviewText}
							onChange={e => setReviewText(e.target.value)}
							border={'1px solid #e2e8f0'}
							minH='120px'
							_focus={{
								borderColor: 'blue.500',
								boxShadow: '0 0 0 1px blue.500',
							}}
						/>
					</Box>

					{/* Name & Email */}
					<HStack
						width='100%'
						gap={4}>
						<Box flex={1}>
							<Text
								fontWeight='semibold'
								mb={2}
								color='gray.700'>
								Your Name *
							</Text>
							<Input
								placeholder='Enter your name'
								value={name}
								onChange={e => setName(e.target.value)}
								border={'1px solid #e2e8f0'}
								_focus={{
									borderColor: 'blue.500',
									boxShadow: '0 0 0 1px blue.500',
								}}
							/>
						</Box>
						<Box flex={1}>
							<Text
								fontWeight='semibold'
								mb={2}
								color='gray.700'>
								Your Email *
							</Text>
							<Input
								placeholder='Enter your email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
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
						mt={2}>
						Submit Review
					</Button>

					<Text
						fontSize='sm'
						color='gray.500'>
						* Required fields. Your review will be published after moderation.
					</Text>
				</VStack>
			</Box>
		</VStack>
	);
};

export default ReviewTab;
