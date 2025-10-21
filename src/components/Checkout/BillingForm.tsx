import { Box, Grid, Text } from '@chakra-ui/react';
import { InputField } from '../reusable/InputField';
import { colors } from '../data/color';
import DeliveryArea from './DeliveryArea';

interface BillingFormProps {
	formData: {
		name: string;
		email: string;
		phone: string;
		address: string;
		note: string;
		shipping?: number;
		//
	};
	onChange: (field: string, value: string) => void;
}

const BillingForm: React.FC<BillingFormProps> = ({ formData, onChange }) => {
	return (
		<Box
			border={`.5px solid ${colors.blackBorder}`}
			backgroundColor={colors.whiteBg}
			rounded='md'
			p={6}
			height='100%'
			display='flex'
			flexDirection='column'>
			<Text
				fontSize='xl'
				fontWeight='bold'
				mb={6}>
				Billing And Shipping
			</Text>

			<Grid
				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
				gap={4}
				mb={4}>
				<InputField
					isRequired
					label='Full Name'
					placeholder='Full Name'
					value={formData.name}
					onChange={e => onChange('name', e.target.value)}
				/>
				<InputField
					isRequired
					label='Phone Number'
					placeholder='Phone Number'
					value={formData.phone}
					onChange={e => onChange('phone', e.target.value)}
				/>
			</Grid>
			<Grid
				templateColumns={{ base: '1fr', md: '1fr' }}
				gap={4}
				mb={4}>
				<InputField
					// isRequired
					label='Email Address'
					placeholder='E-mail Address'
					value={formData.email}
					onChange={e => onChange('email', e.target.value)}
				/>
			</Grid>
			<Grid
				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
				gap={4}
				mb={4}>
				<InputField
					isRequired
					label='Full Address'
					placeholder='Address Details'
					type='textarea'
					value={formData.address}
					onChange={e => onChange('address', e.target.value)}
				/>
				<InputField
					label='Order Note'
					placeholder='Any special instructions?'
					type='textarea'
					value={formData.note}
					onChange={e => onChange('note', e.target.value)}
				/>
			</Grid>
			<DeliveryArea
				value={formData.shipping}
				setValue={(val: any) => {
					onChange('shipping', val);
				}}
			/>
		</Box>
	);
};

export default BillingForm;
