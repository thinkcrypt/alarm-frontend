'use client';

import { Box, Flex, Image, Text, Button, NumberInput } from '@chakra-ui/react';
import { X } from 'lucide-react';
import React from 'react';
import { colors } from '../data/color';

interface CartItemCardProps {
	item: any;
	onRemove?: (id: number) => void;
	onUpdateQuantity?: (qty: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove, onUpdateQuantity }) => {
	return (
		<Flex
			border={`.5px solid ${colors.blackBorder}`}
			bg={colors.whiteBg}
			borderRadius='md'
			p={4}
			align='center'
			gap={4}
			flexWrap='wrap'>
			<Image
				src={item.image}
				alt={item.title}
				boxSize='100px'
				objectFit='cover'
				borderRadius='md'
			/>
			<Box
				flex='1'
				minW='200px'>
				<Text fontWeight='bold'>{item?.title}</Text>
				{item?.variantName ? (
					<Text
						fontSize='sm'
						color='gray.500'
						fontWeight='medium'
						mt={1}>
						{item?.variantName}
					</Text>
				) : (
					<Text
						fontSize='sm'
						color='gray.600'>
						{item?.size}, {item?.color}
					</Text>
				)}

				{onUpdateQuantity && (
					<Flex
						mt={2}
						align='center'
						gap={2}>
						<NumberInput.Root
							value={item.quantity.toString()}
							min={1}
							width='120px'
							onValueChange={details => onUpdateQuantity(details?.valueAsNumber)}>
							<NumberInput.Control />
							<NumberInput.Input
								border={`1px solid ${colors?.blackBorder}`}
								borderRadius='md'
							/>
						</NumberInput.Root>
					</Flex>
				)}
			</Box>
			<Box textAlign='right'>
				<Text fontWeight='bold'>৳ {(item.price * item.quantity).toLocaleString()}</Text>
				{onRemove && (
					<Button
						variant='outline'
						size='sm'
						colorPalette='red'
						mt={2}
						onClick={() => onRemove(item.id)}>
						<X size={14} />
						Remove
					</Button>
				)}
			</Box>
		</Flex>
	);
};

export default CartItemCard;
