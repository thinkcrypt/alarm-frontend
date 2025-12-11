export const tabSectionStyles = {
	container: {
		py: 8,
		pb: 16,
		bg: 'white',
	},

	tab: {
		fontSize: '16px',
		fontWeight: '500',
		textTransform: 'uppercase' as const,
		letterSpacing: '1px',
		color: 'gray.600',
		_selected: {
			color: 'black',
			borderColor: 'black',
		},
	},

	sectionTitle: {
		fontSize: '18px',
		fontWeight: '500',
	},

	description: {
		whiteSpace: 'pre-line' as const,
		fontSize: '14px',
		lineHeight: '1.8',
		color: 'gray.700',
		textAlign: 'left' as const,
	},

	reviewCard: {
		p: 4,
		borderRadius:'md',
		border: '1px solid #ebebeb',
	},

	formContainer: {
		p: 6,
		border: '1px solid #ebebeb',
		w: { base: '100%', lg: '400px' },
	},

	button: {
		colorScheme: 'black',
		bg: 'black',
		color: 'white',
		size: 'sm',
		_hover: { bg: 'gray.800' },
	},

	input: {
		size: 'sm',
	},

	label: {
		fontSize: 'sm',
	},

	emptyState: {
		color: 'gray.500',
		textAlign: 'center' as const,
		py: 8,
	},
};
