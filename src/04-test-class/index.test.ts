import {
  // BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const accountA = getBankAccount(100);
  const accountB = getBankAccount(100);

  test('should create account with initial balance', () => {
    expect(accountA.getBalance()).toEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => accountA.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => accountA.transfer(200, accountB)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => accountA.transfer(200, accountA)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    accountA.deposit(50);
    expect(accountA.getBalance()).toEqual(150);
  });

  test('should withdraw money', () => {
    accountA.withdraw(50);
    expect(accountA.getBalance()).toEqual(100);
  });

  test('should transfer money', () => {
    accountA.transfer(50, accountB);
    expect(accountA.getBalance()).toEqual(50);
    expect(accountB.getBalance()).toEqual(150);
  });

  // test('fetchBalance should return number in case if request did not failed', async () => {
  //   const spy = jest
  //     .spyOn(BankAccount, 'requestFailed')
  //     .mockReturnValueOnce(false);

  //   return accountA
  //     .fetchBalance()
  //     .then((data) => expect(typeof data).toBe('number'));
  // });

  test('should set new balance if fetchBalance returned number', async () => {
    accountA.fetchBalance = jest.fn(() => Promise.resolve(20));
    const currentBalance = accountA.getBalance();

    await accountA.synchronizeBalance();
    const nextBalance = accountA.getBalance();

    expect(accountA.fetchBalance).toHaveBeenCalled();
    expect(nextBalance).not.toEqual(currentBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    accountA.fetchBalance = jest.fn(() => Promise.resolve(null));
    await expect(accountA.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
