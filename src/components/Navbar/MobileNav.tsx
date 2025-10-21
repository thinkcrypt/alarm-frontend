'use client';
import React, { useState } from 'react';
import { Drawer, Portal, CloseButton, VStack, Text } from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';
import Link from 'next/link';
import PrimaryButton from '../reusable/PrimaryButton';

type MobileNavProps = {
	parentCategories: any;
};

const MobileNav: React.FC<MobileNavProps> = ({ parentCategories }) => {
	const [open, setOpen] = useState(false);

	return (
		<Drawer.Root open={open} onOpenChange={e => setOpen(e.open)} placement='start'>
			<Drawer.Trigger asChild>
				<PrimaryButton
					variant='outline'
					border='none'
					size='md'
					display={{ base: 'inline-flex', md: 'none' }}
					aria-label='Open menu'>
					<HiMenu size={32} />
				</PrimaryButton>
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content maxWidth='300px'>
						<Drawer.Header>
							<Drawer.Title>Menu</Drawer.Title>
							<Drawer.CloseTrigger asChild>
								<CloseButton size='sm' />
							</Drawer.CloseTrigger>
						</Drawer.Header>

						<Drawer.Body>
							<VStack gap={4} align='stretch'>
								{parentCategories?.map((item: any, index: number) => (
									<Link key={index} href={`/category/${item?.id}`}>
										<Text
											onClick={() => setOpen(false)}
											fontWeight='semibold'
											fontSize='lg'
											_hover={{ color: 'blue.500' }}>
											{item.name}
										</Text>
									</Link>
								))}
							</VStack>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Portal>
		</Drawer.Root>
	);
};

export default MobileNav;