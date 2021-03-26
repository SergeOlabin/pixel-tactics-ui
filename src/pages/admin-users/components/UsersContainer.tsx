import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import useFetch from 'use-http';
import { BASE_URL, HTTP_OPTIONS } from '../../../shared/constants/http-options';
import BasicTable from './Table';
import { IUser } from '../../../shared/types/user-types';

const useStyles = makeStyles((theme) => createStyles({}), {
  name: 'UsersContainer',
});

export interface IUsersContainerProps {}

const UsersContainer: React.FC<IUsersContainerProps> = (props) => {
  const classes = useStyles();

  const [users, setUsers] = useState<IUser[]>([]);

  // const { get, post, response, loading, error } = useFetch(`${BASE_URL}/users`, HTTP_OPTIONS);

  const loadUsers = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      // mode: 'no-cors',
    });
    console.log('response', response);

    const loadedUsers = await response.json();

    console.log('loadedUsers', loadedUsers);
    if (response.ok) setUsers(loadedUsers);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  console.log('users', users);

  return (
    <>
      <BasicTable data={users} />
    </>
  );
};

export default UsersContainer;
