# Growtask Marketplace

Тестовое задание: маркетплейс на Vue 3 — корзина, оформление заказа и статус заказа.

## Стек

- **Vue 3** (Composition API) + **TypeScript**
- **Vite**
- **Pinia** — состояние корзины и оформления заказа
- **Vue Router** — маршруты `/cart`, `/checkout`, `/checkout/success`
- **vee-validate + zod** — валидация формы заказа
- **SCSS** (модули, токены, брейкпоинты 414 / 768 / 1366 / 1920)
- pnpm

## Запуск

```bash
pnpm install
pnpm dev        # dev-сервер на http://localhost:5173
```

Продакшен-сборка:

```bash
pnpm build      # проверка типов + сборка в dist/
pnpm preview    # локальный просмотр собранной версии
```

## Тесты

### Unit и интеграционные (Vitest)

Тестируют форму оформления заказа: zod-схему валидации, компоненты формы и полный флоу сабмита (ошибки, payload заказа, редирект).

```bash
pnpm test          # разовый прогон
pnpm test:watch    # watch-режим
```

### Скриншот-тесты (Playwright)

3 страницы (корзина, оформление заказа, заказ оформлен) на 4 вьюпортах — desktop 1920, laptop 1366, tablet 768, mobile 414. API замокан, корзина сеется через sessionStorage, поэтому скриншоты детерминированы. Базлайны лежат в `e2e/*.spec.ts-snapshots/`.

```bash
pnpm test:screenshots          # сравнение с базлайнами
pnpm test:screenshots:update   # перегенерация базлайнов
```

При первом запуске нужен установленный браузер:

```bash
pnpm exec playwright install chromium
```

Diff упавших тестов открывается через `pnpm exec playwright show-trace test-results/<папка>/trace.zip` или в HTML-отчёте.

## Прочее

```bash
pnpm lint       # ESLint
pnpm format     # Prettier
```
