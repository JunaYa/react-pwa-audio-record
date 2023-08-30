'use client';

import '@rainbow-me/rainbowkit/styles.css'
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit' // eslint-disable-line import/no-extraneous-dependencies
import { configureChains, createConfig, WagmiConfig } from 'wagmi' // eslint-disable-line import/no-extraneous-dependencies
import { polygon, polygonMumbai } from 'wagmi/chains' // eslint-disable-line import/no-extraneous-dependencies
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public' // eslint-disable-line import/no-extraneous-dependencies
import { injectedWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets' // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';

const projectId = '17557b1e86e0cb2f1a007a122223ddbf'
const { chains, publicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider(), alchemyProvider({ apiKey: '-vuQwOyv-yfGCvCQ_b1I89Oxk1tNXiYi' })],
)

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({
        chains,
        projectId,
        version: '2',
      }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}