'use client';
import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Menu, X } from 'lucide-react';
import { ProfileSection } from './UserProfilePage';

interface SidebarProps {
	activeSection: ProfileSection;
	onSectionChange: (section: ProfileSection) => void;
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
}

const ProfileSidebar: React.FC<SidebarProps> = ({
	activeSection,
	onSectionChange,
	sidebarOpen,
	setSidebarOpen,
}) => {
	const menuItems = [
		{ id: 'dashboard' as ProfileSection, label: 'Dashboard' },
		{ id: 'orders' as ProfileSection, label: 'Orders' },
		// { id: 'downloads' as ProfileSection, label: 'Downloads' },
		// { id: 'addresses' as ProfileSection, label: 'Addresses' },
		{ id: 'profile-details' as ProfileSection, label: 'Profile Details' },
		{ id: 'wishlist' as ProfileSection, label: 'Wishlist' },
		{ id: 'logout' as ProfileSection, label: 'Logout' },
	];

	return (
		<>
			{/* Mobile toggle button */}
			<Box display={{ base: 'block', lg: 'none' }} mb={2}>
				<Button
					onClick={() => setSidebarOpen(true)}
					variant='outline'
					width='100%'
					justifyContent='flex-start'
				>
					<Menu size={18} style={{ marginRight: 8 }} />
					My Profile
				</Button>
			</Box>

			{/* Mobile sidebar overlay */}
			{sidebarOpen && (
				<Box
					position='fixed'
					top={0}
					left={0}
					width='250px'
					height='100vh'
					bg='white'
					borderRight='1px solid'
					borderColor='gray.200'
					zIndex={1000}
					p={4}
				>
					<Box display='flex' justifyContent='space-between' mb={4}>
						<Text fontWeight='bold'>My Profile</Text>
						<Button size='sm' onClick={() => setSidebarOpen(false)}>
							<X size={16} />
						</Button>
					</Box>

					{menuItems.map(item => (
						<Button
							key={item.id}
							onClick={() => {
								onSectionChange(item.id);
								setSidebarOpen(false);
							}}
							variant={activeSection === item.id ? 'solid' : 'ghost'}
							width='100%'
							justifyContent='flex-start'
							mb={2}
						>
							{item.label}
						</Button>
					))}
				</Box>
			)}

			{/* Desktop sidebar */}
			<Box
				display={{ base: 'none', lg: 'block' }}
				border='1px'
				borderColor='gray.200'
				borderRadius='md'
				bg='white'
				p={4}
				height='fit-content'
			>
				<Text fontWeight='semibold' mb={4}>
					My Profile
				</Text>
				<Box>
					{menuItems.map(item => (
						<Button
							key={item.id}
							onClick={() => onSectionChange(item.id)}
							variant={activeSection === item.id ? 'solid' : 'ghost'}
							width='100%'
							justifyContent='flex-start'
							mb={2}
						>
							{item.label}
						</Button>
					))}
				</Box>
			</Box>
		</>
	);
};

export default ProfileSidebar;
