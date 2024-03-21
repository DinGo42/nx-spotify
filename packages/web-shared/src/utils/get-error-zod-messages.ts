import { z } from "zod";

export const getErrorMessages = <T extends keyof any, K extends z.Schema>({
  errorMessages,
  schema,
}: {
  errorMessages: Record<T, string>;
  schema: K;
}) => {
  const arrayOfErrorMessages = Object.keys(errorMessages) as T[];

  const checkValue = (value: z.infer<K>) => {
    const checksState = schema.safeParse(value);

    if (checksState.success)
      return arrayOfErrorMessages.map((message) => ({ message: errorMessages[message as T], fatal: false }));

    const errorState = checksState.error.errors;

    return arrayOfErrorMessages.map((message) => ({
      message: errorMessages[message as T],
      fatal: errorState.find((error) => error.message === message),
    }));
  };
  return { checkValue };
};
