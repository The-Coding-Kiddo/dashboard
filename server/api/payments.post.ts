import { initiatePayment, type SifaloPayPaymentDetails } from '~/server/utils/sifalopay';

export default defineEventHandler(async (event) => {
  try {
    // Read the body of the request
    const body = await readBody<SifaloPayPaymentDetails>(event);

    // Basic validation (can be expanded)
    if (!body || !body.account || !body.gateway || !body.amount || !body.currency || !body.order_id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request: Missing required payment details.',
      });
    }

    // Call the SifaloPay utility function
    const paymentResponse = await initiatePayment(body);

    // Return the response from SifaloPay
    return {
      statusCode: 200,
      message: 'Payment initiation successful',
      data: paymentResponse,
    };

  } catch (error: any) {
    // Log the error for server-side debugging
    console.error('Error in /api/payments.post.ts:', error.message);

    // Determine if it's a known error structure from SifaloPay or our validation
    if (error.message.includes('SifaloPay API request failed') || error.statusCode === 400) {
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Failed to initiate payment.',
        data: error.data, // Include additional error data if available
      });
    }

    // For unknown errors, return a generic server error
    throw createError({
      statusCode: 500,
      statusMessage: 'An unexpected error occurred while processing the payment.',
    });
  }
});
