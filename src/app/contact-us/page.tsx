'use client';
import React, { FC, useState } from 'react';
import {
	Box,
	Heading,
	Text,
	Input,
	Textarea,
	Button,
	Stack,
} from '@chakra-ui/react';
import PageLayout from '@/components/Layout/PageLayout';

type ContactUsPageProps = {};

const ContactUsPage: FC<ContactUsPageProps> = ({}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [loading, setLoading] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		setTimeout(() => {
			setLoading(false);
			setToastMessage(
				'Message sent successfully! We will get back to you shortly.'
			);
			setFormData({ name: '', email: '', subject: '', message: '' });

			setTimeout(() => setToastMessage(''), 5000);
		}, 1000);
	};

	return (
		<PageLayout>
			<Box maxW='4xl' mx='auto' px={6} py={10}>
				<Heading mb={6} size='2xl' textAlign='center'>
					Contact Us
				</Heading>

				<Text mb={8} textAlign='center'>
					Have questions or need assistance? Fill out the form below and we’ll
					get back to you soon.
				</Text>

				{toastMessage && (
					<Box
						bg='green.400'
						color='white'
						px={4}
						py={2}
						borderRadius='md'
						mb={4}
						textAlign='center'
					>
						{toastMessage}
					</Box>
				)}

				<Box as='form' onSubmit={handleSubmit}>
					<Stack gap={4}>
						<Box>
							<Input
								placeholder='Your Name'
								name='name'
								value={formData.name}
								onChange={handleChange}
								required
								border={'1px solid black'}
							/>
						</Box>

						<Box>
							<Input
								type='email'
								placeholder='Your Email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								required
								border={'1px solid black'}
							/>
						</Box>

						<Box>
							<Input
								placeholder='Subject'
								name='subject'
								value={formData.subject}
								onChange={handleChange}
								required
								border={'1px solid black'}
							/>
						</Box>

						<Box>
							<Textarea
								placeholder='Your Message'
								name='message'
								value={formData.message}
								onChange={handleChange}
								rows={6}
								required
								border={'1px solid black'}
							/>
						</Box>

						<Button type='submit' colorScheme='blue'>
							Send Message
						</Button>
					</Stack>
				</Box>
			</Box>
		</PageLayout>
	);
};

export default ContactUsPage;

// 