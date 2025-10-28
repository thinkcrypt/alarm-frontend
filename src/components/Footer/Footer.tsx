import React from 'react';
import {
	Box,
	Grid,
	Text,
	VStack,
	HStack,
	Link as CLink,
	Flex,
	Image,
	Icon,
} from '@chakra-ui/react';
import { footerLinksData, paymentMethods } from '../data/footerData';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import CustomContainer from '../reusable/Container';
import Link from 'next/link';
import AlarmLogoDark from '../reusable/AlarmLogoDark';

export interface SocialLink {
	icon: React.ElementType;
	href?: string;
}

export const socialLinks: SocialLink[] = [
	{ icon: Facebook, href: 'https://www.facebook.com/ddongbd' },
	// { icon: Twitter, href: 'https://twitter.com' },
	{ icon: Instagram, href: 'https://www.instagram.com/ddongbd' },
	// { icon: Linkedin, href: 'https://linkedin.com' },
	// { icon: Youtube, href: 'https://youtube.com' },
];

const Footer: React.FC = () => {
	return (
		<Box
			bg='black'
			py={10}
			color='white'
			w='100%'>
			<CustomContainer pt={0}>
				{/* Top Section with Logo + Newsletter */}
				<Flex
					direction={{ base: 'column', md: 'row' }}
					justify='space-between'
					align={{ base: 'flex-start', md: 'center' }}
					gap={4}>
					{/* Logo */}
					<Link href='/'>
						<AlarmLogoDark />
					</Link>

					{/* Newsletter Signup */}
					{/* <VStack align={{base: "flex-start", md: "flex-end"}} gap={2}>
            <Text fontSize="14px" color="gray.300">
              Subscribe to our Newsletter
            </Text>
            <HStack gap={0}>
              <Input
                placeholder="Enter your email address"
                bg="transparent"
                border="1px solid"
                borderColor="gray.600"
                borderRadius="0"
                color="white"
                fontSize="14px"
                w={{base: "235px", md: "300px"}}
                h="40px"
                _placeholder={{ color: "gray.400" }}
                _focus={{ borderColor: "white", boxShadow: "none" }}
              />
              <Button
                bg="white"
                color="black"
                borderRadius="0"
                h="40px"
                px={4}
                fontSize="14px"
                fontWeight="bold"
                _hover={{ bg: "gray.200" }}
              >
                SUBSCRIBE
              </Button>
            </HStack>
          </VStack> */}
				</Flex>

				{/* Footer Links */}
				<Grid
					py={8}
					templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
					gap={8}>
					{/* Hardcoded first section: About DDong + social icons */}
					<VStack
						align='flex-start'
						gap={3}>
						<Text
							fontSize='14px'
							fontWeight='bold'
							color='white'
							textTransform='uppercase'>
							About DDong
						</Text>
						<Text
							fontSize='12px'
							color='gray.400'
							lineHeight='1.4'>
							Although today online brands have started to release our smartphone Hit. Management
							Hit Trial Copenhagen.
						</Text>
						<Text
							fontSize='12px'
							color='gray.400'
							lineHeight='1.4'
							cursor='pointer'>
							Contact Us
						</Text>

						{/* Social Icons */}
						<HStack
							gap={2}
							mt={2}>
							{socialLinks?.map((social, index) => (
								<CLink
									href={social.href}
									target='_blank'
									rel='noopener noreferrer'
									key={index}
									w='32px'
									h='32px'
									bg='gray.800'
									borderRadius='4px'
									display='flex'
									alignItems='center'
									justifyContent='center'
									cursor='pointer'
									_hover={{ bg: 'gray.600' }}>
									<Icon
										as={social.icon}
										color='white'
									/>
								</CLink>
							))}
						</HStack>
					</VStack>

					{/* Render the remaining footer link sections */}
					{footerLinksData?.slice(1)?.map((section, index) => (
						<VStack
							key={index}
							align='flex-start'
							gap={3}>
							<Text
								fontSize='14px'
								fontWeight='bold'
								color='white'
								textTransform='uppercase'>
								{section.title}
							</Text>
							{section?.links?.map((link, i) => (
								<Link
									href={link?.route}
									key={i}>
									<Text
										fontSize='12px'
										color='gray.400'
										_hover={{ color: 'white', textDecoration: 'none' }}
										cursor='pointer'
										lineHeight='1.4'>
										{link?.name}
									</Text>
								</Link>
							))}
						</VStack>
					))}
				</Grid>

				{/* Payment Methods and Copyright */}
				<Box
					borderTop='1px solid'
					borderColor='gray.700'
					py={6}
					pb={2}>
					<VStack
						gap={4}
						align='flex-start'>
						<HStack
							gap={4}
							align='center'>
							<Text
								fontSize='12px'
								color='gray.400'>
								© 2025. DDONG BD | All rights reserved.
							</Text>
						</HStack>

						{/* Payment Methods */}
						{/* <HStack
							gap={1}
							wrap='wrap'
							justify='flex-start'>
							{paymentMethods?.map((method, index) => (
								<Box
									key={index}
									w='32px'
									h='20px'
									bg='white'
									borderRadius='2px'
									display='flex'
									alignItems='center'
									justifyContent='center'
									fontSize='8px'
									fontWeight='bold'
									color='black'
									cursor='pointer'
									_hover={{ transform: 'scale(1.05)' }}
									transition='transform 0.2s'>
									{method.slice(0, 4).toUpperCase()}
								</Box>
							))}
						</HStack> */}
					</VStack>
				</Box>
			</CustomContainer>
		</Box>
	);
};

export default Footer;
