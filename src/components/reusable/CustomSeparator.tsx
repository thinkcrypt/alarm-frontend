'use client';
import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { colors } from '../data/color';

type CustomSeparatorProps = {};

const CustomSeparator: FC<CustomSeparatorProps> = ({}) => {
	return <Box w='full' borderBottom={`1px solid ${colors.blackBorder}`}></Box>;
};

export default CustomSeparator;
