import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

// Аутентифікація користувача
export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  } // перевірка наявності токена

  const session = await Session.findOne({ accessToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  } // перевірка існування сесії

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  } // перевірка терміну дії токена

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401);
  } // перевірка існування користувача

  req.user = user; // додавання користувача до запииту
  next();
};
