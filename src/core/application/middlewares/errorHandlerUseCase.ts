import { CustomError, ServerError } from '../..';

// Error mannager use Case
export const errorHandlerUseCase = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new ServerError();
    }
  };
  return descriptor;
};
