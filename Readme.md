# JWT

Currently this is just a repository to play around with different concepts around JWT authentication.
Hopefully one day this could turn into a talk or discussion around authentication around the JWT authentication method.

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
