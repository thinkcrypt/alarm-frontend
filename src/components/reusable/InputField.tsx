import { Field, Input, Textarea } from '@chakra-ui/react';
import { colors } from '../data/color';

interface InputFieldProps {
	label: string;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	isRequired?: boolean;
	type?: 'text' | 'textarea';
}

export const InputField = ({
	label,
	placeholder,
	value,
	onChange,
	isRequired,
	type = 'text',
}: InputFieldProps) => (
	<Field.Root required={isRequired}>
		<Field.Label fontSize='sm'>
			{label} {isRequired && <span style={{ color: 'red' }}>*</span>}
		</Field.Label>
		{type === 'textarea' ? (
			<Textarea
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				border={`1px solid ${colors.blackBorder}`}
				minH='120px'
			/>
		) : (
			<Input
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				border={`1px solid ${colors.blackBorder}`}
			/>
		)}
	</Field.Root>
);
