'use client';
import React, { FC } from 'react';
import { Box, Heading, Text, List, Stack } from '@chakra-ui/react';
import PageLayout from '@/components/Layout/PageLayout';
import { policyData } from '@/components/data/privacyData';

type PrivacyPolicyPageProps = {};

const PrivacyPolicyPage: FC<PrivacyPolicyPageProps> = ({}) => {
	return (
		<PageLayout>
			<Box maxW='4xl' mx='auto' px={6} py={10}>
				<Heading mb={6} size='2xl' textAlign='center'>
					{policyData.title}
				</Heading>

				<Stack gap={8}>
					{policyData.sections.map((section, index) => (
						<Box key={index}>
							<Heading size='md' mb={2}>
								{section.heading}
							</Heading>
							<Text mb={3}>{section.content}</Text>
							<List.Root pl={5} gap={2}>
								{section.points.map((point, i) => (
									<List.Item key={i}>{point}</List.Item>
								))}
							</List.Root>
						</Box>
					))}
				</Stack>
			</Box>
		</PageLayout>
	);
};

export default PrivacyPolicyPage;
