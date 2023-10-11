import { config } from 'dotenv'
import axios from 'axios'
import Period from './enums/Period'
import Candle from './models/Candle'
import { createMessageChannel } from './messages/messageChannel'

config()

const readMarketPrice = async (): Promise<number> => {
    const result = await axios.get(process.env.PRICES_API)
    const { data } = result
    return data.bitcoin.usd
}

const generateCandles = async () => {
    const messageChannel = await createMessageChannel()

    if(! messageChannel) {
        return
    }

    while(true) {
        const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS
        const candle = new Candle('BTC')

        console.log('----------------------------------------');
        console.log('Gerando candle');

        for (let i = 0; i < loopTimes; i++) {
            const price = await readMarketPrice()
            candle.addValue(price)

            console.log(`Preço de mercado #${ i + 1 } de ${loopTimes}`);
            await new Promise(r => setTimeout(r, Period.TEN_SECONDS))
        }

        candle.closeCandle()
        console.log('Candle fechada');

        const candleObj = candle.toSimpleObject()
        console.log(candleObj)

        const candleJSON = JSON.stringify(candleObj)
        messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJSON))
    }
}

generateCandles()