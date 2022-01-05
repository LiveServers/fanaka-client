import { gql } from '@apollo/client';

const CARD_DATA_QUERY = gql `
    query CardData {
        cardData @client {
            text
            path
        }
    }`;

export default CARD_DATA_QUERY;