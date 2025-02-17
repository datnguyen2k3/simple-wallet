import {MainApp} from "../main";

export function showNotHavePrivateKeyPage(mainApp: MainApp, callback: (...args: any[]) => any, ...callbackArgs: any[]) {
    console.log();
    console.log('You do not have a wallet yet');
    console.log('Press any key to go back');
    mainApp.getReadline().once('line', () => {
        callback(...callbackArgs);
    });
}