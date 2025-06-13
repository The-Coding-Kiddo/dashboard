import { Buffer } from 'node:buffer';

export interface SifaloPayPaymentDetails {
  account: string;
  gateway: string;
  amount: string;
  currency: string;
  order_id: string;
}

export async function initiatePayment(paymentDetails: SifaloPayPaymentDetails) {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.sifalopayApiKey;
  const username = runtimeConfig.sifalopayUsername;

  if (!apiKey || !username) {
    console.error('SifaloPay API key or username is not configured in environment variables.');
    throw new Error('SifaloPay API credentials are not configured.');
  }

  const credentials = `${username}:${apiKey}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  const apiUrl = 'https://api.sifalopay.com/gateway/';

  try {
    const response = await $fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json',
      },
      body: paymentDetails,
    });
    return response;
  } catch (error: any) {
    console.error('Error initiating SifaloPay payment:', error.response?._data || error.message);
    // Rethrow or return a structured error object
    throw new Error(`SifaloPay API request failed: ${error.message}`);
  }
}
