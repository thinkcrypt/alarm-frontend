'use client';
import { Box, Flex, Grid, GridItem, IconButton, Image, VStack } from '@chakra-ui/react';
import React, { FC, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Slider from 'react-slick';

type GridLeftPartProps = {
	product: any;
	selectedImage: any;
	setSelectedImage: any;
};

const PrevArrow = (props: any) => {
	return (
		<IconButton
			aria-label='Previous'
			onClick={props.onClick}
			{...arrowButtonCss}
			left='10px'>
			<FiChevronLeft size={22} />
		</IconButton>
	);
};

const NextArrow = (props: any) => {
	return (
		<IconButton
			aria-label='Next'
			onClick={props.onClick}
			{...arrowButtonCss}
			right='10px'>
			<FiChevronRight size={22} />
		</IconButton>
	);
};

const GridLeftPart: FC<GridLeftPartProps> = ({ product, selectedImage, setSelectedImage }) => {
	const sliderRef = useRef<Slider | null>(null);
	const [zoomStates, setZoomStates] = useState<{
		[key: number]: {
			isHovered: boolean;
			transformOrigin: string;
			scale: number;
		};
	}>({});

	const handleThumbnailClick = (img: string, index: number) => {
		setSelectedImage(img);
		sliderRef.current?.slickGoTo(index);
	};

	const handleMouseEnter = (index: number) => {
		setZoomStates(prev => ({
			...prev,
			[index]: {
				...prev[index],
				isHovered: true,
				scale: 2.8, // Zoom scale factor
			},
		}));
	};

	const handleMouseLeave = (index: number) => {
		setZoomStates(prev => ({
			...prev,
			[index]: {
				...prev[index],
				isHovered: false,
				scale: 1,
			},
		}));
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setZoomStates(prev => ({
			...prev,
			[index]: {
				...prev[index],
				transformOrigin: `${x}% ${y}%`,
			},
		}));
	};

	return (
		<GridItem>
			<Grid
				templateColumns={{ base: '1fr', md: '1fr 6fr' }}
				gap={2}
				alignItems='stretch'>
				{/* Thumbnails */}
				<Flex
					direction={{ base: 'row', md: 'column' }}
					order={{ base: 2, md: 1 }}
					gap={2}
					// h={{ base: '100%', lg: '800px' }}
				>
					{product?.images?.map((img: any, index: number) => (
						<Image
							key={index}
							src={img}
							alt={product?.name}
							w={{ base: '60px', md: '90px' }}
							h={{ base: '60px', md: '120px' }}
							borderRadius='md'
							border={selectedImage === img ? '2px solid black' : '1px solid gray'}
							cursor='pointer'
							onClick={() => handleThumbnailClick(img, index)}
							style={{
								objectFit: 'cover',
								objectPosition: 'top center',
							}}
						/>
					))}
				</Flex>

				{/* Large Image Slider with Zoom */}
				<Box
					order={{ base: 1, md: 2 }}
					borderRadius='md'
					overflow='hidden'
					w={{ base: '100%', lg: 'full' }}
					h={{ base: '100%', lg: '600px' }}
					position='relative'>
					<Slider
						ref={sliderRef}
						dots={true}
						infinite={true}
						speed={500}
						slidesToShow={1}
						slidesToScroll={1}
						adaptiveHeight={true}
						arrows={true}
						prevArrow={<PrevArrow />}
						nextArrow={<NextArrow />}
						initialSlide={product?.images?.indexOf(selectedImage)}
						beforeChange={(current, next) => setSelectedImage(product?.images[next])}>
						{product?.images?.map((img: any, index: number) => (
							<Box
								key={index}
								borderRadius='md'
								overflow='hidden'>
								<Box
									position='relative'
									w={{ base: '100%', lg: 'full' }}
									h={{ base: '300px', md: '600px', lg: '600px' }}
									overflow='hidden'
									borderRadius='md'
									onMouseEnter={() => handleMouseEnter(index)}
									onMouseLeave={() => handleMouseLeave(index)}
									onMouseMove={e => handleMouseMove(e, index)}>
									<Image
										src={img}
										alt={product?.name}
										w={{ base: '100%', lg: 'full' }}
										h={{ base: '100%', lg: '600px' }}
										objectFit='cover'
										borderRadius='md'
										transition='transform 0.5s ease-out'
										transform={`scale(${zoomStates[index]?.scale || 1})`}
										transformOrigin={zoomStates[index]?.transformOrigin || 'center'}
										cursor={zoomStates[index]?.isHovered ? 'zoom-in' : 'default'}
										style={{
											objectPosition: 'top center',
											objectFit: 'cover',
										}}
									/>
								</Box>
							</Box>
						))}
					</Slider>
				</Box>
			</Grid>
		</GridItem>
	);
};

const arrowButtonCss: any = {
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	bg: 'blackAlpha.600',
	color: 'white',
	borderRadius: 'full',
	zIndex: 2,
	_hover: { bg: 'blackAlpha.700' },
};

export default GridLeftPart;
