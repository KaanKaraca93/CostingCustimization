/**
 * PLM/ION API Configuration
 * OAuth2.0 credentials for Infor CloudSuite
 */

const PLM_CONFIG = {
  // Tenant Information
  tenantId: 'ATJZAMEWEF5P4SNV_PRD',
  clientName: 'BackendServisi',
  
  // OAuth2.0 Credentials
  clientId: 'ATJZAMEWEF5P4SNV_PRD~zWbsEgkMBlqdSXoSAXBiM8V1POA0-2Mkn1qkORhxma0',
  clientSecret: 'Ll2ehfOJ14uXzyLwR-6BIUmnQNFfhSFRadOzhfzIgK8DBs0x8_AQ3vqbiNrCVOfTyN3_v_Vyf1Yq4WMA7F68hg',
  
  // Service Account Keys
  serviceAccountAccessKey: 'ATJZAMEWEF5P4SNV_PRD#fAzHs-Kdtut0xOXsRx1rnc4kB9icdTJ25HPE65-3-Q0G477cLbXRgPOsL0JjhQCA2VlgbJvK400_9ZaezhMKIQ',
  serviceAccountSecretKey: 'Bd7aqwQd7K8Xw8uMLffxlNrM8oROajrY18EVpPalakqECxXs5HzFzZoT45JBKtUGZvfacr8bCrgCmgscu71rTA',
  
  // URLs
  ionApiUrl: 'https://mingle-ionapi.eu1.inforcloudsuite.com',
  providerUrl: 'https://mingle-sso.eu1.inforcloudsuite.com:443/ATJZAMEWEF5P4SNV_PRD/as/',
  
  // OAuth2.0 Endpoints
  endpoints: {
    authorization: 'authorization.oauth2',
    token: 'token.oauth2',
    revoke: 'revoke_token.oauth2'
  },
  
  // Other
  delegationType: '12',
  version: '1.1',
  eventVersion: 'V1480769020'
};

module.exports = PLM_CONFIG;

