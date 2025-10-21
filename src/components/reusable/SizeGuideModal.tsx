'use client';
import { Button, Dialog, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

type SizeGuideModalProps = {
	product?: any;
};

const SizeGuideModal: FC<SizeGuideModalProps> = ({ product }) => {
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Text
					cursor='pointer'
					color='blue.500'
					_hover={{ textDecoration: 'underline' }}
				>
					View Size Chart
				</Text>
			</Dialog.Trigger>
			<Dialog.Content
				position='fixed'
				top='45%'
				left='50%'
				transform='translate(-50%, -50%)'
				bg='white'
				borderRadius='md'
				boxShadow='lg'
				p={4}
				zIndex={9999}
				w={{ base: '90%', md: 'auto' }}
				// maxH='80vh'
				overflowY='auto'
			>
				<Dialog.Header fontSize='lg' fontWeight='bold' mb={2}>
					Size Chart
				</Dialog.Header>
				<Dialog.CloseTrigger asChild>
					<Button
						size='sm'
						variant={'outline'}
						position='absolute'
						top={2}
						right={2}
					>
						X
					</Button>
				</Dialog.CloseTrigger>
				<Dialog.Body>
					<Image src={product?.sizeChart} alt='Size Chart' w='100%' />
				</Dialog.Body>
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default SizeGuideModal;
