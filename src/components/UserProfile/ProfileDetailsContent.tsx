'use client';
import React, { useEffect, useState } from 'react';
import { VStack, HStack, Text, Button, Input, Box, Flex } from '@chakra-ui/react';
import { Edit3, Save, X } from 'lucide-react';
import { useGetSelfQuery, useUpdateSelfMutation } from '@/store/services/authApi';
import DisplayField from './DisplayField';

const ProfileDetailsContent: React.FC = () => {
	const { data } = useGetSelfQuery({});
	const [updateSelf, { isLoading: isUpdating, error: updateError }] = useUpdateSelfMutation();

	const [formData, setFormData] = useState({
		_id: '',
		name: '',
		email: '',
		phone: '',
		address: '',
	});
	const [editData, setEditData] = useState(formData);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (data) {
			setFormData({
				_id: data?._id || '',
				name: data?.name || '',
				email: data?.email || '',
				phone: data?.phone || '',
				address: data?.address || '',
			});
		}
	}, [data]);

	const handleEdit = () => {
		setIsEditing(true);
		setEditData(formData);
	};

	const handleSave = async () => {
		try {
			// ✅ Only send name to backend
			await updateSelf({
				name: editData.name,
			}).unwrap();
			setFormData(prev => ({ ...prev, name: editData.name }));
			setIsEditing(false);
		} catch (error) {
			console.error('Failed to update profile:', error);
		}
	};

	const handleCancel = () => {
		setEditData(formData);
		setIsEditing(false);
	};

	const handleChange = (field: string, value: string) => {
		setEditData(prev => ({ ...prev, [field]: value }));
	};

	return (
		<Box>
			<HStack
				justify='space-between'
				mb={6}>
				<VStack
					align='start'
					spaceX={1}
					spaceY={1}>
					<Text
						fontSize='xl'
						fontWeight='bold'>
						Profile Details
					</Text>
					<Text color='gray.500'>Manage your personal information</Text>
				</VStack>
				{!isEditing && (
					<Button
						onClick={handleEdit}
						colorScheme='gray'
						px={4}
						py={2}>
						<Edit3
							size={16}
							style={{ marginRight: 4 }}
						/>
						Edit
					</Button>
				)}
			</HStack>

			{/* Error Box */}
			{updateError && (
				<Box
					p={4}
					mb={4}
					border='1px'
					borderColor='red.300'
					bg='red.100'
					color='red.700'
					borderRadius='md'>
					Failed to update profile. Please try again.
				</Box>
			)}

			<VStack
				align='stretch'
				gap={4}>
				{/* Name */}
				<Box>
					<Text
						fontWeight='semibold'
						mb={1}>
						Full Name
					</Text>
					{isEditing ? (
						<Input
							value={editData.name}
							onChange={e => handleChange('name', e.target.value)}
						/>
					) : (
						<DisplayField value={formData.name} />
					)}
				</Box>

				{/* Email */}
				<Box>
					<Text
						fontWeight='semibold'
						mb={1}>
						Email
					</Text>
					<DisplayField value={formData.email} />
				</Box>

				{/* Phone */}
				<Box>
					<Text
						fontWeight='semibold'
						mb={1}>
						Phone
					</Text>
					<DisplayField value={formData.phone} />
				</Box>

				{/* Address */}

				<Box>
					<Text
						fontWeight='semibold'
						mb={1}>
						Address
					</Text>
					<DisplayField
						value={formData?.address}
						multiline
					/>
				</Box>
			</VStack>

			{isEditing && (
				<Flex
					mt={4}
					gap={2}>
					<Button
						onClick={handleSave}
						colorScheme='blue'
						loading={isUpdating} // ✅ fixed Chakra prop
					>
						<Save size={16} />
						Save
					</Button>
					<Button
						onClick={handleCancel}
						variant='outline'>
						<X size={16} />
						Cancel
					</Button>
				</Flex>
			)}
		</Box>
	);
};

export default ProfileDetailsContent;
