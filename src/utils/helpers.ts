import * as jwt from 'jsonwebtoken';
import * as jwks from 'jwks-rsa';
import { promisify } from 'util';

const getKey = promisify(jwks({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://dev-6a34f-yl.auth0.com/.well-known/jwks.json'
}).getSigningKey);

export const verifyJWT = async (token) => {
  const key = await getKey('MjAyOTQwQUQ3OEJCRkFBNkNBNDIzQzNBODgxQzc4RUFCNDBFQTQwRg');

  return jwt.verify(
    token,
    key.getPublicKey(),
    {
      audience: 'https://deegify.dev',
      issuer: 'https://dev-6a34f-yl.auth0.com/',
      algorithms: ['RS256']
    }
  );
}