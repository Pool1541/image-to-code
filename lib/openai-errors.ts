interface OPENAI_ERROR_INTERFACE {
  [key: number]: string;
}

export const OPENAI_ERRORS: OPENAI_ERROR_INTERFACE = {
  401: 'La api key está vacia o es inválida',
};