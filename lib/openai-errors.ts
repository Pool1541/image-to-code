interface OPENAI_ERROR_INTERFACE {
  [key: number]: string;
}

export const OPENAI_ERRORS: OPENAI_ERROR_INTERFACE = {
  401: 'Ingresa una api key válida en la configuración.',
  404: 'Tu cuenta de openai no tiene acceso al modelo necesario para usar la aplicación. Por favor sigue las instrucciones del siguiente enlace para activarlo: https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4.',
  429: 'Actualmente no tienes crédito suficiente en tu cuenta de openai. Por favor verifica el crédito disponible de tu cuenta.',
};
