'use client';
import React from 'react';
import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { FileText, User, Heart, LogOut } from 'lucide-react';
import { ProfileSection } from './UserProfilePage';

import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
// import { useRouter } from 'next/navigation';
import { useGetSelfQuery } from '@/store/services/authApi';

interface Props {
	onSectionChange: (section: ProfileSection) => void;
}

const DashboardContent: React.FC<Props> = ({ onSectionChange }) => {
	const dispatch = useDispatch();
	// const router = useRouter();
	const { data: selfData } = useGetSelfQuery({});

	const handleLogout = () => {
		dispatch(logout());
	};

	const items = [
		{ id: 'orders', label: 'Orders', icon: FileText },
		{ id: 'profile-details', label: 'Profile Details', icon: User },
		{ id: 'wishlist', label: 'Wishlist', icon: Heart },
		{ id: 'logout', label: 'Logout', icon: LogOut },
	];

	return (
		<Box>
			<Text mb={6}>
				Hello <b>{selfData?.name || selfData?.email || 'User'}</b>
			</Text>

			<SimpleGrid columns={{ base: 1, sm: 2 }} gap={4}>
				{items.map(item => (
					<Button
						key={item.id}
						onClick={
							item.id === 'logout'
								? handleLogout
								: () => onSectionChange(item.id as ProfileSection)
						}
						variant='outline'
						height='100px'
						display='flex'
						flexDirection='column'
						alignItems='center'
						justifyContent='center'
					>
						<item.icon size={24} />
						<Text mt={2}>{item.label}</Text>
					</Button>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default DashboardContent;