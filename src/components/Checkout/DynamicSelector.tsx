'use client';
import { Box, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Option {
	id: string;
	label: string;
}

interface SelectorProps {
	title: string;
	options: Option[];
	defaultValue?: string;
	onChange?: (value: string) => void;
}

export default function DynamicSelector({ title, options, defaultValue, onChange }: SelectorProps) {
	const [selected, setSelected] = useState(defaultValue || options[0]?.id);

	// Use onValueChange instead of onChange, and handle the details object
	const handleValueChange = (details: { value: string | null }) => {
		if (details.value === null) return;

		setSelected(details.value);
		onChange?.(details.value);
	};

	return (
		<Box py={3}>
			<Text
				mb={3}
				fontWeight='medium'>
				{title}
			</Text>
			<RadioGroup.Root
				value={selected}
				onValueChange={handleValueChange}>
				<Stack
					direction='row'
					gap={6}
					mt={2}>
					{options.map(option => (
						<RadioGroup.Item
							key={option.id}
							value={option.id}>
							<RadioGroup.ItemHiddenInput />
							<RadioGroup.ItemControl>
								<RadioGroup.ItemIndicator />
							</RadioGroup.ItemControl>
							<RadioGroup.ItemText ml={2}>{option.label}</RadioGroup.ItemText>
						</RadioGroup.Item>
					))}
				</Stack>
			</RadioGroup.Root>
		</Box>
	);
}
