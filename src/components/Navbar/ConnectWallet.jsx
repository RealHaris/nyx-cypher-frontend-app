import '../../polyfills'
import '@rainbow-me/rainbowkit/styles.css'
import React, { useContext } from 'react'
import { darkTheme, getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider, useAccount } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { ThemeContext } from '../Themecomponent/ThemeContext'
import { useSharedState } from '../../SharedStateProvider'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

if (!import.meta.env.VITE_WALLETCONNECT_PROJECT_ID) {
  // eslint-disable-next-line no-console
  console.warn('VITE_WALLETCONNECT_PROJECT_ID is not set. Add it to your .env for WalletConnect.')
}

const config = getDefaultConfig({
  appName: 'NYX Trading',
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base]
})

const queryClient = new QueryClient()

const WalletStatusBridge = ({ className }) => {
  const { isConnected, address } = useAccount()
  const { theme } = useContext(ThemeContext)
  const { updateWalletConnection } = useSharedState()

  React.useEffect(() => {
    updateWalletConnection(isConnected, address || '')
  }, [isConnected, address, updateWalletConnection])

  return (
    <RainbowKitProvider chains={config.chains} theme={theme === 'dark' ? darkTheme() : undefined}>
      <div className={className}>
        <ConnectButton />
      </div>
    </RainbowKitProvider>
  )
}

const ConnectWallet = ({ className }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <WalletStatusBridge className={className} />
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default ConnectWallet


