import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import SizeBox from './SizeBox';
import AddToCartBuyNow from './AddToCartBuyNow';
import { DetailedProduct } from '../data/productData';
import SizeGuideModal from '../reusable/SizeGuideModal';

interface DesktopDialogProps {
	selectedImage: string;
	setSelectedImage: (img: string) => void;
	images: string[];
	imageHeight: string | number;
	thumbnailSize: string | number;
	product: DetailedProduct;
}

const DesktopDialog: React.FC<DesktopDialogProps> = ({
	selectedImage,
	setSelectedImage,
	images,
	imageHeight,
	thumbnailSize,
	product,
}) => {
	return (
		<HStack
			align='start'
			justify='space-between'
			gap={6}
			w='full'>
			{/* Left: Gallery - Desktop */}
			<HStack
				gap={4}
				align='start'
				w='50%'
				minW='400px'>
				<VStack
					gap={3}
					align='stretch'
					h={imageHeight}
					maxW={thumbnailSize}>
					{images.map((src, idx) => (
						<Image
							key={idx}
							src={src}
							alt={`thumb-${idx + 1}`}
							flex='1'
							borderRadius='md'
							cursor='pointer'
							objectFit='cover'
							border='2px solid'
							borderColor={selectedImage === src ? 'blue.500' : 'gray.200'}
							onClick={() => setSelectedImage(src)}
							_hover={{ borderColor: 'blue.400' }}
						/>
					))}
				</VStack>
				<Image
					src={selectedImage}
					alt='main product'
					boxSize={imageHeight}
					objectFit='cover'
					borderRadius='md'
				/>
			</HStack>

			{/* Right: Product Info - Desktop */}
			<VStack
				align='start'
				gap={4}
				flex='1'
				minW='300px'>
				{/* Title */}
				<Text
					fontSize='2xl'
					fontWeight='bold'
					lineHeight='short'>
					Premium Jacquard Polo Shirts for Men
				</Text>

				{/* Price */}
				<HStack
					gap={2}
					wrap='wrap'>
					<Text
						fontSize='xl'
						fontWeight='bold'
						color='green.600'>
						৳1160.00
					</Text>
					<Text
						as='s'
						color='gray.400'
						fontSize='lg'>
						৳1450.00
					</Text>
					<Text
						color='red.500'
						fontSize='lg'
						fontWeight='semibold'>
						(20% OFF)
					</Text>
				</HStack>

				{/* Color */}
				<Box>
					<Text
						fontWeight='semibold'
						mb={2}>
						Color: Navy Blue
					</Text>
					<Image
						src='/image-11.webp'
						alt='color'
						boxSize='50px'
						border='1px solid'
						borderColor='gray.300'
						borderRadius='md'
					/>
				</Box>

				{/* Size */}
				<SizeBox />

				{/* Actions */}
				<AddToCartBuyNow product={product} />

				{/* Meta */}
				<Box
					fontSize='sm'
					color='gray.600'
					mt={4}>
					<Text>SKU: 92139835</Text>
					<Text>Category: Men&apos;s, Polo Shirt</Text>
				</Box>

				<SizeGuideModal product={product} />
			</VStack>
		</HStack>
	);
};

export default DesktopDialog;
