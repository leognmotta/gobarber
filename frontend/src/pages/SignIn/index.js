import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid.')
    .required(),
  password: Yup.string()
    .min(6, 'password should be at least 6 characters')
    .required(),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your email" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send!'}
        </button>

        <Link to="/signup">Not registered?</Link>
      </Form>
    </>
  );
}
