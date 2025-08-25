<template>
  <div class="playground-table-plus">
    <section>
      <mc-table-plus
        :data="tableData"
        :loading="loading"
        @change:sort="handleSort"
      >
        <mc-table-column prop="name" label="Name" desc="Student Name" />
      </mc-table-plus>
    </section>
    <section>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="Name" sortable width="180" />
        <el-table-column prop="age" label="Age" sortable width="180" />
        <el-table-column prop="position" label="Position" sortable />
      </el-table>
    </section>
    <section class="tool-bar">
      <mc-button @click="handleFetchData">Fetch Data</mc-button>
      <mc-button @click="handleResetData">Reset Data</mc-button>
      <mc-button @click="handleEmptyData">Empty Data</mc-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { McTableSort } from "@mc-plus/components/mc-table-plus/types";
import McTablePlus from "../../../../components/mc-table-plus/mc-table-plus.vue";
import McTableColumn from "../../../../components/mc-table-plus/mc-table-column.vue";
import { onMounted, ref } from "vue";
import { McButton } from "mc-plus";
import { delay } from "@mc-plus/utils";
import { orderBy } from "lodash-es";
import { http } from "../../apis";

// Code
// Name
// Last Updated Date
// Account
// Type
// Currency
// Amount
// Status
// Actions

