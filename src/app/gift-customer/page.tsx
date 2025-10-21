'use client';
import React, { FC } from 'react';
import { Box, Heading, Text, List, Stack } from '@chakra-ui/react';
import PageLayout from '@/components/Layout/PageLayout';
import { giftCustomersData } from '@/components/data/giftCustomersData';

type pageProps = {};

const page: FC<pageProps> = ({}) => {
	return (
		<PageLayout>
			<Box maxW='4xl' mx='auto' px={6} py={10}>
				<Heading mb={6} size='2xl' textAlign='center'>
					{giftCustomersData.title}
				</Heading>

				<Stack gap={8}>
					{giftCustomersData.sections.map((section, index) => (
						<Box key={index}>
							<Heading size='md' mb={2}>
								{section.heading}
							</Heading>
							<Text mb={3}>{section.content}</Text>
							{section.points && section.points.length > 0 && (
								<List.Root pl={5} gap={2}>
									{section.points.map((point, i) => (
										<List.Item key={i}>{point}</List.Item>
									))}
								</List.Root>
							)}
						</Box>
					))}
				</Stack>
			</Box>
		</PageLayout>
	);
};

export default page;
