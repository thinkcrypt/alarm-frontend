'use client';
import React, { FC, useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack, HStack, Tabs } from '@chakra-ui/react';
import PageLayout from '@/components/Layout/PageLayout';
import LoginTab from '@/components/LoginPage/LoginTab';
import RegisterTab from '@/components/LoginPage/RegisterTab';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = ({}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Form states
	const [loginData, setLoginData] = useState({
		emailOrPhone: '',
		password: '',
		keepLoggedIn: false,
	});

	const [registerData, setRegisterData] = useState({
		name: '', // Added name field that was missing
		mobile: '',
		email: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
	});

	const handleLogin = () => {};

	const handleRegister = () => {
		if (registerData.password !== registerData.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}
	};

	const { isLoggedIn, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (isLoggedIn && !isLoading) {
			router.replace('/');
		}
	}, [isLoggedIn]);

	if (isLoggedIn) return null;

	return (
		<PageLayout>
			<Flex
				justify='center'
				align='center'
				direction={'column'}
				py={12}>
				<Box
					bg='white'
					shadow='xl'
					border='1px'
					borderColor='gray.200'
					overflow='hidden'
					w='full'
					maxW='600px'>
					<Tabs.Root
						defaultValue='login'
						variant='line'>
						<Tabs.List
							w='full'
							display='flex'
							justifyContent='center'>
							<Tabs.Trigger
								value='login'
								flex={1}
								py={4}
								fontSize='md'
								textAlign='center'>
								Login
							</Tabs.Trigger>
							<Tabs.Trigger
								value='register'
								flex={1}
								py={4}
								fontSize='md'
								textAlign='center'>
								Register
							</Tabs.Trigger>
							<Tabs.Indicator />
						</Tabs.List>

						<Box
							py={8}
							px={8}>
							<LoginTab
								loginData={loginData}
								setLoginData={setLoginData}
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								handleLogin={handleLogin}
							/>

							<RegisterTab
								registerData={registerData}
								setRegisterData={setRegisterData}
								showPassword={showPassword}
								setShowPassword={setShowPassword}
								showConfirmPassword={showConfirmPassword}
								setShowConfirmPassword={setShowConfirmPassword}
								handleRegister={handleRegister}
							/>
						</Box>
					</Tabs.Root>

					{/* <VStack
						py={6}
						gap={4}>
						<HStack>
							<Text
								px='3'
								color='gray.500'
								fontSize='sm'>
								or continue with
							</Text>
						</HStack>

						<HStack gap={4}>
							<Button
								variant='outline'
								size='sm'>
								Google
							</Button>
							<Button
								variant='outline'
								size='sm'>
								Facebook
							</Button>
						</HStack>
					</VStack> */}
				</Box>
			</Flex>
		</PageLayout>
	);
};

export default LoginPage;
