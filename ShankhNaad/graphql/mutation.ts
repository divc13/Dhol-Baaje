import { gql } from '@apollo/client';

export const SAVE_TRACK = gql`
mutation trackCreate($track: TrackInput!) {
        trackSave(track: $track) {
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
}
`;

export const MINT_TRACK = gql`
mutation trackCreate($track: TrackInput!) {
        trackMintNft(track: $track) {
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
}
`;

export const DELETE_TRACK = gql`
mutation Delete_Track($id: ID!) {
  trackDelete(id: $id)
}
`;

export const DELETE_LIKED_TRACK = gql`
mutation Delete_Track($id: ID!) {
  likedtracksDelete(id: $id)
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


export const SAVE_USER = gql`
mutation userCreate($user: UserInput!) {
    userSave(user: $user) {
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

export const LIKE_TRACK = gql`
mutation trackLike($track: TrackInput!) {
    likedTracksSave(track: $track) {
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