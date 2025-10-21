import { Text } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
	<Link href={href || '#'}>
		<Text
			fontSize='sm'
			fontWeight='medium'
			_hover={{ color: 'blue.500' }}
			cursor='pointer'>
			{children}
		</Text>
	</Link>
);

export default NavLink;
