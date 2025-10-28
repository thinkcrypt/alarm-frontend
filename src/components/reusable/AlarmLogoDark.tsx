import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const AlarmLogoDark: React.FC = () => {
    return (
        <Flex p={4} backgroundColor="white" align='center' gap={0} h='40px'>
            {/* "ala" text */}
            <Text
                fontSize='32px'
                fontWeight='bold'
                color='black'
                lineHeight='1'
                letterSpacing='-0.5px'
            >
                ala
            </Text>

            {/* Clock icon */}
            <Box
                position='relative'
                mx={0.5}
                display='inline-flex'
                alignItems='center'
            >
                <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    style={{ display: 'block' }}
                >
                    <circle
                        cx='14'
                        cy='14'
                        r='12'
                        stroke='#FF4444'
                        strokeWidth='2.5'
                    />
                    <circle
                        cx='14'
                        cy='14'
                        r='2'
                        fill='#FF4444'
                    />
                    <line
                        x1='14'
                        y1='14'
                        x2='14'
                        y2='7'
                        stroke='#FF4444'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                    />
                    <line
                        x1='14'
                        y1='14'
                        x2='19'
                        y2='14'
                        stroke='#FF4444'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                    />
                </svg>
            </Box>

            {/* "rm" text */}
            <Text
                fontSize='32px'
                fontWeight='bold'
                color='black'
                lineHeight='1'
                letterSpacing='-0.5px'
            >
                rm
            </Text>
        </Flex>
    );
};

export default AlarmLogoDark;