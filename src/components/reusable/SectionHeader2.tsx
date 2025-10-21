import { Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../data/color';
import Link from 'next/link';

interface SectionHeader2Props {
	title: string;
	bgColor?: string;
	py?: number | string;
	mb?: number | string;
	fontSize?: string | number;
	href?: string;
}

const SectionHeader2: React.FC<SectionHeader2Props> = ({
	title,
	py = 3,
	mb = 8,
	fontSize = '2xl',
	href,
}) => {
	return (
		<Link href={href || '#'}>
			<Text
				cursor='pointer'
				fontSize={fontSize}
				fontWeight='bold'
				w='full'
				bgColor={colors.sectionHeaderBg}
				py={py}
				textAlign='center'
				mb={{ base: 4, md: mb }}>
				{title}
			</Text>
		</Link>
	);
};

export default SectionHeader2;
