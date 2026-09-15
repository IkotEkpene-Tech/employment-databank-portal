// The backend reveals the raw access code exactly once (it's stored
// encrypted at rest and cleared server-side after the first successful
// read via GET /employment-access/payment-status). We cache it here so the
// dashboard can still show/copy it later in the same browser, scoped per
// user so switching accounts on the same device can't leak it.
const keyFor = (userId: string) => `edp_access_code_${userId}`;

export const accessCodeCache = {
  get: (userId: string): string | null => localStorage.getItem(keyFor(userId)),
  set: (userId: string, code: string) => localStorage.setItem(keyFor(userId), code),
  clear: (userId: string) => localStorage.removeItem(keyFor(userId)),
};
