'use client';
import React from 'react';
import {
	Box,
	Grid,
	VStack,
	HStack,
	Text,
	Image,
	Input,
	Button,
} from '@chakra-ui/react';
import { FaLock, FaSmile, FaTruck, FaVoicemail } from 'react-icons/fa';

const AdditionalInfo = () => {
	return (
		<Box bg='gray.100' py={10} px={{ base: 4, md: 20 }}>
			<Grid
				templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
				gap={6}
				textAlign='center'
			>
				{/* Payment Methods */}
				<VStack gap={3}>
					
          <FaLock />
					<Text fontWeight='bold'>All Secure Payment Methods</Text>
					<HStack gap={1} wrap='wrap' justify='center'>
						{/* Replace src with your payment logos */}
						<Image src='/logos/visa.jpg' alt='Visa' boxSize='40px' />
						<Image
							src='/logos/master.png'
							alt='Mastercard'
							boxSize='40px'
						/>
						<Image src='/logos/bkash.png' alt='Bkash' boxSize='40px' />
						{/* <Image src='/logos/nagad.png' alt='Nagad' boxSize='40px' />
						<Image
							src='/logos/sslcommerz.png'
							alt='SSL Commerz'
							boxSize='60px'
						/> */}
					</HStack>
				</VStack>

				{/* Satisfaction Guaranteed */}
				<VStack gap={3}>
					<FaSmile />
					<Text fontWeight='bold'>Satisfaction Guaranteed</Text>
					<Text fontSize='sm'>
						Made with premium quality materials.
						<br />
						<b>Cozy yet lasts the test of time</b>
					</Text>
				</VStack>

				{/* Worldwide Delivery */}
				<VStack gap={3}>
					<FaTruck />
					<Text fontWeight='bold'>Worldwide Delivery</Text>
					<HStack gap={4} justify='center'>
						{/* <Image src='/logos/redx.png' alt='RedX' boxSize='50px' /> */}
						<Image src='/logos/pathao.png' alt='Pathao' boxSize='50px' />
						{/* <Image src='/logos/steadfast.png' alt='SteadFast' boxSize='50px' /> */}
					</HStack>
				</VStack>

				{/* Newsletter / Discounts */}
				<VStack gap={3}>
					<FaVoicemail />
					<Text fontWeight='bold'>Get Special Discounts</Text>
					<HStack as='form' w='full' gap={2}>
						<Input placeholder='Enter email ...' size='sm' bg='white' />
						<Button colorScheme='gray' size='sm'>
							Subscribe
						</Button>
					</HStack>
				</VStack>
			</Grid>
		</Box>
	);
};

export default AdditionalInfo;
