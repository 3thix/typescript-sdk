import axios, { AxiosError } from 'axios';

import {
  Cart,
  Error3thix,
  SuccessAuthorizeFulfillment,
  SuccessCampaigns,
  SuccessCreateOrder,
  SuccessGetInvoice,
  SyncUsersReq,
  SyncUsersSuccess,
} from '@src/models';

export type RespAPI<Success> = {
  status: number;
  data: Success | Error3thix;
};

export function NewClient(baseURL: string, apiKey: string) {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10_000,
    headers: {
      'x-api-key': apiKey,
    },
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError): RespAPI<AxiosError> => {
      const errorData = error.response?.data as Error3thix | undefined;

      return {
        status: error.response?.status || 500,
        data: { message: errorData?.message || error.message, error_code: errorData?.error_code || '' },
      };
    }
  );

  async function invoiceGet(id: string): Promise<RespAPI<SuccessGetInvoice>> {
    const response = await instance.post('/invoice/issuer/get', { id });

    return {
      status: response.status,
      data: response.data,
    };
  }

  async function createOrderPayment(amount: number, currency: string): Promise<RespAPI<SuccessCreateOrder>> {
    const response = await instance.post('/order/payment/create', {
      currency,
      amount,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }

  async function createOrderPurchase(
    amount: number,
    fulfillment_game_user_id: string,
    destination_currency: string,
    cart: Cart
  ): Promise<RespAPI<SuccessCreateOrder>> {
    console.info('fixed currency for now', destination_currency);
    const response = await instance.post('/order/purchase/create', {
      fulfillment_game_user_id,
      type: 'PURCHASE',
      destination_currency: destination_currency,
      carts: cart,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }

  async function createOrderFulfillment(
    amount: number,
    currency: string,
    rail: string,
    sourceAccountId: string,
    fulfillment_game_user_id: string
  ): Promise<RespAPI<SuccessCreateOrder>> {
    const response = await instance.post('/order/fulfillment/create', {
      source_payment_account_id: sourceAccountId,
      fulfillment_game_user_id,
      currency: currency,
      rail: rail,
      amount: amount,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }

  async function authorizeFulfillment(invoice_id: string): Promise<RespAPI<SuccessAuthorizeFulfillment>> {
    const response = await instance.post('/invoice/fulfillment/authorize', {
      invoice_id,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }

  async function getCampaigns(game_user_id: string): Promise<RespAPI<SuccessCampaigns>> {
    const response = await instance.post('/campaign/available', {
      game_user_id,
    });

    return {
      status: response.status,
      data: response.data,
    };
  }

  async function syncUsersGame(req: SyncUsersReq): Promise<RespAPI<SyncUsersSuccess>> {
    const response = await instance.post('/entity/game/user/autosync', req);

    return {
      status: response.status,
      data: response.data,
    };
  }

  return {
    invoiceGet,
    createOrderPayment,
    createOrderPurchase,
    createOrderFulfillment,
    authorizeFulfillment,
    getCampaigns,
    syncUsersGame,
  };
}
