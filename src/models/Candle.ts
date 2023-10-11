import CandleColor from "../enums/CandleColor"

export default class Candle {
    low: number
    high: number
    close: number
    open: number
    color: CandleColor
    finalDateTime: Date
    values: number[]
    currency: string

    constructor(currency: string) {
        this.currency = currency
        this.low = Infinity
        this.high = 0
        this.close = 0
        this.open = 0
        this.values = []
        this.color = CandleColor.UNDETERMINED
    }

    addValue(value: number) {
        this.values.push(value);

        if (this.values.length == 1) {
            this.open = value
        }

        if (value < this.low) {
            this.low = value
        }

        if (value > this.high) {
            this.high = value
        }
    }

    closeCandle() {
        if (this.values.length > 0) {
            this.close = this.values[this.values.length - 1]
            this.finalDateTime = new Date()

            if (this.close < this.open) {
                this.color = CandleColor.RED
            } else if (this.close > this.open) {
                this.color = CandleColor.GREEN
            }
        }
    }

    toSimpleObject() {
        const { values, ...obj } = this
        return obj
    }
}