import { NewClient } from './clients';
import {
  Cart,
  Error3thix,
  SuccessAuthorizeFulfillment,
  SuccessCampaigns,
  SuccessCreateOrder,
  SuccessGetInvoice,
  SyncUsersReq,
  SyncUsersSuccess,
} from './models';

export interface SDK {
  invoiceGet(id: string): Promise<InvoiceGetResponse>;
  createOrderPayment(amount: string, currency: string): Promise<CreateOrderResponse>;
  createOrderPurchase(
    fulfillmentGameUserId: string,
    destinationCurrency: string,
    cart: Cart
  ): Promise<CreateOrderResponse>;
  authorizeFulfillment(invoiceId: string): Promise<AuthorizeFulfillmentResponse>;
  getCampaigns(gameUserId: string): Promise<GetCampaignResponse>;
  syncUsersGame(req: SyncUsersReq): Promise<SyncUsersResponse>;
  createOrderFulfillment(
    amount: string,
    currency: string,
    rail: string,
    sourceAccountId: string,
    fulfillmentGameUserId: string
  ): Promise<CreateOrderResponse>;
}

export type InvoiceGetResponse = {
  data: SuccessGetInvoice;
};

export type CreateOrderResponse = {
  data: SuccessCreateOrder;
  getPaymentUrl: () => string;
};

export type AuthorizeFulfillmentResponse = {
  data: SuccessAuthorizeFulfillment;
};

export type GetCampaignResponse = {
  data: SuccessCampaigns;
};

export type SyncUsersResponse = {
  data: SyncUsersSuccess;
};

export function NewSDK(environmnet: 'prod' | 'sandbox', apiKey: string): SDK {
  let paymentBaseUrl = `https://${environmnet}-pay.3thix.com`;
  let apiBaseUrl = `https://${environmnet}-api.3thix.com`;

  if (environmnet === 'prod') {
    apiBaseUrl = `https://api.3thix.com`;
    paymentBaseUrl = `https://pay.3thix.com`;
  }

  const client = NewClient(apiBaseUrl, apiKey);

  return {
    invoiceGet: async function (id: string) {
      const { status, data } = await client.invoiceGet(id);
      if (status !== 200) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      return {
        data: data as SuccessGetInvoice,
      };
    },
    createOrderPayment: async function (amount: string, currency: string) {
      const { status, data } = await client.createOrderPayment(amount, currency);
      if (status !== 201) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      const resp = data as SuccessCreateOrder;
      return {
        data: resp,
        getPaymentUrl: () => `${paymentBaseUrl}?invoiceId=${resp.invoice_id}`,
      };
    },
    createOrderPurchase: async function (fulfillmentGameUserId: string, destinationCurrency: string, cart: Cart) {
      const { status, data } = await client.createOrderPurchase(fulfillmentGameUserId, destinationCurrency, cart);
      if (status !== 201) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      const resp = data as SuccessCreateOrder;
      return {
        data: resp,
        getPaymentUrl: () => `${paymentBaseUrl}?invoiceId=${resp.invoice_id}`,
      };
    },
    authorizeFulfillment: async function (invoiceId: string) {
      const { status, data } = await client.authorizeFulfillment(invoiceId);
      if (status !== 200) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      return {
        data: data as SuccessAuthorizeFulfillment,
      };
    },
    getCampaigns: async function (gameUserId: string) {
      const { status, data } = await client.getCampaigns(gameUserId);
      if (status !== 200) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      return {
        data: data as SuccessCampaigns,
      };
    },
    syncUsersGame: async function (req: SyncUsersReq) {
      const { status, data } = await client.syncUsersGame(req);
      if (status !== 200) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      return {
        data: data as SyncUsersSuccess,
      };
    },
    createOrderFulfillment: async function (
      amount: string,
      currency: string,
      rail: string,
      sourceAccountId: string,
      fulfillmentGameUserId: string
    ) {
      const { status, data } = await client.createOrderFulfillment(
        amount,
        currency,
        rail,
        sourceAccountId,
        fulfillmentGameUserId
      );
      if (status !== 201) {
        const errorResp = data as Error3thix;
        console.error(errorResp);
        throw new Error(errorResp.message);
      }

      const resp = data as SuccessCreateOrder;
      return {
        data: resp,
        getPaymentUrl: () => `${paymentBaseUrl}?invoiceId=${resp.invoice_id}`,
      };
    },
  };
}
