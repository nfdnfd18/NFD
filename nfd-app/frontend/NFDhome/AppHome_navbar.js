/* eslint-disable no-unused-vars */
import React from 'react';
import { FaHome, FaLock } from 'react-icons/fa'; // Ensure this path is correct
import i18n from '../i18n.jsx';

export function navigation() {
  return [
    {
      component: 'Group',
      name: i18n.t('nav.HOME'),
      to: 'HOME',
      items: [
        {
          component: 'Item',
          name: i18n.t('nav.homePage'),
          to: '/HomePage',
        },
        {
          component: 'Item',
          name: i18n.t('nav.availableCars'),
          to: '/HomeCars',
        },
        {
          component: 'Item',
          name: i18n.t('nav.privacyPolicy'),
          to: '/nfdcopy',
        },
        {
          component: 'Item',
          name: i18n.t('nav.blog'),
          to: '/nfdcopy',
        },
        {
          component: 'Item',
          name: i18n.t('nav.live'),
          to: '/nfdcopy',
        },
        {
          component: 'Item',
          name: i18n.t('nav.friends'),
          to: '/nfdcopy',
        },
        {
          component: 'Item',
          name: i18n.t('nav.leaderboard'),
          to: '/nfdcopy',
        },
      ],
    },
    {
      component: 'Group',
      name: i18n.t('nav.authentication'),
      to: 'AUTHENTICATION',
      items: [
        {
          component: 'Item',
          name: i18n.t('nav.register'),
          to: '/register',
        },
        {
          component: 'Item',
          name: i18n.t('nav.login'),
          to: '/login',
        },
        {
          component: 'Item',
          name: i18n.t('nav.dualLogin'),
          to: '/dualLogin',
        },
      ],
    },
  ];
}

export const navigationStatic = navigation();

