import React from 'react';
import { Box, Text, VStack, HStack, TextProps, Grid } from '@chakra-ui/react';
import { RadioGroup } from '@chakra-ui/react';

const DeliveryArea = ({ value, setValue }: any) => (
	<Box {...deliveryContainer}>
		<Text {...labelCss}>Choose your Delivery Area</Text>
		<RadioGroup.Root
			value={value}
			onValueChange={(val: any) => setValue(val)}>
			<Grid
				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
				gap={3}>
				<Box
					onClick={() => setValue('inside')}
					{...shippingButton}
					borderColor={value === 'inside' ? 'black' : 'gray.200'}>
					<RadioGroup.Item value='inside'>
						<HStack
							justify='space-between'
							w='full'>
							<Text fontSize='sm'>Inside Dhaka City</Text>
							<Text
								fontSize='sm'
								fontWeight='600'>
								৳60
							</Text>
						</HStack>
					</RadioGroup.Item>
				</Box>
				<Box
					onClick={() => setValue('outside')}
					{...shippingButton}
					borderColor={value === 'outside' ? 'black' : 'gray.200'}>
					<RadioGroup.Item value='outside'>
						<HStack
							justify='space-between'
							w='full'>
							<Text fontSize='sm'>Outside Dhaka City</Text>
							<Text
								fontSize='sm'
								fontWeight='600'>
								৳120
							</Text>
						</HStack>
					</RadioGroup.Item>
				</Box>
			</Grid>
		</RadioGroup.Root>
	</Box>
);

const shippingButton: any = {
	border: '2px solid',
	p: 3,
	bg: 'white',
	cursor: 'pointer',
	_hover: { borderColor: 'black' },
	borderRadius: 'sm',
};

const deliveryContainer: any = {
	border: '1px solid',
	borderColor: 'gray.200',
	borderRadius: 'md',
	p: 4,
	mb: 6,
	bg: 'gray.50',
};

const labelCss: TextProps = {
	fontSize: 'lg',
	fontWeight: '600',
	mb: 4,
	color: 'gray.900',
};

export default DeliveryArea;