// {
//     "total": 1800,
//     "list": [
//         {
//             "createAt": "2025-08-25T09:59:32.000+00:00",
//             "updateAt": "2025-08-25T09:59:32.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18683,
//             "paymentCode": "DP2025082517590001",
//             "paymentType": 10,
//             "status": 10,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x5c3ace2ee6ff65a4b864325200a22763de1cbf5e",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0101217",
//             "payeeAccountType": 2,
//             "payeeName": "alove",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xf3b2e8eb0a56cba18fab91e762a67ecb15198eb9",
//             "payeeSettleName": null,
//             "currency": "USDT",
//             "totalAmount": 3800000000,
//             "receiveAmount": 3800000000,
//             "chargeAmount": 0,
//             "opStatus": 1,
//             "detail": "0x4eef63828a91e7906917f349daacd724aa973449b2f4cf77d1e2a2a3f34b7e2a",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101217",
//             "clientName": "alove",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-25T07:51:31.000+00:00",
//             "updateAt": "2025-08-25T07:51:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18681,
//             "paymentCode": "DP2025082515510001",
//             "paymentType": 10,
//             "status": 10,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "TCm1qUpSmeENH3PxWozQRDQbTpmbTDfhXx",
//             "payerSettleName": "TRON",
//             "payeeCode": "A0101580",
//             "payeeAccountType": 2,
//             "payeeName": "cyTestC3",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "TSK25gcpDE3ET8svdzFNKMGPPGCyYFCqKc",
//             "payeeSettleName": null,
//             "currency": "USDT",
//             "totalAmount": 380000000,
//             "receiveAmount": 380000000,
//             "chargeAmount": 0,
//             "opStatus": 1,
//             "detail": "4d31413b922ca2f3b5cfc08448ef4342da3fe6fe3bca1d8f31086284dc4165db",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101580",
//             "clientName": "cyTestC3",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-25T02:01:31.000+00:00",
//             "updateAt": "2025-08-25T02:01:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18675,
//             "paymentCode": "DP2025082510010001",
//             "paymentType": 11,
//             "status": 24,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x7e2e79be7840c512ffd441a01274900b9ca7fe62",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0101357",
//             "payeeAccountType": 2,
//             "payeeName": "enduser-ql-01@qq.com",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xf3c3e95597544cd0525393ce49b685994b8e50a7",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 1000000000,
//             "receiveAmount": 1000000000,
//             "chargeAmount": 0,
//             "opStatus": 3,
//             "detail": "0x0dc0a55086248d3a5992e00a56565e028896f3fc64b105bf335942bad5a37e8a",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101357",
//             "clientName": "enduser-ql-01@qq.com",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": true,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T10:24:31.000+00:00",
//             "updateAt": "2025-08-22T10:24:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18670,
//             "paymentCode": "DP2025082218240001",
//             "paymentType": 12,
//             "status": 10,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x4061e14e77866eab84dd7ec9af9ee42e123be7ae",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0100675",
//             "payeeAccountType": 2,
//             "payeeName": "dev-safeheron",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0x6db0739b05bca30260f80eb18d83a8582442712c",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 20000000,
//             "receiveAmount": 15000000,
//             "chargeAmount": 5000000,
//             "opStatus": 1,
//             "detail": "0x1a7efa13f217177b141d1f87b4277db267896a69909ee6c9ab497818e92ae2d7",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0100675",
//             "clientName": "dev-safeheron",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": "",
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T10:22:31.000+00:00",
//             "updateAt": "2025-08-22T10:22:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18669,
//             "paymentCode": "DP2025082218220001",
//             "paymentType": 11,
//             "status": 12,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x1e9a10cc141646d89c3c4fb4fc0e56089150b218",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0101580",
//             "payeeAccountType": 2,
//             "payeeName": "cyTestC3",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xc402c8a1bfc666bd83c9b1a4f23af158ec216a7a",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 10000000,
//             "receiveAmount": 10000000,
//             "chargeAmount": 0,
//             "opStatus": 3,
//             "detail": "0xf108dd2d3dae59d61493b45597e47eedaded4b54f2098820a09c9e855646d98c",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101580",
//             "clientName": "cyTestC3",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T09:55:31.000+00:00",
//             "updateAt": "2025-08-22T09:55:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18667,
//             "paymentCode": "DP2025082217550001",
//             "paymentType": 11,
//             "status": 12,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x1e9a10cc141646d89c3c4fb4fc0e56089150b218",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0101580",
//             "payeeAccountType": 2,
//             "payeeName": "cyTestC3",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xc402c8a1bfc666bd83c9b1a4f23af158ec216a7a",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 10000000,
//             "receiveAmount": 10000000,
//             "chargeAmount": 0,
//             "opStatus": 3,
//             "detail": "0xc1b71f36e46e1b888eb19cb80c5f66659fd8e254ab8b3f37b257a0c0a3d5d975",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101580",
//             "clientName": "cyTestC3",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T09:27:31.000+00:00",
//             "updateAt": "2025-08-22T09:27:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18661,
//             "paymentCode": "DP2025082217270001",
//             "paymentType": 11,
//             "status": 12,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x1e9a10cc141646d89c3c4fb4fc0e56089150b218",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0101580",
//             "payeeAccountType": 2,
//             "payeeName": "cyTestC3",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xc402c8a1bfc666bd83c9b1a4f23af158ec216a7a",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 11000000,
//             "receiveAmount": 11000000,
//             "chargeAmount": 0,
//             "opStatus": 3,
//             "detail": "0x7c636f2074a9d796dd2fed1932f150cf418e8bf112b192496c5c6f2cc278906f",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101580",
//             "clientName": "cyTestC3",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T08:58:31.000+00:00",
//             "updateAt": "2025-08-22T08:58:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18655,
//             "paymentCode": "DP2025082216580001",
//             "paymentType": 11,
//             "status": 12,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x4061e14e77866eab84dd7ec9af9ee42e123be7ae",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0100675",
//             "payeeAccountType": 2,
//             "payeeName": "dev-safeheron",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xc402c8a1bfc666bd83c9b1a4f23af158ec216a7a",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 20000000,
//             "receiveAmount": 20000000,
//             "chargeAmount": 0,
//             "opStatus": 3,
//             "detail": "0xf2a644f818df9635204101a8499a1b12d4b6d00525e47854cbcebc6f7e10a24e",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0100675",
//             "clientName": "dev-safeheron",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T08:45:32.000+00:00",
//             "updateAt": "2025-08-22T08:56:34.000+00:00",
//             "createBy": 0,
//             "updateBy": 1,
//             "id": 18651,
//             "paymentCode": "DP2025082216450001",
//             "paymentType": 11,
//             "status": 15,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x1e9a10cc141646d89c3c4fb4fc0e56089150b218",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0101580",
//             "payeeAccountType": 2,
//             "payeeName": "cyTestC3",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xc402c8a1bfc666bd83c9b1a4f23af158ec216a7a",
//             "payeeSettleName": "ETH",
//             "currency": "ETH",
//             "totalAmount": 1000000,
//             "receiveAmount": 1000000,
//             "chargeAmount": 0,
//             "opStatus": 5,
//             "detail": "0x8951f079742e7b26bf954e14859cae4888fef07ec50685c3df6358529f8cc166",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0101580",
//             "clientName": "cyTestC3",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         },
//         {
//             "createAt": "2025-08-22T08:46:31.000+00:00",
//             "updateAt": "2025-08-22T08:46:31.000+00:00",
//             "createBy": 0,
//             "updateBy": 0,
//             "id": 18652,
//             "paymentCode": "DP2025082216460001",
//             "paymentType": 11,
//             "status": 12,
//             "statusDesc": null,
//             "payerCode": "C0010001",
//             "payerName": "MetaComp",
//             "payerAccountType": 2,
//             "payerSettleType": 2,
//             "payerSettleAccount": "0x4061e14e77866eab84dd7ec9af9ee42e123be7ae",
//             "payerSettleName": "ETH",
//             "payeeCode": "A0100675",
//             "payeeAccountType": 2,
//             "payeeName": "dev-safeheron",
//             "payeeSettleType": 2,
//             "payeeSettleAccount": "0xc402c8a1bfc666bd83c9b1a4f23af158ec216a7a",
//             "payeeSettleName": "ETH",
//             "currency": "USDT",
//             "totalAmount": 30000000,
//             "receiveAmount": 30000000,
//             "chargeAmount": 0,
//             "opStatus": 3,
//             "detail": "0xfe6dc883095f64a22ff8196f80a98d8c8af9ade0193229d0042e043ab06b9864",
//             "relationshipPayee": null,
//             "purposeOfTransaction": null,
//             "proof": null,
//             "withdrawalRequestId": null,
//             "withdrawalSuccess": null,
//             "feeRate": null,
//             "fee": null,
//             "additionalCharge": null,
//             "chargeType": null,
//             "coboInfo": null,
//             "poboInfo": null,
//             "pathFrom": "BANK",
//             "pathTo": "2",
//             "clientCode": "A0100675",
//             "clientName": "dev-safeheron",
//             "accountType": null,
//             "amount": null,
//             "payerLabel": null,
//             "payeeLabel": null,
//             "referenceCode": null,
//             "exchangeName": null,
//             "coboApproval": null,
//             "walletType": null,
//             "pendingKytTime": null,
//             "forceStatus": null,
//             "manualFlag": null,
//             "comments": null,
//             "refundRequestButtonFlag": false
//         }
//     ],
//     "pageNum": 1,
//     "pageSize": 10,
//     "size": 10,
//     "startRow": 1,
//     "endRow": 10,
//     "pages": 180,
//     "prePage": 0,
//     "nextPage": 2,
//     "isFirstPage": true,
//     "isLastPage": false,
//     "hasPreviousPage": false,
//     "hasNextPage": true,
//     "navigatePages": 8,
//     "navigatepageNums": [
//         1,
//         2,
//         3,
//         4,
//         5,
//         6,
//         7,
//         8
//     ],
//     "navigateFirstPage": 1,
//     "navigateLastPage": 8
// }

