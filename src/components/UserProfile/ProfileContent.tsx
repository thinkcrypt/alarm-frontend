'use client';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { ProfileSection } from './UserProfilePage';
import DashboardContent from './DashboardContent';
import OrdersContent from './OrdersContent';
import WishlistContent from './WishlistContent';
import ProfileDetailsContent from './ProfileDetailsContent';

interface ContentProps {
	activeSection: ProfileSection;
	onSectionChange: (section: ProfileSection) => void;
	setSidebarOpen: (open: boolean) => void;
}

const ProfileContent: React.FC<ContentProps> = ({ activeSection, onSectionChange }) => {
	const renderContent = () => {
		switch (activeSection) {
			case 'dashboard':
				return <DashboardContent onSectionChange={onSectionChange} />;
			case 'orders':
				return <OrdersContent />;
			case 'wishlist':
				return <WishlistContent />;
			case 'profile-details':
				return <ProfileDetailsContent />;
			default:
				return <DashboardContent onSectionChange={onSectionChange} />;
		}
	};

	return (
		<Box
			bg='white'
			border='1px'
			borderColor='gray.200'
			rounded='md'
			shadow='sm'
			p={4}
			w='full'>
			{renderContent()}
		</Box>
	);
};

export default ProfileContent;
