/* eslint-disable no-unused-vars */
import React from 'react';
import { FaHome, FaLock } from 'react-icons/fa'; // Ensure this path is correct
import i18n from '../i18n.jsx';

export function navigation() {
  return [
    {
      component: 'Group',
      name: 'HOME',
      to: 'HOME',
      items: [
        {
          component: 'Item',
          name: i18n.t('nav.homePage'),
          to: '/HomePage',
        },
        {
          component: 'Item',
          name: 'PrivacyPolicy',
          to: '/PrivacyPolicy',
        },
        {
          component: 'Item',
          name: i18n.t('nav.availableCars'),
          to: '/HomeCars',
        },
        {
          component: 'Item',
          name: 'Blog',
          to: '/Blog',
        },
        {
          component: 'Item',
          name: i18n.t('nav.live'),
          to: '/Live',
        },
        {
          component: 'Item',
          name: i18n.t('nav.friends'),
          to: '/Friends',
        },
        {
          component: 'Item',
          name: i18n.t('nav.leaderboard'),
          to: '/Leaderboard',
        },
      ],
    },
    {
      component: 'Group',
      name: 'AUTHENTICATION',
      to: 'AUTHENTICATION',
      items: [
        {
          component: 'Item',
          name: i18n.t('nav.register'),
          to: '/Register',
        },
        {
          component: 'Item',
          name: i18n.t('nav.login'),
          to: '/Login',
        },
        {
          component: 'Item',
          name: i18n.t('nav.dualLogin'),
          to: '/DualLogin',
        },
      ],
    },
  ];
}

// For backward compatibility, also export a static snapshot
export const navigationStatic = navigation();

