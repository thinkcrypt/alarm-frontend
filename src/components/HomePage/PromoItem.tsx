import { Box, HStack, Text, useBreakpointValue, VStack } from '@chakra-ui/react';

interface PromoItemProps {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
}

const PromoItem: React.FC<PromoItemProps> = ({ icon, title, subtitle }) => {
	return (
		<HStack
			gap={{ base: 2, md: 3 }}
			align='center'
			justify='center'
			textAlign='center'
			minW={{ base: 'auto', lg: '200px' }}>
			<Box
				color='white'
				flexShrink={0}>
				{icon}
			</Box>
			<VStack
				gap={0}
				align='start'>
				<Text
					fontSize={{ base: 'xs', md: 'sm', lg: 'md' }}
					fontWeight='bold'
					color='white'
					lineHeight='tight'
					textTransform='uppercase'>
					{title}
				</Text>
				<Text
					fontSize={{ base: 'xs', md: 'xs', lg: 'sm' }}
					color='white'
					opacity={0.9}
					lineHeight='tight'>
					{subtitle}
				</Text>
			</VStack>
		</HStack>
	);
};

export default PromoItem;
