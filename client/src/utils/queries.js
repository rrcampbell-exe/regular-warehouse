import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      username
      email
    }
  }
`;

export const QUERY_ITEM = gql`
  query item($partNumber: String!) {
    item(part_number: $partNumber) {
      name
      part_number
      quantity
    }
  }
`;

export const QUERY_ALL_ITEMS = gql`
  query items {
    items {
      name
      part_number
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      username
      email
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query users {
    users {
      username
      email
    }
  }
`;
