import React from 'react'
import {
    Input as ChakraInput,
    InputGroup,
    InputLeftAddon,
    InputProps,
    Text,
    Box,
} from '@chakra-ui/react'
import theme from '../theme'

type Props = InputProps & {
    label?: string
    addon?: string
}

/*

    Used to collect user text input

    Can be connected to state variables if required: https://chakra-ui.com/docs/form/input#controlled-input

*/

const Input = ({ label, addon, ...rest }: Props) => (
    <Box width="100%">
        {!!label && (
            <Text fontSize="xl" align="left">
                {label}
            </Text>
        )}
        <InputGroup size="lg">
            <InputLeftAddon children={addon} />
            <ChakraInput
                focusBorderColor={theme.colors.purpleC1}
                errorBorderColor={theme.colors.danger}
                {...rest}
            />
        </InputGroup>
    </Box>
)

export default Input
