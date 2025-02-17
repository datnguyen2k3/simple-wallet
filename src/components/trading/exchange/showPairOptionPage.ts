import {TradingPair} from "../../../entities/trading-pair";
import {MainApp} from "../../../main";
import {getPrice} from "../../../common/ultis";
import {showTradingOptionsPage} from "../showTradingOptionsPage";
import {showBuyPage} from "./showBuyPage";
import {showSellPage} from "./showSellPage";
import {showNotHavePrivateKeyPage} from "../../showNotHavePrivateKeyPage";

export async function showPairOptionPage(pair: TradingPair, mainApp: MainApp) {
    console.log()
    console.log(`Pair: ${pair.tokenTradeName1}-${pair.tokenTradeName2}`);
    if (!pair.tokenTradeName1 || !pair.tokenTradeName2) {
        console.log('Invalid trading pair');
        showTradingOptionsPage(mainApp);
    } else {
        console.log(`Price: ${await getPrice(mainApp, pair.tokenTradeName1, pair.tokenTradeName2)}`);
    }

    console.log("Choose your option:");
    console.log("1 - Buy");
    console.log("2 - Sell");
    console.log("3 - Back");

    mainApp.getReadline().question(`Enter your option:`, async (option) => {
        if ((option === '1' || option === '2') && !mainApp.getPrivateKey()) {
            showNotHavePrivateKeyPage(mainApp, showTradingOptionsPage, mainApp);
            return;
        }

        switch (option) {
            case '1':
                await showBuyPage(mainApp, pair);
                break;
            case '2':
                await showSellPage(mainApp, pair);
                break;
            case '3':
                showTradingOptionsPage(mainApp);
                break;
            default:
                console.log('Invalid option');
                await showPairOptionPage(pair, mainApp);
                break;
        }
    });
}