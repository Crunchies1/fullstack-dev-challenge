import React, { useEffect } from 'react'
import { Heading, VStack, useDisclosure, Grid, GridItem } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import Button from '../components/Button'
import Modal from '../components/InvestModal'
import DefaultLayout from '../components/layouts/Default'
import { getProjection } from '../utils'
import theme from '../theme'

// Note: This is just for example purposes
// should be replaced with real data from the server

var yearStart = 0
var yearEnd = 51
var years: number[] = []
while (yearStart < yearEnd + 1) {
    years.push(yearStart++)
}
const xAxis: number[] = years

const Savings = () => {
    const [initialSavings, setInitialSavings] = React.useState<string>('5000')
    const [monthlyDepo, setMonthlyDepo] = React.useState<string>('100')
    const [interestRate, setInterestRate] = React.useState<number>(0)
    const [interestRateSlider, setInterestRateSlider] = React.useState<number>(0)
    const [investmentPeriod, setInvestmentPeriod] = React.useState<React.ReactText>('1')
    const [customInvestRate, setCustomInvestRate] = React.useState<string>('-1')
    const [yAxis, setYAxis] = React.useState<number[]>([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInitialSavings(e.target.value)
    }

    const handleMonthlyDepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonthlyDepo(e.target.value)
    }

    const handleInterestRateSliderChange = (value: number) => {
        console.log(value)
        setCustomInvestRate('-1')
        setInterestRateSlider(value)
    }

    const handleInterestRateSliderChangeEnd = (value: number) => {
        console.log('final value' + value)
        setInterestRate(value)
    }

    useEffect(() => {
        getProjection(
            initialSavings,
            monthlyDepo,
            interestRate,
            investmentPeriod,
            customInvestRate
        ).then((m) => {
            setYAxis(m)
        })
    }, [initialSavings, monthlyDepo, interestRate, investmentPeriod, customInvestRate])

    return (
        <DefaultLayout>
            <Grid templateColumns="repeat(3, 1fr)" gap={7}>
                <GridItem colSpan={1} pl={7} pt={7}>
                    <VStack spacing={4}>
                        <Heading as="h1">Interest Rate Calculator</Heading>
                        <Input
                            label="Initial Savings amount"
                            name="Initial Savings"
                            addon="$"
                            value={initialSavings}
                            onChange={handleSavingsChange}
                            placeholder="5000"
                        />
                        <Input
                            label="Monthly Deposit"
                            name="Monthly Deposit"
                            addon="$"
                            value={monthlyDepo}
                            onChange={handleMonthlyDepoChange}
                            placeholder="100"
                        />
                        <Slider
                            label={
                                'Interest Rate (' +
                                (customInvestRate === '-1'
                                    ? interestRateSlider
                                    : customInvestRate) +
                                '%)'
                            }
                            name="Interest Rate"
                            value={interestRateSlider}
                            tooltip={interestRateSlider}
                            min={0}
                            max={4}
                            step={0.05}
                            color={theme.colors.redC1}
                            onChange={handleInterestRateSliderChange}
                            onChangeEnd={handleInterestRateSliderChangeEnd}
                        />
                        <Button borderColor="twitter" innerColor="twitter" onClick={onOpen}>
                            {' '}
                            Settings{' '}
                        </Button>
                        <Modal
                            setCustomInvestRate={setCustomInvestRate}
                            setInvestmentPeriod={setInvestmentPeriod}
                            label="Custom Settings"
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    </VStack>
                </GridItem>
                <GridItem pr={7} pt={7} colSpan={2}>
                    <LineChart
                        title="Savings Over time"
                        xAxisData={xAxis}
                        yAxisData={yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </GridItem>
            </Grid>
        </DefaultLayout>
    )
}

export default Savings
