import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const toHash = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

const isValid = async (
  storedPassword: string,
  providedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(providedPassword, storedPassword);
};

export const PasswordManager = {
  toHash,
  isValid,
};
