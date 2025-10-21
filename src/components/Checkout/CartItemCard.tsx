import React from 'react';
import { Box, Button, Flex, Image, NumberInput, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteSingleItemFromCart, addToCart, deleteOneFromCart } from '@/store/slices/cartSlice';
import {
	deleteSingleItemNowFromCart,
	addToNowCart,
	deleteOneFromNowCart,
} from '@/store/slices/buyNowSlice';
import { colors } from '../data/color';
import { Delete, Recycle, Trash, X } from 'lucide-react';

const CartItemCard = ({
	item,
	type = 'cart',
	onAmountChange,
}: {
	item: any;
	type?: 'cart' | 'buyNow';
	onAmountChange?: any;
}) => {
	const dispatch = useAppDispatch();

	const handleRemove = () => {
		type === 'cart'
			? dispatch(deleteSingleItemFromCart(item?.uniqueId))
			: dispatch(deleteSingleItemNowFromCart(item?.uniqueId));
	};

	const handleUpdateQuantity = (newQty: number) => {
		const currentQty = item.qty || 0;
		if (newQty <= 0) {
			type == 'cart'
				? dispatch(deleteSingleItemFromCart(item.uniqueId))
				: dispatch(deleteSingleItemNowFromCart(item.uniqueId));
			return;
		}
		if (newQty > currentQty) {
			const delta = newQty - currentQty;
			const addItem = {
				_id: item._id,
				id: item.id,
				name: item.name,
				price: item.unitPrice || item.price,
				vat: item.vat || 0,
				image: item.image,
				selectedSize: item.selectedSize,
				selectedColor: item.selectedColor,
				variationId: item.variationId,
				variantStock: item.variantStock,
			};
			type == 'cart'
				? dispatch(addToCart({ item: addItem, qty: delta }))
				: dispatch(addToNowCart({ item: addItem, qty: delta }));
		} else if (newQty < currentQty) {
			const delta = currentQty - newQty;
			for (let i = 0; i < delta; i++) {
				type == 'cart'
					? dispatch(deleteOneFromCart(item.uniqueId))
					: dispatch(deleteOneFromNowCart(item.uniqueId));
			}
		}
	};

	return (
		<Flex
			justify='space-between'
			gap={4}
			mb={4}>
			<Flex
				gap={4}
				align='center'>
				<Image
					src={item?.image}
					alt={item?.name}
					boxSize='70px'
					rounded='md'
					objectFit='cover'
				/>
				<Box>
					<Text
						fontWeight='semibold'
						fontSize='sm'>
						{item?.name}
					</Text>
					<Text
						fontSize='xs'
						fontWeight='semibold'
						color='gray.600'>
						{item?.variantName}
					</Text>
					<Text
						fontSize='xs'
						color='gray.500'>
						qty: {item.qty}
					</Text>
				</Box>
			</Flex>
			<Flex
				justify='flex-end'
				flexDir='column'
				gap={3}>
				<Text
					ml='auto'
					fontWeight='bold'
					fontSize='sm'>
					৳ {(item.unitPrice ? item.unitPrice * item.qty : item.price).toLocaleString()}
				</Text>
				<Flex
					gap={2}
					align='center'>
					<NumberInput.Root
						size='xs'
						ml='auto'
						w='54px'
						justifySelf='flex-end'
						value={item?.qty?.toString()}
						min={1}
						onValueChange={(details: any) => handleUpdateQuantity(details?.valueAsNumber)}>
						<NumberInput.Control h='32px' />
						<NumberInput.Input
							h='32px'
							border={`.5px solid ${colors?.blackBorder}`}
						/>
					</NumberInput.Root>
					<Button
						variant='outline'
						size='xs'
						colorPalette='red'
						onClick={() => handleRemove()}>
						<Trash size={12} />
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CartItemCard;
