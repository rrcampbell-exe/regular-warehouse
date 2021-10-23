import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($name: String!, $part_number: String!, $quantity: Int!) {
    addItem(name: $name, part_number: $part_number, quantity: $quantity) {
      _id
      name
      part_number
      quantity
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($name: String!, $part_number: String!, $quantity: Int!) {
    updateItem(name: $name, part_number: $part_number, quantity: $quantity) {
      _id
      name
      part_number
      quantity
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($part_number: String!) {
    deleteItem(part_number: $part_number) {
      _id
      name
      part_number
      quantity
    }
  }
`;


