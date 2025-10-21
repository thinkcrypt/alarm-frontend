import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import SizeBox from './SizeBox'
import AddToCartBuyNow from './AddToCartBuyNow'
import { DetailedProduct } from '../data/productData'
import SizeGuideModal from '../reusable/SizeGuideModal'

interface MobileDialogProps {
  selectedImage: string
  setSelectedImage: (img: string) => void
  images: string[]
  imageHeight: string | number
  thumbnailSize: string | number
  product: DetailedProduct
}


const MobileDialog: React.FC<MobileDialogProps> = ({
  selectedImage,
  setSelectedImage,
  images,
  imageHeight,
  thumbnailSize,
  product,
}) => {
  return (
		<VStack align='stretch' gap={6} w='full'>
			{/* Image Gallery - Mobile */}
			<Box w='full'>
				<Image
					src={selectedImage}
					alt='main product'
					w='full'
					h={imageHeight}
					objectFit='cover'
					borderRadius='md'
					mb={3}
				/>
				<HStack gap={2} justify='center' overflowX='auto' pb={2}>
					{images.map((src, idx) => (
						<Image
							key={idx}
							src={src}
							alt={`thumb-${idx + 1}`}
							boxSize={thumbnailSize}
							minW={thumbnailSize}
							borderRadius='md'
							cursor='pointer'
							objectFit='cover'
							border='2px solid'
							borderColor={selectedImage === src ? 'blue.500' : 'gray.200'}
							onClick={() => setSelectedImage(src)}
							_hover={{ borderColor: 'blue.400' }}
						/>
					))}
				</HStack>
			</Box>

			{/* Product Info - Mobile */}
			<VStack align='start' gap={4} w='full'>
				{/* Title */}
				<Text
					fontSize={{ base: 'lg', sm: 'xl' }}
					fontWeight='bold'
					lineHeight='short'
				>
					Premium Jacquard Polo Shirts for Men
				</Text>

				{/* Price */}
				<VStack align='start' gap={1}>
					<HStack gap={2} wrap='wrap'>
						<Text
							fontSize={{ base: 'lg', sm: 'xl' }}
							fontWeight='bold'
							color='green.600'
						>
							৳1160.00
						</Text>
						<Text as='s' color='gray.400' fontSize={{ base: 'md', sm: 'lg' }}>
							৳1450.00
						</Text>
						<Text
							color='red.500'
							fontSize={{ base: 'md', sm: 'lg' }}
							fontWeight='semibold'
						>
							(20% OFF)
						</Text>
					</HStack>
				</VStack>

				{/* Color */}
				<Box w='full'>
					<Text fontWeight='semibold' mb={2}>
						Color: Navy Blue
					</Text>
					<Image
						src='/image-1.webp'
						alt='color'
						boxSize='40px'
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
				<Box fontSize='sm' color='gray.600' w='full'>
					<Text>SKU: 92139835</Text>
					<Text>Category: Men&apos;s, Polo Shirt</Text>
				</Box>

				<SizeGuideModal product={product} />
			</VStack>
		</VStack>
	);
}

export default MobileDialog