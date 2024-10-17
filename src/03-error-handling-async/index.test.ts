import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue('My value');
    expect(value).toBe('My value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('My error')).toThrow('My error');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect.assertions(1);

    // VERSION 1
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);

    // VERSION 2
    // try {
    //   await rejectCustomError();
    // } catch (error) {
    //   expect(error).toBeInstanceOf(MyAwesomeError)
    // }
  });
});
