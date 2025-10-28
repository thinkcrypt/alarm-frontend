import { Box, Button, Container, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import { infoSections, storeLocations } from '../data/bigDealData';
import CustomContainer from '../reusable/Container';
import { colors } from '../data/color';

const BigDeals = () => (
	<CustomContainer>
		<Box
			w='100%'
			py={{ base: 0, md: 8 }}
			pb={{ base: 4, md: 8 }}>
			{/* Big Deals Banner */}
			{/* <Box
        w="100%"
        h={{ base: "120px", md: "150px" }}
        bg="linear-gradient(135deg, #D4E157 0%, #C0CA33 100%)"
        position="relative"
        overflow="hidden"
        borderRadius="md"
        mb={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      > */}
			{/* Decorative elements */}
			{/* <Box
          position="absolute"
          top="-20px"
          left="20px"
          w="80px"
          h="80px"
          border="3px solid"
          borderColor="green.600"
          borderRadius="50%"
          opacity={0.3}
        /> */}
			{/* <Box
          position="absolute"
          top="10px"
          right="20px"
          w="100px"
          h="100px"
          border="2px solid"
          borderColor="orange.400"
          borderRadius="50%"
          opacity={0.4}
        /> */}
			{/* <Box
          position="absolute"
          bottom="-30px"
          left="60px"
          w="60px"
          h="60px"
          bg="green.500"
          borderRadius="50%"
          opacity={0.2}
        /> */}
			{/* <Box
          position="absolute"
          top="20px"
          left="100px"
          w="8px"
          h="8px"
          bg="red.500"
          borderRadius="50%"
        /> */}
			{/* <Box
          position="absolute"
          top="40px"
          right="150px"
          w="12px"
          h="12px"
          bg="orange.500"
          borderRadius="50%"
        /> */}

			{/* Main content */}
			{/* <Flex direction="column" align="center" textAlign="center" zIndex={2}>
          <Text
            fontSize={{ base: "28px", md: "42px" }}
            fontWeight="bold"
            color="black"
            lineHeight="1"
            mb={2}
          >
            <Text as="span" color="black">BIG</Text>
            <Text as="span" color="red.500">DEALS</Text>
            <Text as="span" color="black" ml={2}>মার্চ</Text>
          </Text>
          <Flex align="center" gap={2}>
            <Text fontSize={{ base: "14px", md: "16px" }} color="black" fontWeight="medium">
              Prices Low, Josh High
            </Text>
            <Box
              w="24px"
              h="24px"
              bg="black"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontSize="12px" fontWeight="bold">
                ➤
              </Text>
            </Box>
          </Flex>
        </Flex> */}
			{/* </Box> */}

			{/* Store Information Section */}
			<Box
				mb={8}
				bgColor={colors.cardBg}
				p={4}>
				{infoSections.map((section, index) => (
					<Box
						key={index}
						mb={index === infoSections.length - 1 ? 8 : 6}>
						<Text
							fontSize={{ base: '16px', md: '18px' }}
							fontWeight='bold'
							color='gray.800'
							mb={4}
							textTransform='uppercase'
							letterSpacing='wide'>
							{section.title}
						</Text>
						<Text
							fontSize={{ base: '13px', md: '14px' }}
							color='gray.600'
							lineHeight='1.6'>
							{section.description}
						</Text>
					</Box>
				))}
			</Box>

			{/* Find Us Section */}
			<Box>
				<Flex
					justify='space-between'
					align='center'
					mb={6}>
					<Text
						fontSize={{ base: '24px', md: '28px' }}
						fontWeight='bold'
						color='black'>
						Find Us
					</Text>
					<Button
						variant='ghost'
						color='black'
						fontSize={{ base: '14px', md: '16px' }}
						fontWeight='medium'
						textDecoration='underline'
						p={0}
						h='auto'>
						View All
					</Button>
				</Flex>

				{/* Store Locations Grid */}
				<Grid
					templateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(4, 1fr)',
					}}
					gap={{ base: 2, md: 6 }}
					w='100%'>
					{storeLocations.map(store => (
						<GridItem key={store.id}>
							<Box
								p={5}
								bgColor="#F5F8F8"
								h='100%'>
								<Text
									fontSize='16px'
									fontWeight='bold'
									color='black'
									mb={3}
									lineHeight='1.2'>
									{store.area} , {store.city}
								</Text>
								<Text
									fontSize='13px'
									color='gray.700'
									lineHeight='1.4'
									mb={3}>
									{store.address}
								</Text>
								<Text
									fontSize='13px'
									color='gray.700'
									mb={2}
									fontWeight='medium'>
									{store.phone}
								</Text>
								<Text
									fontSize='13px'
									color='gray.700'
									fontWeight='medium'>
									{store.hours}
								</Text>
							</Box>
						</GridItem>
					))}
				</Grid>
			</Box>
		</Box>
	</CustomContainer>
);

export default BigDeals;
