// Add this validation function
const validateBangladeshiPhone = (phone: string): boolean => {
	// Remove all spaces, dashes, and other non-digit characters except +
	const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

	// Bangladeshi phone number patterns:
	// +8801XXXXXXXXX (international format)
	// 8801XXXXXXXXX (country code without +)
	// 01XXXXXXXXX (local format)
	const bangladeshiPhoneRegex = /^(?:\+8801|8801|01)[1-9]\d{8}$/;

	return bangladeshiPhoneRegex.test(cleanPhone);
};

export default validateBangladeshiPhone;
