import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { FC } from "react";
import { CacheProvider } from '@emotion/react';
import '../../styles/globals.css';
import {wrapper} from '../store';
import createEmotionCache from '../cache';
import AuthProviders from '@/components/auth/security/Providers';

const clientSideEmotionCache = createEmotionCache();

const App: FC<AppProps> = ({Component, ...rest}: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    const { emotionCache = clientSideEmotionCache, pageProps } = props;
    return  <Provider store={store}>
                <CacheProvider value={emotionCache}>
                    <AuthProviders>
                        <Component {...pageProps} />
                    </AuthProviders>
                </CacheProvider>
            </Provider>
}

export default App