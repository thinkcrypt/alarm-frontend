'use client';
import {
	Box,
	Button,
	Checkbox,
	Field,
	HStack,
	Input,
	Link,
	Stack,
	Tabs,
	Text,
	VStack,
} from '@chakra-ui/react';
import React, { FC, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { colors } from '../data/color';
import { useLoginMutation } from '@/store/services/authApi';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks';
import { login } from '@/store/slices/authSlice';

type LoginTabProps = {
	showPassword: boolean;
	setShowPassword: (val: boolean) => void;
	loginData: {
		emailOrPhone: string;
		password: string;
		keepLoggedIn: boolean;
	};
	setLoginData: React.Dispatch<
		React.SetStateAction<{
			emailOrPhone: string;
			password: string;
			keepLoggedIn: boolean;
		}>
	>;
	handleLogin: () => void;
};

const LoginTab: FC<LoginTabProps> = ({
	showPassword,
	setShowPassword,
	loginData,
	setLoginData,
}) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [trigger, { data, isLoading, isSuccess, error }] = useLoginMutation();
	const [localError, setLocalError] = useState('');
	const [localSuccess, setLocalSuccess] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');
		setLocalSuccess('');

		await trigger({
			email: loginData.emailOrPhone,
			password: loginData.password,
		});
	};

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(login(data));
			setLocalSuccess('Logged in successfully!');
		}
	}, [data, isSuccess, dispatch, router]);

	return (
		<Tabs.Content value='login'>
			<form
				onSubmit={handleSubmit}
				className='w-full'>
				<VStack
					gap={4}
					w='full'>
					<Text
						fontSize='2xl'
						fontWeight='bold'
						textAlign='center'
						color='gray.700'>
						Login
					</Text>

					<Stack
						gap={4}
						w='full'>
						<Field.Root
							required
							w='full'>
							<Field.Label>
								Email or Phone <Field.RequiredIndicator />
							</Field.Label>
							<Input
								border={`1px solid ${colors.blackBorder}`}
								type='text'
								placeholder='Enter your email or phone'
								value={loginData.emailOrPhone}
								onChange={e =>
									setLoginData(prev => ({
										...prev,
										emailOrPhone: e.target.value,
									}))
								}
								w='full'
							/>
							<Field.HelperText>{"We'll use this to verify your identity."}</Field.HelperText>
						</Field.Root>

						<Field.Root
							required
							w='full'>
							<Field.Label>
								Password <Field.RequiredIndicator />
							</Field.Label>
							<Box
								position='relative'
								w='full'>
								<Input
									border={`1px solid ${colors.blackBorder}`}
									type={showPassword ? 'text' : 'password'}
									placeholder='Enter your password'
									value={loginData.password}
									onChange={e =>
										setLoginData(prev => ({
											...prev,
											password: e.target.value,
										}))
									}
									pr='60px'
									w='full'
								/>
								<Button
									position='absolute'
									right='8px'
									top='50%'
									transform='translateY(-50%)'
									onClick={() => setShowPassword(!showPassword)}
									variant='ghost'
									size='sm'
									minW='auto'
									h='auto'
									p={1}
									zIndex={2}>
									{showPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
								</Button>
							</Box>
						</Field.Root>

						<HStack
							justify='space-between'
							w='full'>
							<Checkbox.Root
								checked={loginData.keepLoggedIn}
								onCheckedChange={(checked: any) =>
									setLoginData(prev => ({ ...prev, keepLoggedIn: checked }))
								}
								colorPalette='blue'>
								<Checkbox.HiddenInput />
								<Checkbox.Control>
									<Checkbox.Indicator />
								</Checkbox.Control>
								<Checkbox.Label>Keep me logged in</Checkbox.Label>
							</Checkbox.Root>
							<Link
								color='blue.500'
								fontSize='sm'
								href='#'
								textDecoration='underline'>
								Forgot Password?
							</Link>
						</HStack>

						<Button
							type='submit'
							colorScheme='blue'
							size='lg'
							w='full'
							loading={isLoading}
							disabled={!loginData.emailOrPhone || !loginData.password}>
							Login
						</Button>

						{localError && (
							<Text
								color='red.500'
								fontSize='sm'>
								{localError}
							</Text>
						)}

						{error && (
							<Text
								fontSize='sm'
								color='red.500'>
								{(error as any)?.data?.message || 'Login failed'}
							</Text>
						)}

						{localSuccess && (
							<Text
								color='green.500'
								fontSize='sm'>
								{localSuccess}
							</Text>
						)}
					</Stack>
				</VStack>
			</form>
		</Tabs.Content>
	);
};

export default LoginTab;
