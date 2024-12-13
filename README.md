# 3thix typescript SDK

[![NPM Version](https://img.shields.io/npm/v/3thix-typescript-sdk)](https://www.npmjs.com/package/3thix-typescript-sdk)

## Installing

```shell
npm install 3thix-typescript-sdk
# OR
yarn add 3thix-typescript-sdk
```

## Example

```ts
import Client from '3thix-typescript-sdk';

const client = Client("sandbox", "<your-api-key>")

async function openNewPayment() {
  try {
    const resp = await client.createOrderPayment("1.00", "USD")
    const paymentUrl = resp.getPaymentUrl()

    const win = window.open(paymentUrl, '', 'popup=true');
    if (!win) return;

    win.resizeTo(550, 800);
  } catch (err) {
    console.error(err)
  }
}

openNewPayment()
```

## Interface
```ts
export interface SDK {
  invoiceGet(id: string): Promise<InvoiceGetResponse>;
  createOrderPayment(amount: string, currency: string): Promise<CreateOrderResponse>;
  createOrderPurchase(fulfillmentGameUserId: string, destinationCurrency: string, cart: Cart): Promise<CreateOrderResponse>;
  authorizeFulfillment(invoiceId: string): Promise<AuthorizeFulfillmentResponse>;
  getCampaigns(gameUserId: string): Promise<GetCampaignResponse>;
  syncUsersGame(req: SyncUsersReq): Promise<SyncUsersResponse>;
  createOrderFulfillment(amount: string, currency: string, rail: string, sourceAccountId: string, fulfillmentGameUserId: string): Promise<CreateOrderResponse>;
}
```
