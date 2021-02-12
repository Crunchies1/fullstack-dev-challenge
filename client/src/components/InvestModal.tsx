import React, { ReactText } from 'react'
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    RadioGroup,
    Stack,
    Radio,
    VStack,
    Text,
} from '@chakra-ui/react'
import Button from './Button'
import Input from './Input'

type Props = {
    isOpen: boolean
    onClose: () => void
    setInvestmentPeriod: (e: ReactText) => void
    setCustomInvestRate: (e: string) => void
    label: string
}

const Modal = ({
    label,
    isOpen,
    onClose,
    setInvestmentPeriod,
    setCustomInvestRate,
    ...rest
}: Props) => (
    <ChakraModal {...rest} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>{label}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack spacing={4}>
                    <Text fontSize="xl" align="left">
                        Investment Period
                    </Text>
                    <RadioGroup onChange={(e) => setInvestmentPeriod(e)}>
                        <Stack direction="row">
                            <Radio value="1">Annually</Radio>
                            <Radio value="2">Semi-Annual</Radio>
                            <Radio value="3">Quarterly</Radio>
                            <Radio value="4">Monthly</Radio>
                        </Stack>
                    </RadioGroup>
                    <Input
                        label="Custom Interest rate"
                        name="Custom Interest rate"
                        addon="%"
                        onChange={(e) => setCustomInvestRate(e.target.value)}
                    />
                </VStack>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Save
                </Button>
            </ModalFooter>
        </ModalContent>
    </ChakraModal>
)

export default Modal
