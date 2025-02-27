import {CML, fromHex} from "@lucid-evolution/lucid";
import { mnemonicToEntropy } from "bip39";


export function getPrivateKeyFromSeed(seed: string, index: number = 0) {
    function harden(num: number) {
        return 2147483648 + num;
    }
    const entropy = mnemonicToEntropy(seed);
    const rootKey = CML.Bip32PrivateKey.from_bip39_entropy(
        fromHex(entropy),
        new Uint8Array()
    );
    const accountKey = rootKey.derive(harden(1852)).derive(harden(1815)).derive(harden(index));
    rootKey.free();
    const paymentKey = accountKey.derive(0).derive(0).to_raw_key();
    return paymentKey.to_bech32();
}
