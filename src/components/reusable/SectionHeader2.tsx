import { Text, Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../data/color';
import Link from 'next/link';

interface SectionHeader2Props {
	title: string;
	bgColor?: string;
	py?: number | string;
	mb?: number | string | Record<string, number | string>;
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
			<Flex
				align="center"
				justify="center"
				gap={4}
				mb={{ base: 4, md: mb }}

				w="100%"
				cursor='pointer'
				backgroundColor="#F5F8F8"
			>
				<Box
					flex={1}
					h="2px"
					bg="gray.300"
					maxW={{ base: '80px', md: '150px', lg: '250px', xl: '500px' }}
				/>
				<Text
					fontSize={fontSize}
					fontWeight={500}
					color="black"
					textTransform="uppercase"
					textAlign="center"
					whiteSpace="nowrap"
					py={py}
					px={{ base: 2, md: 8, lg: 12 }}
				>
					{title}
				</Text>
				<Box
					flex={1}
					h="2px"
					bg="gray.300"
					maxW={{ base: '80px', md: '150px', lg: '250px', xl: '500px' }}
				/>
			</Flex>
		</Link>
	);
};

export default SectionHeader2;