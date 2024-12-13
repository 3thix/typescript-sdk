import { NewClient, RespAPI } from './clients';
import {
  Cart,
  SuccessCampaigns,
  SuccessCreateOrder,
  SuccessGetInvoice,
  SyncUsersReq,
  SyncUsersSuccess,
} from './models';

export interface SDK {
  invoiceGet(id: string): Promise<RespAPI<SuccessGetInvoice>>;
  createOrderPayment(amount: number, currency: string): Promise<RespAPI<SuccessCreateOrder>>;
  createOrderPurchase(
    amount: number,
    fulfillment_game_user_id: string,
    destination_currency: string,
    cart: Cart
  ): Promise<RespAPI<SuccessCreateOrder>>;
  authorizeFulfillment(invoice_id: string): Promise<RespAPI<SuccessCreateOrder>>;
  getCampaigns(game_user_id: string): Promise<RespAPI<SuccessCampaigns>>;
  syncUsersGame(req: SyncUsersReq): Promise<RespAPI<SyncUsersSuccess>>;
  createOrderFulfillment(
    amount: number,
    currency: string,
    rail: string,
    sourceAccountId: string,
    fulfillment_game_user_id: string
  ): Promise<RespAPI<SuccessCreateOrder>>;
}

export function NewSDK(environmnet: 'prod' | 'sandbox', apiKey: string) {
  let baseURL = 'https://sandbox-api.3thix.com';

  if (environmnet === 'prod') {
    baseURL = `https://api.3thix.com`;
  }

  const client = NewClient(baseURL, apiKey);

  return client;
}
