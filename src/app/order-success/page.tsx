'use client';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { FiCheckCircle } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OrderSuccess() {
	const router = useRouter();

	return (
		<Container
			maxW='4xl'
			py={20}>
			<VStack
				align='center'
				gap={6}
				textAlign='center'>
				<Box
					fontSize='6xl'
					color='green.500'>
					<FiCheckCircle />
				</Box>

				<Heading
					as='h1'
					size='2xl'
					color='green.600'>
					Order Placed Successfully!
				</Heading>

				<Text
					fontSize='lg'
					color='gray.600'
					maxW='md'>
					Thank you for your purchase. Your order has been received and is being processed. You will
					receive a confirmation email shortly with your order details.
				</Text>

				<VStack
					gap={4}
					pt={6}>
					<Link href='/'>
						<Button
							size='lg'
							colorScheme='blue'>
							Continue Shopping
						</Button>
					</Link>

					<Button
						size='lg'
						variant='outline'
						onClick={() => router.back()}>
						Go Back
					</Button>
				</VStack>
			</VStack>
		</Container>
	);
}
