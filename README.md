# solar-card-api-helper

## list of API helpers

### Authentication
- `login()`: `POST /auth/login` - Login using API key.
- `refresh()`: `POST /auth/refresh` - Exchange refresh token for a new access token.

### Individual
- `createIndividual()`: `POST /individuals` - Create an Individual user.
- `getIndividuals()`: `GET /individuals` - Returns all Individuals accessible in the request scope.
- `getIndividualById()`: `GET /individuals/:id` - Returns Individual details by ID.
- `onboardIndividual()`: `POST /individuals/:id/onboard` - Start Individual onboarding process.
- `updateIndividual()`: `PATCH /individuals/:id` - Update individual data.

### KYC
- `kycQuestionnaire()`: `POST /kyc/questionnaire` - Submit AML questionnaire.
- `kycVerification()`: `POST /kyc/id_verification` - Submit ID verification.

### Consent
- `getConsentById()`: `GET /consents/:id` - Get a single consent by id.
- `getConsents()`: `GET /consents` - Get list of approvals.
- `requestConsentByScope()`: `POST /consents` - Request consent for specified scope.
- `requestConsent()`: `POST /consents/:id` - Request explicit approval.

### Event
- `getEvents()`: `GET /events` - Returns all Events.
- `getEventById()`: `GET /events/:id` - Returns Event details by ID.

### Webhook
- `getAccountById()`: `GET /webhooks` - Returns all Webhooks.
- `createWebhook()`: `POST /webhooks` - Create new webhook.
- `deleteWebhook()`: `DELETE /webhooks/:id` - Delete a webhook.

### Account
- `getAccountById()`: `GET /accounts/:id` - Returns payment account by ID.
- `getAccountsByIndividual()`: `GET /accounts` - Returns list of payment accounts.
- `getBankDetails()`: `GET /accounts/:id/bank_details` - Returns payment account details by ID.
- `createAccount()`: `POST /accounts` - Create payment account for an individual.

### Card
- `orderCard()`: `POST /cards` - Order card.
- `getCards()`: GET `/cards` - List of cards.
- `getCardById()`: GET `/cards/:id` - View card.
- `getCardCredentials()`: GET `/cards/:id/credentials` - View card credentials.
- `activateCard()`: POST `/cards/:id/activate` - Activate card.
- `resetCardPin()`: PUT `/cards/:id/pin` - Reset card PIN.
- `updateCard()`: PATCH `/cards/:id` - Update card.
- `applePayTokenization()`: PATCH `/cards/:id` - Apple Pay tokenization.
- `googlePayTokenization()`: PATCH `/cards/:id` - Google Pay tokenization (in closed beta)

## IndividualPaymentMethod 

- `getPaymentMethods()`: GET `/individuals/:individual_id/payment_methods` - List payment methods.
- `addPaymentMethod()`: POST `/individuals/:individual_id/payment_methods` - Add new payment method.
- `chargePaymentMethod()`: POST `/individuals/:individual_id/payment_methods/:id/charge` - Charge payment method.
- `deletePaymentMethod()`: DELETE `/individuals/:individual_id/payment_methods/:id` - Delete payment method.

## Transaction 

- `getTransactions()`: GET `/transactions` - List transactions.
- `getTransactionById()`: GET `/transactions/:id` - Get transaction details by ID.
- `moveMoney()`: POST `/transactions/move` - Transfer money between own accounts.
- `sendMoney()`: POST `/transactions/pay` - Send money to external beneficiaries.

## Guest 

- `getGuestAll()`: GET `/guests` - List guests.
- `createGuest()`: POST `/guests` - Create new guest.

## GuestPaymentMethod Class

- `getPaymentMethods(guest_id)`: GET `/guests/:guest_id/payment_methods` - List payment methods for a specific guest.
- `addGuestPaymentMethod(guest_id)`: POST `/guests/:guest_id/payment_methods` - Add new payment method for a specific guest.
- `chargeGuestPaymentMethod(guest_id, method_id)`: POST `/guests/:guest_id/payment_methods/:id/charge` - Charge a specific payment method of a guest.
- `deleteGuestPaymentMethod(guest_id, method_id)`: DELETE `/guests/:guest_id/payment_methods/:id` - Delete a specific payment method of a guest.

## Simulation 

- `simulateCardPayment()`: POST `/simulations/card_payment` - Simulate card payment.
- `simulate3dsAuth()`: POST `/simulations/three_ds_authentication` - Simulate 3DS authentication.
- `simulateBankTransferAccepted(id)`: POST `/simulations/bank_transfer/:id/accepted` - Simulate transaction status transition (pending -> pending (authorized)).
- `simulateBankTransferSettled(id)`: POST `/simulations/bank_transfer/:id/settled` - Simulate transaction status transition (pending (authorized) -> completed).
- `simulateOnboardingKYC()`: POST `/simulations/onboarding/kyc` - Simulate onboarding KYC data providing.
- `simulateKYCStatusChange()`: POST `/simulations/onboarding/status` - Simulate KYC status change.
- `simulateIdVerification(individual_id)`: POST `/simulations/individuals/:id/identity_verification` - Simulate identity verification.

## Fee 

- `createFee()`: POST `/fees` - Create fee.
- `getFees()`: GET `/fees` - List fees.
- `getFeeById(id)`: GET `/fees/:id` - Get fee by ID.

## CustomerSupport 

- `getTransactionAuditById(id)`: GET `/audit/transactions/:id` - Get limited transaction data without needing Strong Customer Authentication (SCA).

## PendingAction 

- `getPendingActions()`: GET `/pending_actions` - Get list of pending actions.
- `getPendingActionById(id)`: GET `/pending_actions/:id` - Get a specific pending action by ID.