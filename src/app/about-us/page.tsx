'use client';
import React, { FC } from 'react';
import { Box, Heading, Text, List, ListItem, Stack } from '@chakra-ui/react';
import PageLayout from '@/components/Layout/PageLayout';
import { aboutData } from '@/components/data/aboutData';

type AboutUsPageProps = {};

const AboutUsPage: FC<AboutUsPageProps> = ({}) => {
	return (
		<PageLayout>
			<Box maxW='4xl' mx='auto' px={6} py={10}>
				<Heading mb={6} size='2xl' textAlign='center'>
					{aboutData.title}
				</Heading>

				<Stack gap={8}>
					{aboutData.sections.map((section, index) => (
						<Box key={index}>
							<Heading size='md' mb={2}>
								{section.heading}
							</Heading>
							<Text mb={3}>{section.content}</Text>
							{section.points && section.points.length > 0 && (
								<List.Root pl={5} gap={2}>
									{section.points.map((point, i) => (
										<ListItem key={i}>{point}</ListItem>
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

export default AboutUsPage;
