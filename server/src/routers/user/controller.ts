import bcrypt from "bcrypt";

const SALT = bcrypt.genSaltSync(10);

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, SALT);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
