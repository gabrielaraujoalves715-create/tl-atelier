/// <reference types="node" />
export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    return response.status(405).json({
      success: false,
      message: 'Método não permitido.',
    });
  }

  try {
    const body =
      typeof request.body === 'string'
        ? JSON.parse(request.body)
        : request.body;

    const email = body?.email?.trim().toLowerCase();

    const emailIsValid =
      typeof email === 'string' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      return response.status(400).json({
        success: false,
        message: 'Informe um e-mail válido.',
      });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    if (!apiKey || !Number.isInteger(listId)) {
      return response.status(500).json({
        success: false,
        message: 'Integração não configurada.',
      });
    }

    const brevoResponse = await fetch(
      'https://api.brevo.com/v3/contacts',
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          listIds: [listId],
          updateEnabled: true,
        }),
      },
    );

    if (!brevoResponse.ok) {
      const errorDetails = await brevoResponse.text();

      console.error(
        'Erro ao cadastrar contato no Brevo:',
        brevoResponse.status,
        errorDetails,
      );

      return response.status(502).json({
        success: false,
        message:
          'Não foi possível concluir a inscrição. Tente novamente.',
      });
    }

    return response.status(200).json({
      success: true,
      message: 'Inscrição realizada com sucesso.',
    });
  } catch (error) {
    console.error('Erro na inscrição:', error);

    return response.status(500).json({
      success: false,
      message:
        'Não foi possível concluir a inscrição. Tente novamente.',
    });
  }
}