'use client';
import {
	Box,
	Button,
	Checkbox,
	Field,
	Input,
	Link,
	Stack,
	Tabs,
	Text,
	VStack,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { colors } from '../data/color';
import { useRegisterMutation } from '@/store/services/authApi';
import { useAppDispatch } from '@/hooks';
import { login } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

type RegisterTabProps = {
	showPassword: boolean;
	setShowPassword: (val: boolean) => void;
	showConfirmPassword: boolean;
	setShowConfirmPassword: (val: boolean) => void;
	registerData: {
		name: string;
		mobile: string;
		email: string;
		password: string;
		confirmPassword: string;
		agreeToTerms: boolean;
	};
	setRegisterData: React.Dispatch<
		React.SetStateAction<{
			name: string;
			mobile: string;
			email: string;
			password: string;
			confirmPassword: string;
			agreeToTerms: boolean;
		}>
	>;
	handleRegister: () => void;
};

const RegisterTab: FC<RegisterTabProps> = ({
	showPassword,
	setShowPassword,
	showConfirmPassword,
	setShowConfirmPassword,
	registerData,
	setRegisterData,
}) => {
	const [localError, setLocalError] = useState('');
	const [localSuccess, setLocalSuccess] = useState('');

	const router = useRouter();
	const dispatch = useAppDispatch();

	const [register, { isLoading, error, isSuccess, data }] = useRegisterMutation();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');
		setLocalSuccess('');

		if (registerData.password !== registerData.confirmPassword) {
			setLocalError('Passwords do not match!');
			return;
		}

		register({
			name: registerData.name,
			email: registerData.email,
			password: registerData.password,
			confirm: registerData.confirmPassword,
			phone: registerData.mobile,
		});
	};

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(login(data));
		}
	}, [isSuccess, data, dispatch, router]);

	return (
		<Tabs.Content value='register'>
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
						Create Account
					</Text>

					<Stack
						gap={4}
						w='full'>
						<Field.Root required>
							<Field.Label>
								Name <Field.RequiredIndicator />
							</Field.Label>
							<Input
								border={`1px solid ${colors.blackBorder}`}
								type='text'
								placeholder='Enter your Name'
								value={registerData.name}
								onChange={e => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
							/>
						</Field.Root>

						<Field.Root required>
							<Field.Label>
								Email Address <Field.RequiredIndicator />
							</Field.Label>
							<Input
								border={`1px solid ${colors.blackBorder}`}
								type='email'
								placeholder='Enter your email address'
								value={registerData.email}
								onChange={e => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
							/>
							<Field.HelperText>{"We'll never share your email."}</Field.HelperText>
						</Field.Root>

						<Field.Root required>
							<Field.Label>
								Mobile Number <Field.RequiredIndicator />
							</Field.Label>
							<Input
								border={`1px solid ${colors.blackBorder}`}
								type='tel'
								placeholder='Enter your mobile number'
								value={registerData.mobile}
								onChange={e => setRegisterData(prev => ({ ...prev, mobile: e.target.value }))}
							/>
							<Field.HelperText>
								{"We'll send a verification code to this number."}
							</Field.HelperText>
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
									placeholder='Create a password'
									value={registerData.password}
									onChange={e =>
										setRegisterData(prev => ({
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
							<Field.HelperText>Password must be at least 8 characters long.</Field.HelperText>
						</Field.Root>

						<Field.Root
							required
							w='full'>
							<Field.Label>
								Confirm Password <Field.RequiredIndicator />
							</Field.Label>
							<Box
								position='relative'
								w='full'>
								<Input
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder='Confirm your password'
									value={registerData.confirmPassword}
									onChange={e =>
										setRegisterData(prev => ({
											...prev,
											confirmPassword: e.target.value,
										}))
									}
									pr='60px'
									w='full'
									borderColor={
										registerData.confirmPassword &&
										registerData.password !== registerData.confirmPassword
											? 'red.300'
											: colors.blackBorder
									}
								/>
								<Button
									position='absolute'
									right='8px'
									top='50%'
									transform='translateY(-50%)'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									variant='ghost'
									size='sm'
									minW='auto'
									h='auto'
									p={1}
									zIndex={2}>
									{showConfirmPassword ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
								</Button>
							</Box>
							{registerData.confirmPassword &&
								registerData.password !== registerData.confirmPassword && (
									<Field.ErrorText>Passwords do not match</Field.ErrorText>
								)}
						</Field.Root>

						<Box>
							<Checkbox.Root
								checked={registerData.agreeToTerms}
								onCheckedChange={(checked: any) =>
									setRegisterData(prev => ({ ...prev, agreeToTerms: checked }))
								}
								colorPalette='blue'
								alignItems='flex-start'>
								<Checkbox.HiddenInput />
								<Checkbox.Control>
									<Checkbox.Indicator />
								</Checkbox.Control>
								<Checkbox.Label>
									<Text
										fontSize='sm'
										lineHeight='1.4'>
										I agree to the{' '}
										<Link
											color='blue.500'
											textDecoration='underline'
											href='#'>
											Terms of Service
										</Link>{' '}
										and{' '}
										<Link
											color='blue.500'
											textDecoration='underline'
											href='#'>
											Privacy Policy
										</Link>
									</Text>
								</Checkbox.Label>
							</Checkbox.Root>
						</Box>

						<Button
							type='submit'
							colorScheme='blue'
							size='lg'
							w='full'
							loading={isLoading}
							disabled={
								!registerData.name ||
								!registerData.mobile ||
								!registerData.email ||
								!registerData.password ||
								!registerData.confirmPassword ||
								registerData.password !== registerData.confirmPassword ||
								!registerData.agreeToTerms
							}>
							Create Account
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
								color='red.500'
								fontSize='sm'>
								{(error as any)?.data?.message || 'Registration failed'}
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

export default RegisterTab;
