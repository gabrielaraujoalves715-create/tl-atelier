/// <reference types="node" />

export default async function handler(request: any, response: any) {
  if (request.method !== "POST") {
    return response.status(405).json({
      success: false,
      message: "Método não permitido.",
    });
  }

  try {
    const body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body;

    const name =
      typeof body?.name === "string"
        ? body.name.replace(/\s+/g, " ").trim()
        : "";

    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    const rawPhone =
      typeof body?.phone === "string" ? body.phone.replace(/\D/g, "") : "";

    const consent = body?.consent === true;

    const nameIsValid =
      name.length >= 3 && name.length <= 120 && name.includes(" ");

    const emailIsValid =
      email.length <= 160 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    let nationalPhone = rawPhone;

    if (nationalPhone.startsWith("0055")) {
      nationalPhone = nationalPhone.slice(4);
    } else if (nationalPhone.startsWith("55") && nationalPhone.length >= 12) {
      nationalPhone = nationalPhone.slice(2);
    }

    const phoneIsValid =
      nationalPhone.length === 10 || nationalPhone.length === 11;

    if (!nameIsValid) {
      return response.status(400).json({
        success: false,
        message: "Informe seu nome e sobrenome.",
      });
    }

    if (!phoneIsValid) {
      return response.status(400).json({
        success: false,
        message: "Informe um telefone ou WhatsApp válido com DDD.",
      });
    }

    if (!emailIsValid) {
      return response.status(400).json({
        success: false,
        message: "Informe um e-mail válido.",
      });
    }

    if (!consent) {
      return response.status(400).json({
        success: false,
        message: "É necessário autorizar o recebimento das comunicações.",
      });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = Number(process.env.BREVO_LIST_ID);

    if (!apiKey || !Number.isInteger(listId)) {
      return response.status(500).json({
        success: false,
        message: "Integração não configurada.",
      });
    }

    const nameParts = name.split(/\s+/);
    const firstName = nameParts.shift() || name;
    const lastName = nameParts.join(" ");
    const internationalPhone = `+55${nationalPhone}`;

    const attributes: Record<string, string> = {
      FIRSTNAME: firstName,
      SMS: internationalPhone,
    };

    if (lastName) {
      attributes.LASTNAME = lastName;
    }

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const errorDetails = await brevoResponse.text();

      console.error(
        "Erro ao cadastrar contato no Brevo:",
        brevoResponse.status,
        errorDetails,
      );

      return response.status(502).json({
        success: false,
        message: "Não foi possível concluir o cadastro. Tente novamente.",
      });
    }

    return response.status(200).json({
      success: true,
      message: "Cadastro realizado com sucesso.",
    });
  } catch (error) {
    console.error("Erro no cadastro:", error);

    return response.status(500).json({
      success: false,
      message: "Não foi possível concluir o cadastro. Tente novamente.",
    });
  }
  }