interface User {
  name: string;
  age: number;
  position: "guitarist" | "bassist" | "drummer" | "keyboardist";
}

const _data: User[] = [
  {
    name: "Hirasawa Yui",
    age: 19,
    position: "guitarist",
  },
  {
    name: "Nakano Azusa",
    age: 18,
    position: "guitarist",
  },
  {
    name: "Akiyama Mio",
    age: 19,
    position: "bassist",
  },
  {
    name: "Tainaka Ritsu",
    age: 19,
    position: "drummer",
  },
  {
    name: "Kotobuku Tsumugi",
    age: 19,
    position: "keyboardist",
  },
];

const tableData = ref<User[]>([]);

const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  await delay(3000);
  tableData.value = _data;
  loading.value = false;

  // fetch date
  fetchData();
});

const fetchData = async () => {
  const res = await http.post("/payment/payment/depositListByPage.do", {
    pageNum: 1,
    pageSize: 10,
  });
  console.log("tableData: ", res);
};

// handle fetch data
const handleFetchData = async () => {
  await delay(3000);
  tableData.value = _data.slice(0, 2);
};

// handle reset data
const handleResetData = () => {
  tableData.value = _data;
};

// handle empty data
const handleEmptyData = () => {
  tableData.value = [];
};

// handle sort
const handleSort = async (prop: string, sort: McTableSort) => {
  console.log("handleSort", prop, sort);
  loading.value = true;
  await delay(3000);
  if (sort === "normal") {
    tableData.value = _data;
  } else {
    tableData.value = orderBy(tableData.value, [prop], [sort]);
  }
  loading.value = false;
};
</script>

<style scoped lang="scss">
.playground-table-plus {
  box-sizing: border-box;
  padding: 200px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  .position-container {
    color: var(--mc-teal-500);
  }

  .position-action {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tool-bar {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    gap: 16px;
  }
}
</style>
