import { useEnv } from '@directus/env';
import { toArray } from '@directus/utils';
export function getAuthProviders({ sessionOnly } = { sessionOnly: false }) {
    const env = useEnv();
    let providers = toArray(env['AUTH_PROVIDERS']).filter((provider) => provider && env[`AUTH_${provider.toUpperCase()}_DRIVER`]);
    if (sessionOnly) {
        providers = providers.filter((provider) => {
            const driver = env[`AUTH_${provider.toUpperCase()}_DRIVER`];
            // only the following 3 drivers require a mode selection
            if (['oauth2', 'openid', 'saml'].includes(driver)) {
                const mode = env[`AUTH_${provider.toUpperCase()}_MODE`];
                // if mode is not defined it defaults to session
                return !mode || mode === 'session';
            }
            return true;
        });
    }
    return providers.map((provider) => ({
        name: provider,
        label: env[`AUTH_${provider.toUpperCase()}_LABEL`],
        driver: env[`AUTH_${provider.toUpperCase()}_DRIVER`],
        icon: env[`AUTH_${provider.toUpperCase()}_ICON`],
    }));
}
