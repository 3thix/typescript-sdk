export type SuccessCreateOrder = {
  invoice_id: string;
};

export interface Error3thix {
  error_code: string;
  message: string;
}

export type Order = {
  id: string;
  fulfillment_game_user_id: null | string;
  fulfillment_entity_id: string;
  game_entity_id: string;
  type: string;
  destination_rail: string;
  destination_currency: string;
  destination_amount: string;
  destination_fees: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type Fulfillment = {
  id: string;
  order_id: string;
  game_entity_id: string;
  fulfillment_entity_id: string;
  source_account_id: string;
  destination_account_id: string;
  rail: string;
  currency: string;
  amount: string;
  destination_rail: string;
  destination_currency: string;
  destination_amount: string;
  destination_total: string;
  destination_fees: string;
  fee_transfer_id: string;
  transfer_id: null | string;
  status: string;
  error_msg: null | string;
  created_at: string;
  updated_at: string;
};

export type Invoice = {
  id: string;
  order_id: string;
  game_entity_id: string;
  destination_account_id: string;
  rail: string;
  currency: string;
  amount: string;
  fees: string;
  claimant_entity_id: string;
  status: string;
  error_msg: null | string;
  created_at: string;
  updated_at: string;
};

export type SuccessGetInvoice = {
  invoice: Invoice;
  order: Order;
  fulfillments: Fulfillment[];
};

export type Campaign = {
  id: string;
  title: string;
  vast_base64?: string;
  type: 'WELCOME_BONUS' | 'ADS';
  reward: {
    amount: string;
    currency: string;
  };
  assets?: {
    type: 'logo';
    url: string;
  }[];
  complete_campaign_url?: string;
};

export type SuccessCampaigns = Campaign[];

export type Cart = CartItem[];

export type CartItem = {
  currency: string;
  rail: string;
  amount: string;
};

export type SyncUsersReq = {
  users: UserDetails[];
};

export type UserDetails = {
  third_party_id: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
};

export type SyncUsersSuccess = {
  entities_created: {
    entity_id: string;
    third_party_id: string;
  }[];
};
