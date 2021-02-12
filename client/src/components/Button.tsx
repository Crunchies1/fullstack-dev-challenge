import React from 'react'
import { Button as ChakraButton, ButtonProps, Box } from '@chakra-ui/react'

type Props = ButtonProps & {
    borderColor?: string
    innerColor?: string
}

const Button = ({ borderColor, innerColor, ...rest }: Props) => (
    <Box width="100%">
        <ChakraButton
            {...rest}
            border="2px"
            borderColor={borderColor}
            colorScheme={innerColor}
            variant="outline"
        />
    </Box>
)

export default Button
