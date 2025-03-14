'use client';

import { clusterApiUrl, Connection } from '@solana/web3.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { createContext, ReactNode, useContext } from 'react';
import toast from 'react-hot-toast';

export interface Cluster {
    name: string;
    endpoint: string;
    network?: ClusterNetwork;
    active?: boolean;
}

export enum ClusterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet',
    Custom = 'custom',
}

// Define default clusters
export const defaultClusters: Cluster[] = [
    { name: 'devnet', endpoint: clusterApiUrl('devnet'), network: ClusterNetwork.Devnet },
    { name: 'local', endpoint: 'http://localhost:8899' },
    { name: 'testnet', endpoint: clusterApiUrl('testnet'), network: ClusterNetwork.Testnet },
];

// Define atoms for state management
const clusterAtom = atomWithStorage<Cluster>('solana-cluster', defaultClusters[0]);
const clustersAtom = atomWithStorage<Cluster[]>('solana-clusters', defaultClusters);

const activeClustersAtom = atom<Cluster[]>((get) => {
    const clusters = get(clustersAtom);
    const cluster = get(clusterAtom);
    return clusters.map((item) => ({
        ...item,
        active: item.name === cluster.name,
    }));
});

const activeClusterAtom = atom<Cluster>((get) => {
    const clusters = get(activeClustersAtom);
    return clusters.find((item) => item.active) || clusters[0];
});

// Define context for ClusterProvider
export interface ClusterProviderContext {
    cluster: Cluster;
    clusters: Cluster[];
    addCluster: (cluster: Cluster) => void;
    deleteCluster: (cluster: Cluster) => void;
    setCluster: (cluster: Cluster) => void;
    getExplorerUrl(path: string): string;
}

const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext);

// Define ClusterProvider
export default function ClusterProvider({ children }: { children: ReactNode }) {
    const cluster = useAtomValue(activeClusterAtom);
    const clusters = useAtomValue(activeClustersAtom);
    const setCluster = useSetAtom(clusterAtom);
    const setClusters = useSetAtom(clustersAtom);

    const value: ClusterProviderContext = {
        cluster,
        clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
        addCluster: (cluster: Cluster) => {
            try {
                new Connection(cluster.endpoint); // Validate connection
                setClusters([...clusters, cluster]);
            } catch (err) {
                toast.error(`${err}`);
            }
        },
        deleteCluster: (cluster: Cluster) => {
            setClusters(clusters.filter((item) => item.name !== cluster.name));
        },
        setCluster: (cluster: Cluster) => setCluster(cluster),
        getExplorerUrl: (path: string) =>
            `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Hook to use the ClusterProvider context in components
export function useCluster() {
    return useContext(Context);
}

// Helper function for constructing URL parameters
function getClusterUrlParam(cluster: Cluster): string {
    let suffix = '';
    switch (cluster.network) {
        case ClusterNetwork.Devnet:
            suffix = '?cluster=devnet';
            break;
        case ClusterNetwork.Mainnet:
            suffix = '';
            break;
        case ClusterNetwork.Testnet:
            suffix = '?cluster=testnet';
            break;
        default:
            suffix = `?cluster=custom&customUrl=${encodeURIComponent(cluster.endpoint)}`;
            break;
    }
    return suffix;
}