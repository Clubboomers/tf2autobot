import Bot from '../../classes/Bot';
import { OfferData } from '@tf2autobot/tradeoffer-manager';
import SKU from '@tf2autobot/tf2-sku';

export default function detailedStats(bot: Bot): Promise<{ items: Item }> {
    return new Promise((resolve, reject) => {
        const pollData = bot.manager.pollData;
        const items: Item = {};

        if (pollData.offerData) {
            const trades = Object.keys(pollData.offerData).map(offerID => {
                const ret = pollData.offerData[offerID] as OfferDataWithTime;
                ret.time = pollData.timestamps[offerID];
                return ret;
            });
            const keyPrice = bot.pricelist.getKeyPrice;
            const weapons = bot.handler.isWeaponsAsCurrency.enable
                ? bot.handler.isWeaponsAsCurrency.withUncraft
                    ? bot.craftWeapons.concat(bot.uncraftWeapons)
                    : bot.craftWeapons
                : [];

            for (let i = 0; i < trades.length; i++) {
                const trade = trades[i];
                if (!(trade.handledByUs && trade.isAccepted)) {
                    // trade was not accepted, go to next trade
                    continue;
                }

                if (!Object.prototype.hasOwnProperty.call(trade, 'dict')) {
                    // lol just copying this
                    // trade has no items involved (not possible, but who knows)
                    continue;
                }

                if (typeof Object.keys(trade.dict.our).length === 'undefined') {
                    continue; // no items on our side, so it is probably gift - we are not counting gifts
                } else if (Object.keys(trade.dict.our).length > 0) {
                    // trade is not a gift
                    if (!Object.prototype.hasOwnProperty.call(trade, 'value')) {
                        // trade is missing value object
                        continue;
                    }

                    if (!(Object.keys(trade.prices).length > 0)) {
                        // have no prices, broken data, skip
                        continue;
                    }
                } else {
                    continue; // no items on our side, so it is probably gift
                }

                if (typeof trade.value === 'undefined') {
                    trade.value = {};
                }

                if (typeof trade.value.rate === 'undefined') {
                    if (!Object.prototype.hasOwnProperty.call(trade, 'value')) {
                        // in case it was gift
                        trade.value = {};
                    }

                    trade.value.rate = keyPrice.metal; // set key value to current value if it is not defined
                }

                for (const sku in trade.dict.their) {
                    // item bought
                    if (Object.prototype.hasOwnProperty.call(trade.dict.their, sku)) {
                        const itemCount =
                            typeof trade.dict.their[sku] === 'object'
                                ? (trade.dict.their[sku]['amount'] as number) // pollData v2.2.0 until v.2.3.5
                                : trade.dict.their[sku]; // pollData before v2.2.0 and/or v3.0.0 or later

                        if (
                            !(
                                (bot.options.miscSettings.weaponsAsCurrency.enable && weapons.includes(sku)) ||
                                ['5000;6', '5001;6', '5002;6'].includes(sku)
                            )
                        ) {
                            if (!Object.prototype.hasOwnProperty.call(trade.prices, sku)) {
                                continue; // item is not in pricelist, so we will just skip it
                            }
                            while (Object.prototype.hasOwnProperty.call(trades[sku].sold, trade.time)) {
                                trade.time++; // Prevent two trades with the same timestamp (should not happen so much)
                            }
                            if (!items[sku]) {
                                // if item is not in the list
                                items[sku] = {
                                    name: this.bot.schema.getName(SKU.fromString(sku)), // how to get name from sku?
                                    profit: {
                                        keys: 0,
                                        metal: 0
                                    },
                                    bought: {},
                                    sold: {},
                                    volume: trade.dict.their[sku]
                                };
                                items[sku].bought[String(trade.time)] = {
                                    count: itemCount,
                                    keys: trade.prices[sku].buy.keys,
                                    metal: trade.prices[sku].buy.metal
                                };
                            } else {
                                items[sku].volume += trade.dict.their[sku];
                                // .profit will be calculated later
                                items[sku].bought[String(trade.time)] = {
                                    count: itemCount,
                                    keys: trade.prices[sku].buy.keys,
                                    metal: trade.prices[sku].buy.metal
                                };
                            }
                        }
                    }
                }
                for (const sku in trade.dict.our) {
                    // item sold
                    if (Object.prototype.hasOwnProperty.call(trade.dict.our, sku)) {
                        const itemCount =
                            typeof trade.dict.our[sku] === 'object'
                                ? (trade.dict.our[sku]['amount'] as number) // pollData v2.2.0 until v.2.3.5
                                : trade.dict.our[sku]; // pollData before v2.2.0 and/or v3.0.0 or later

                        if (
                            !(
                                (bot.options.miscSettings.weaponsAsCurrency.enable && weapons.includes(sku)) ||
                                ['5000;6', '5001;6', '5002;6'].includes(sku)
                            )
                        ) {
                            if (!Object.prototype.hasOwnProperty.call(trade.prices, sku)) {
                                continue; // item is not in pricelist, so we will just skip it
                            }
                            while (Object.prototype.hasOwnProperty.call(trades[sku].sold, trade.time)) {
                                trade.time++; // Prevent two trades with the same timestamp (should not happen so much)
                            }
                            if (!items[sku]) {
                                // if item is not in the list
                                items[sku] = {
                                    name: this.bot.schema.getName(SKU.fromString(sku)), // how to get name from sku?
                                    profit: {
                                        keys: 0,
                                        metal: 0
                                    },
                                    bought: {},
                                    sold: {},
                                    volume: trade.dict.our[sku]
                                };
                                items[sku].sold[String(trade.time)] = {
                                    count: itemCount,
                                    keys: trade.prices[sku].sell.keys,
                                    metal: trade.prices[sku].sell.metal
                                };
                            } else {
                                items[sku].volume += trade.dict.our[sku];
                                // .profit will be calculated later
                                items[sku].sold[String(trade.time)] = {
                                    count: itemCount,
                                    keys: trade.prices[sku].sell.keys,
                                    metal: trade.prices[sku].sell.metal
                                };
                            }
                        }
                    }
                }
            }
            for (const sku in items) {
                items[sku].profit = calcTotalProfit(items[sku], keyPrice.metal);
            }

            if (Object.keys(items).length <= 0) {
                return reject('No record found.');
            }

            return resolve({ items });
        }
    });
}

