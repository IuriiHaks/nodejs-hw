import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

// Реєстрація користувача
export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(400, 'Email is already in use');
  }

  // Хешуємо пароль
  const hashedPassword = await bcrypt.hash(password, 10);

  // Створюємо користувача
  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

// Логін користувача
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);
  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

// Вихід користувача
export const logOutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

// Оновлення токенів
export const refreshUserSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isRefreshTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({ _id: sessionId, refreshToken });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({ message: 'Session refreshed' });
};
