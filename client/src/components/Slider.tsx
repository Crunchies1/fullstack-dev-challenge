import React from 'react'
import { AiOutlinePercentage } from 'react-icons/ai'
import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderProps,
    Text,
    Box,
    Tooltip,
} from '@chakra-ui/react'
type Props = SliderProps & {
    label?: string
    tooltip?: number
    color?: string
}

const Slider = ({ label, tooltip, color, ...rest }: Props) => (
    <Box width="100%">
        {!!label && <Text align="left">{label}</Text>}
        <ChakraSlider {...rest} colorScheme={color}>
            <SliderTrack>
                <SliderFilledTrack bg={color} />
            </SliderTrack>
            <Tooltip hasArrow label={tooltip}>
                <SliderThumb boxSize={6}>
                    <Box as={AiOutlinePercentage} />
                </SliderThumb>
            </Tooltip>
        </ChakraSlider>
    </Box>
)

export default Slider
