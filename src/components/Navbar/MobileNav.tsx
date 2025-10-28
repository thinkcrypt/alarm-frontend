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
					size={{ base: 'md', md: 'lg' }}
					p={{ base: 2, md: 3 }}
					minW={{ base: '40px', md: '48px' }}
					h={{ base: '48px', md: '48px' }}
					display='inline-flex'
					alignItems='center'
					justifyContent='center'
					aria-label='Open menu'>
					<HiMenu size={40} />
				</PrimaryButton>
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content maxWidth={{ base: '280px', md: '320px' }}>
						<Drawer.Header borderBottom='1px solid' borderColor='gray.200' pb={3}>
							<Drawer.Title fontSize={{ base: 'lg', md: 'xl' }} fontWeight='bold'>
								Menu
							</Drawer.Title>
							<Drawer.CloseTrigger asChild>
								<CloseButton size={{ base: 'sm', md: 'md' }} />
							</Drawer.CloseTrigger>
						</Drawer.Header>

						<Drawer.Body pt={4}>
							<VStack gap={{ base: 3, md: 4 }} align='stretch'>
								{parentCategories?.map((item: any, index: number) => (
									<Link key={index} href={`/category/${item?.id}`}>
										<Text
											onClick={() => setOpen(false)}
											fontWeight='semibold'
											fontSize={{ base: 'md', md: 'lg' }}
											py={{ base: 2, md: 2.5 }}
											px={{ base: 2, md: 3 }}
											borderRadius='md'
											transition='all 0.2s'
											_hover={{
												color: 'blue.500',
												bg: 'gray.50'
											}}>
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