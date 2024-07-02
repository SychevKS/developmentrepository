import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9001',
  realm: 'developrepository',
  clientId: 'client',
});

export default keycloak;
