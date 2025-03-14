'use client';
import './globals.css';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { UiLayout } from '@/components/ui/ui-layout';
import ReactQueryProvider from './react-query-provider';
import ClusterProvider, { useCluster } from '@/components/cluster/cluster-data-access';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // Ensure `ClusterProvider` is providing context before accessing useCluster
    return (
        <html>
        <body>
        <ReactQueryProvider>
            <ClusterProvider>
                <SolanaProvider>
                    <ClusterConsumerLayout>{children}</ClusterConsumerLayout>
                </SolanaProvider>
            </ClusterProvider>
        </ReactQueryProvider>
        </body>
        </html>
    );
}

function ClusterConsumerLayout({ children }: { children: React.ReactNode }) {
    const { cluster } = useCluster(); // Access the cluster context after being initialized

    // Handle undefined cluster gracefully
    const links = [
        { label: 'Home', path: '/' },
        { label: 'Account', path: '/account' },
        {
            label: `Cluster: ${cluster?.name || 'Unknown'}`,
            path: `/clusters/${cluster?.name || ''}`,
        },
    ];

    return <UiLayout links={links}>{children}</UiLayout>;
}