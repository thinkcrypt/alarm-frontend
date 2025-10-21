'use client';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { Grid, Box, Text, VStack } from '@chakra-ui/react';
import PageLayout from '../Layout/PageLayout';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';

export type ProfileSection =
	| 'dashboard'
	| 'orders'
	| 'downloads'
	| 'addresses'
	| 'profile-details'
	| 'wishlist'
	| 'logout';

const UserProfilePage: React.FC = () => {
	const [activeSection, setActiveSection] = useState<ProfileSection>('dashboard');
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleSectionChange = (section: ProfileSection) => {
		if (section === 'logout') {
			dispatch(logout());
			return;
		}
		setActiveSection(section);
		setSidebarOpen(false);
	};

	useEffect(() => {
		setActiveSection('dashboard');
	}, []);

	return (
		<PageLayout>
			<VStack
				w='full'
				p={6}
				bg='gray.50'
				spaceX={6}
				spaceY={6}>
				<Text
					fontSize='3xl'
					fontWeight='bold'
					textAlign='center'>
					My Profile
				</Text>
			</VStack>

			<Box
				minH='100vh'
				px={4}
				py={6}>
				<Grid
					templateColumns={{ base: '1fr', lg: '250px 1fr' }}
					gap={6}
					alignItems='stretch'>
					<ProfileSidebar
						activeSection={activeSection}
						onSectionChange={handleSectionChange}
						sidebarOpen={sidebarOpen}
						setSidebarOpen={setSidebarOpen}
					/>

					<ProfileContent
						activeSection={activeSection}
						onSectionChange={handleSectionChange}
						setSidebarOpen={setSidebarOpen}
					/>
				</Grid>
			</Box>
		</PageLayout>
	);
};

export default UserProfilePage;
