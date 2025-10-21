import React from 'react';
import { FC } from 'react';
import { Box, Button, VStack, HStack, Heading, Text, Image, useDisclosure } from '@chakra-ui/react';

const SizeGuideModal: FC<{ product: any }> = ({ product }) => {
	const { open: isOpen, onOpen, onClose } = useDisclosure();

	// Sample size chart data
	const sizeChartData = [
		{ size: 'XS', chest: '32-34', waist: '26-28', hip: '34-36' },
		{ size: 'S', chest: '34-36', waist: '28-30', hip: '36-38' },
		{ size: 'M', chest: '36-38', waist: '30-32', hip: '38-40' },
		{ size: 'L', chest: '38-40', waist: '32-34', hip: '40-42' },
		{ size: 'XL', chest: '40-42', waist: '34-36', hip: '42-44' },
		{ size: 'XXL', chest: '42-44', waist: '36-38', hip: '44-46' },
	];

	return (
		<>
			<Button
				variant='ghost'
				size='sm'
				onClick={onOpen}
				textDecoration='underline'
				color='blue.500'
				p={0}
				h='auto'
				minH='auto'
				_hover={{ bg: 'transparent', color: 'blue.600' }}
			>
				View Size Chart
			</Button>

			{isOpen && (
				<Box
					position='fixed'
					top='0'
					left='0'
					w='100vw'
					h='100vh'
					bg='blackAlpha.600'
					display='flex'
					alignItems='center'
					justifyContent='center'
					zIndex={1000}
					onClick={onClose}
				>
					<Box
						bg='white'
						borderRadius='lg'
						maxW='600px'
						maxH='90vh'
						w='90%'
						p={6}
						overflowY='auto'
						onClick={e => e.stopPropagation()}
					>
						{/* Header */}
						<HStack justify='space-between' mb={4}>
							<Heading size='lg'>Size Guide - {product?.name}</Heading>
							<Button variant='ghost' size='sm' onClick={onClose}>
								✕
							</Button>
						</HStack>

						<VStack gap={6} align='stretch'>
							{/* Size Chart Image */}
							<Image
								src={product?.sizeChart}
								alt='Size Chart Guide'
								borderRadius='md'
								objectFit='cover'
								w='100%'
								h='auto'
							/>						

							{/* Footer Button */}
							<HStack justify='flex-end'>
								<Button colorScheme='blue' onClick={onClose}>
									Got it!
								</Button>
							</HStack>
						</VStack>
					</Box>
				</Box>
			)}
		</>
	);
};
export default SizeGuideModal;
// d