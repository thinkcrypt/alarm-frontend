'use client';
import PageLayout from '@/components/Layout/PageLayout';
import React, { FC } from 'react';
import { Box, Heading, Text, List } from '@chakra-ui/react';
import { returnsData } from '@/components/data/returnsData';

type PageProps = {};

const Page: FC<PageProps> = () => {
	return (
		<PageLayout>
			<Box maxW='4xl' mx='auto' py={10} px={4}>
				{/* Title */}
				<Heading mb={6} size='2xl' textAlign='center'>
					{returnsData.title}
				</Heading>

				{/* Exchange Policy */}
				<Box mb={10}>
					<Heading size='md' mb={3}>
						Exchange Policy
					</Heading>
					<Text mb={4}>{returnsData.exchangePolicy.introduction}</Text>

					{/* Guidelines List */}
					<List.Root pl={5} gap={2}>
						{returnsData.exchangePolicy.guidelines.map((item, index) => (
							<List.Item key={index}>{item}</List.Item>
						))}
					</List.Root>

					<Heading size='sm' mt={6} mb={2}>
						Exchange/Refund will not be applicable in the following cases:
					</Heading>
					<List.Root pl={5} gap={2}>
						{returnsData.exchangePolicy.notApplicable.map((item, index) => (
							<List.Item key={index}>{item}</List.Item>
						))}
					</List.Root>
				</Box>

				{/* <Divider my={10} /> */}

				{/* Refund Terms */}
				<Box>
					<Heading size='md' mb={3}>
						Refund Terms & Conditions
					</Heading>

					<List.Root pl={5} gap={2} mb={4}>
						{returnsData.refundTermsAndConditions.applicableCases.map(
							(item, index) => (
								<List.Item key={index}>{item}</List.Item>
							)
						)}
					</List.Root>

					<Text mb={3}>
						<Text as='span' fontWeight='bold'>
							Refund Method:
						</Text>{' '}
						{returnsData.refundTermsAndConditions.refundMethod}
					</Text>

					<Text>
						<Text as='span' fontWeight='bold'>
							Customer Responsibility:
						</Text>{' '}
						{returnsData.refundTermsAndConditions.customerResponsibility}
					</Text>
				</Box>
			</Box>
		</PageLayout>
	);
};

export default Page;
