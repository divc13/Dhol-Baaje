import { gql } from '@apollo/client';

export const SAVE_TRACK = gql`
mutation trackCreate($track: TrackInput!) {
        trackSave(track: $track) {
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
        nftCardanoTxId
        createdAt
        updatedAt
    }
}
`;

export const DELETE_TRACK = gql`
mutation Delete_Track($id: ID!) {
  trackDelete(id: $id)
}
`;

export const SAVE_WALLET = gql`
mutation walletCreate($wallet: WalletInput!) {
    walletSave(wallet: $wallet) {
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
