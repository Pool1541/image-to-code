type UserDataType = { count: number; windowStart: number };

const userRequestData = new Map<string, UserDataType>(); // keeps track of individual users
const DEFAULT_WINDOW_SIZE = 1000 * 60 * 60 * 24; // 1 day
const INITIAL_REQUEST_COUNT = 1;
const DEFAULT_MAX_REQUESTS = 3;
const AUTHENTICATED_USER_MAX_REQUESTS = 10;

const rateLimiter = {
  windowSize: DEFAULT_WINDOW_SIZE,
  maxRequests: DEFAULT_MAX_REQUESTS,
};

export function limit(ip: string, isAutenticated: boolean) {
  const now = Date.now();

  rateLimiter.maxRequests = isAutenticated ? AUTHENTICATED_USER_MAX_REQUESTS : DEFAULT_MAX_REQUESTS;

  if (!userRequestData.has(ip)) {
    // Initialize request count and window start time for a new IP
    userRequestData.set(ip, { count: INITIAL_REQUEST_COUNT, windowStart: now });
    return false;
  }

  const userData = userRequestData.get(ip)!;

  const isNewWindow = now - userData.windowStart > rateLimiter.windowSize;

  if (isNewWindow) {
    // Reset request count and window start time if the window has expired
    userRequestData.set(ip, { count: INITIAL_REQUEST_COUNT, windowStart: now });
    return false;
  }

  // Check and update current request limits
  if (userData.count >= rateLimiter.maxRequests) return true;

  userData.count += 1;
  userRequestData.set(ip, userData);

  return false;
}