function calcTotalProfit(item: Values, keyRate: number): Price {
    let totalKeys = 0;
    let totalMetal = 0;
    const boughtNum = getTradeAmount(item.bought);
    const soldNum = getTradeAmount(item.sold);
    const diffNum = Math.min(boughtNum, soldNum);

    const buyValue = getNTradesValue(item.bought, diffNum, keyRate);
    const sellValue = getNTradesValue(item.sold, diffNum, keyRate);

    totalMetal = sellValue - buyValue;
    totalKeys = Math.floor(totalMetal / keyRate); // add remainder back to metal
    totalMetal = totalMetal % keyRate;

    item.profit = {
        keys: totalKeys,
        metal: totalMetal
    };

    return item.profit;
}

/**
 * gets the total trading volume of an item up to the last n trades
 * @param trades
 * @param n
 */
function getNTradesValue(trades: ItemStats, n: number, keyRate: number) {
    let totalMetal = 0;
    let count = 0;
    for (const time in trades) {
        if (Object.prototype.hasOwnProperty.call(trades, time)) {
            if (count + trades[time].count >= n) {
                const diff = n - count;
                totalMetal += diff * trades[time].metal + diff * keyRate;
                break;
            }
            totalMetal += trades[time].count * trades[time].metal + trades[time].keys * keyRate;
            count += trades[time].count;
            if (count >= n) {
                break;
            }
        }
    }
    return totalMetal;
}

function getTradeAmount(itemStats: ItemStats) {
    let amount = 0;
    for (const time in itemStats) {
        if (Object.prototype.hasOwnProperty.call(itemStats, time)) {
            amount += itemStats[time].count;
        }
    }
    return amount;
}

interface DetailedStats {}

interface OfferDataWithTime extends OfferData {
    time: number;
}

interface Item {
    [sku: string]: Values;
}

interface Values {
    name: string;
    profit: Price;
    volume: number;
    bought: ItemStats;
    sold: ItemStats;
}

interface Price {
    keys: number;
    metal: number;
}

interface ItemStats {
    [time: string]: ItemStatsValue;
}

interface ItemStatsValue {
    count: number;
    keys: number;
    metal: number;
}
