import { ModalsContextProvider } from '@/context/modalsContext'
import { globalStyles } from '@/lib/stitches/global'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { queryClient } from '@/lib/react-query'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ModalsContextProvider>
          <Component {...pageProps} />
        </ModalsContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}
