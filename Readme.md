# JWT

Currently this is just a repository to play around with different concepts around JWT authentication.
Hopefully one day this could turn into a talk or discussion around authentication around the JWT authentication method.

# Refresh Token

Refresh token has a reference in the DB that is checked where your normal token does not.
Refresh tokens are long lived where normal tokens are not.
The idea is that you automatically refresh the users short lived token and check then if the user still has access to what they should have access to via the database calls. They can then access the application for the next duration of the short lived token until it needs to be refreshed.
This allows you to revoke access to a user but it will only take effect with the next refresh cycle when they do not have access any more.

## Where to store

### Cookies

If your server is hosting everything you could use cookies for storage as this is recommended. Make sure that the cookie is set to be secure and httpOnly. Once you set the httpOnly attribute you should not be able to access that cookie from your Javascript any more but it will be sent to the server via the headers and over https if the secure flag is set.

### Local Storage

If your API is a different server to your website server it would be better to save the cookie in local storage. Purely because if you save it as an httpOnly cookie your API will never get the cookie because it is not on the same domain as the web server.

# Resources

- https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/
- https://auth0.com/docs/jwks
- https://stackoverflow.com/questions/44133536/is-it-safe-to-store-a-jwt-in-localstorage-with-reactjs
- https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
- https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
- https://humanwhocodes.com/blog/2009/05/12/cookies-and-security/
- https://www.oauth.com/oauth2-servers/access-tokens/
- https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
- https://medium.com/google-cloud/understanding-oauth2-and-building-a-basic-authorization-server-of-your-own-a-beginners-guide-cf7451a16f66


