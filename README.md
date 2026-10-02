# ЦППУ — новый сайт

React (JS) + Firebase + ИИ-помощник.

## Стек
- React 18 (CRA)
- React Router 6
- Firebase (Firestore, Auth, Storage, Functions)
- Axios

## Установка
1. `npm install`
2. Заполнить `.env` ключами Firebase и адресом Cloud Function.
3. `npm start` — локальный запуск.
4. `npm run build` — продакшн-сборка.

## Firebase
- Firestore: коллекции `leads`, `training_requests`, `callbacks`, `reviews`, `chat_sessions`, `media`, `vacancies`.
- Auth: e-mail/password для админ-панели.
- Functions: эндпоинт `chat` для ИИ-помощника.

## Деплой
1. `firebase login`
2. `firebase init` (Firestore + Hosting + Functions, если нужно)
3. `npm run build && firebase deploy`

## ИИ-помощник
- Cloud Function `chat` проксирует запросы к OpenAI.
- Ключ `OPENAI_API_KEY` задаётся через `firebase functions:config:set` или Secrets.