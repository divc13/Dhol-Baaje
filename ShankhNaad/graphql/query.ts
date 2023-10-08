import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query FindUSER{
    userFindAll {
        id
        subjectId
        username
        wallet {
            id
            subjectId
            name
            walletId
            address
            publicKey
            balance
            assets {
                    id
                subjectId
                name
                fingerprint
                policyId
                quantity
                metadata
                assetSubjectId
                logosphereId
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        createdAt
        updatedAt
        subscriptionEndDate
    }
    }
`;

export const GET_ALL_SONGS = gql`
    query GetAllSongs {
        trackFindAll{
            id
            subjectId
            key
            title
            subtitle
            username 
            music
            image
            likes
            n_listens
            description
            album
            value
            purchasable
            createdAt
            updatedAt
        }
    }
`;

export const GET_ALL_WALLETS = gql`
    query GetAllWallet{
        walletFindAll{
            id
            subjectId
            name
            walletId
            address
            publicKey
            balance
            assets {
                id
                subjectId
                name
                fingerprint
                policyId
                quantity
                metadata
                assetSubjectId
                logosphereId
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`;

export const GET_LIKED_TRACK = gql`
query trackLikedAll {
    likedTracksFindAll {
        track{
            id
            subjectId
            key
            title
            subtitle
            username
            music
            image
            likes
            n_listens
            description
            album
            value
            purchasable
            nftCardanoTxId
            createdAt
            updatedAt
        }
    user{
        id
        subjectId
        username
        wallet {
            id
            subjectId
            name
            walletId
            address
            publicKey
            balance
            assets {
                    id
                subjectId
                name
                fingerprint
                policyId
                quantity
                metadata
                assetSubjectId
                logosphereId
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        createdAt
        updatedAt
    }
}
}
`;