import { Flex, VStack } from '@chakra-ui/react'
import { Steps } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../data/color';

// Steps data
export const steps = [
  {
    title: "Cart",
    description: "Shopping Cart",
  },
  {
    title: "Checkout", 
    description: "Checkout",
  },
  {
    title: "Order Complete",
    description: "Order Complete",
  },
];

const CheckoutSteps = ({ currentStep = 0 }) => {
  return (
		<VStack gap={4} py={5} width='100%'>
			<Steps.Root
				step={currentStep}
				count={steps.length}
				orientation='horizontal'
				size='lg'
				colorPalette='green'
			>
				<Steps.List>
					{steps.map((step, index) => (
						<Steps.Item key={index} index={index}>
							<Flex direction='column' align='center'>
								<Steps.Indicator borderColor={colors.blackBorder} />
								<Steps.Title>{step?.title}</Steps.Title>
							</Flex>
							<Steps.Separator
								mb={6}
								display={{ base: 'none', md: 'block' }}
								backgroundColor={colors.blackBorder}
							/>
						</Steps.Item>
					))}
				</Steps.List>
			</Steps.Root>
		</VStack>
	);
}

export default CheckoutSteps