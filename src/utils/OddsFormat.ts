import BigDecimal from "js-big-decimal";
import {HKBasketballPrincipalMkts, HKSoccerPrincipalMkts} from "@/utils/HKIncludePrincipalMkts";
export function oddsFormat(odds: number | string, displayType: string, precision: number = 2, marketType: string = ''): string {
    if (!odds) return ''
    if (typeof odds === 'string') odds = Number(odds)
    let formatted: string
    switch (displayType) {
        case 'American': {
            if (BigDecimal.compareTo(odds, 2) === 1) {
                formatted = `+${BigDecimal.round(BigDecimal.multiply(BigDecimal.subtract(odds, 1), 100), precision)}`
            } else {
                formatted = BigDecimal.divide(-100, BigDecimal.subtract(odds, 1), precision)
            }
            break
        }
        case 'Fractional': {
            formatted = `${decimalToFraction(BigDecimal.subtract(odds, 1))}`
            break
        }
        case 'Malay': {
            if (BigDecimal.compareTo(odds, 2) === 1) {
                formatted = BigDecimal.round(BigDecimal.subtract(odds, 1), precision)
            } else {
                formatted = BigDecimal.divide(-1, BigDecimal.subtract(odds, 1), precision)
            }
            break
        }
        case 'Indonesian': {
            if (BigDecimal.compareTo(odds, 2) === 1) {
                formatted = `+${BigDecimal.round(BigDecimal.subtract(odds, 1), precision)}`
            } else {
                formatted = BigDecimal.divide(-1, BigDecimal.subtract(odds, 1), precision)
            }
            break
        }
        case 'Hong Kong': {
            if (HKBasketballPrincipalMkts.map(m => m.toLowerCase()).includes(marketType.toLowerCase()) ||
                HKSoccerPrincipalMkts.map(m => m.toLowerCase()).includes(marketType.toLowerCase())) {
                formatted = BigDecimal.round(odds, precision)
            } else {
                formatted = BigDecimal.round(BigDecimal.subtract(odds, 1), precision)
            }
            break
        }
        default: {
            formatted = BigDecimal.round(odds, precision)
            break
        }
    }
    return formatted
}

function decimalToFraction(decimal: string): string {
    if (isIntegerString(decimal)) {
        return `${decimal}/1`;
    } else {
        const [wholePart, fractionalPart] = decimal.split('.');
        const numerator = fractionalPart ? parseInt(wholePart + fractionalPart) : parseInt(wholePart);
        const denominator = Math.pow(10, fractionalPart ? fractionalPart.length : 0);

        return simplifyFraction(numerator, denominator)
    }
}

function isIntegerString(str: string): boolean {
    return /^\d+$/.test(str)
}

function simplifyFraction(numerator: number, denominator: number): string {
    const gcd = greatestCommonDivisor(numerator, denominator)
    const simplifiedNumerator = numerator / gcd
    const simplifiedDenominator = denominator / gcd
    const isNegative = numerator < 0 || denominator < 0
    const fraction = `${BigDecimal.abs(simplifiedNumerator)}/${BigDecimal.abs(simplifiedDenominator)}`
    return isNegative ? `-${fraction}` : fraction
}

function greatestCommonDivisor(a: number, b: number): number {
    if (b === 0) {
        return a
    } else {
        return greatestCommonDivisor(b, a % b)
    }
}
