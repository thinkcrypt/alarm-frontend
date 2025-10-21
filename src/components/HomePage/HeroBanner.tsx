'use client';
import { Box, Container, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// const slides = [
// 	{ id: 1, image: '/image-2.webp', logo: '/ddong-logo.png' },
// 	{ id: 2, image: '/image-3.webp', logo: '/ddong-logo.png' },
// 	{ id: 3, image: '/image-4.webp', logo: '/ddong-logo.png' },
// ];

const HeroBanner = ({ banners }: { banners: any }) => (
	<Box
		position='relative'
		w='100%'
		h='100%'>
		<Swiper
			modules={[Autoplay, Pagination]}
			autoplay={{ delay: 4000, disableOnInteraction: false }}
			pagination={{ clickable: true }}
			loop>
			{banners?.map((slide: any) => (
				<SwiperSlide key={slide._id}>
					<Box
						bgImage={`url('${slide?.image}')`}
						bgSize='cover'
						backgroundPosition='center'
						h={{ base: '40vh', sm: '60vh', md: '75vh' }}
						color='white'
						position='relative'
						display='flex'
						alignItems='center'>
						<Box
							position='absolute'
							inset={0}
							bg='blackAlpha.400'
						/>
						{/* <Image
							src='/ddong-logo.png'
							alt='logo'
							w={{ base: '200px', md: '300px' }}
							h={{ base: '200px', md: '300px' }}
							objectFit='contain'
							zIndex={1}
							position='relative'
						/> */}
					</Box>
				</SwiperSlide>
			))}
		</Swiper>
	</Box>
);

export default HeroBanner;
