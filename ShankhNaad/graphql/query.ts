import { gql } from '@apollo/client';

export const GET_USER_WITH_USERNAME = gql`
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
            owner {
                    id
                subjectId
                email
                image
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
            music
            image
            likes
            dislikes
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