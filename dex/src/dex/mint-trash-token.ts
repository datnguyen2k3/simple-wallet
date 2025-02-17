import {getLucidOgmiosInstance} from "../../../src/providers/lucid-instance";
import {readValidators} from "../utils";
import {PLUTUS_PATH, PRIVATE_KEY_PATH_TEST} from "../types";
import {Constr, Data, fromText} from "@lucid-evolution/lucid";
import {getKeyFrom, submitTx} from "../../../hello-world/common";

export async function mintTrashToken(privateKey: string) {
    const lucid = await getLucidOgmiosInstance();
    lucid.selectWallet.fromSeed("ready trip crunch strategy fly design ozone spike slim shock mask bullet sing other embrace mouse dad milk spring between lizard marine drop decorate")

    const mintTrashValidator = readValidators(
        "mint_trash_token.mint_trash_token.mint",
        PLUTUS_PATH,
        []
    )
    const trashAssetName = `${mintTrashValidator.policyId}${fromText("lp4")}`;
    const mintRedeemer = Data.to(new Constr(0, []));

    const tx = await lucid
        .newTx()
        .mintAssets({[trashAssetName]: BigInt(1000000000)}, mintRedeemer)
        .attach.MintingPolicy(mintTrashValidator.policyScripts)
        .complete();

    const signedTx = await tx.sign.withWallet().complete();
    const txHash = await signedTx.submit();
    console.log("TxHash: ", txHash);
}

void mintTrashToken("");
//
// "preprodAq47SEvsVpbW03U2DkjEBG908A5D7oFx"
//
// "ed25519_sk19t78zcdpvljnpk2lk82urwvauk99q62j0lae0lcng3an0e7lgp3qg0m6yh"
// "addr_test1vrlgd555h2nyzw6qdr3vgt6yztrpm3d5l354g2jpmjyldvqq2lcef"
//
// "ready trip crunch strategy fly design ozone spike slim shock mask bullet sing other embrace mouse dad milk spring between lizard marine drop decorate"
// "addr_test1qz8ze5ez7jaahxgjjpug9fxflkg7335tdmgsuwen7wp664dxvd9yuwycltw8c5mvj00rc7qxv8kxmtpdxggdfu99cx5qgfh6c5"
//
// "ed25519_sk1wqytnmg3d87040gjkcyrse8xfjs3j5s4nfjtz3sj3twd69j0k6wsezst35"
// "addr_test1vzw42tvfupt266g5s776x3xlvuwfxy6rcjqd2znjkcswtcq7as43h"
//
//
// "addr_test1wplj7a56jfswk6vzxgpz4uplhgfw7z3fl98uj0z06f3yjusz7ufvk"