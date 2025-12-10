/* eslint-disable no-unused-vars */
import React from 'react';
import { FaHome, FaLock } from 'react-icons/fa'; // Ensure this path is correct
import i18n from '../i18n.jsx';

export function navigation() {
  return [
    {
      component: 'Group',
      name: i18n.t('nav.RequireNormalUSERAuth', { ns: 'RequireNormalUSERAuth', defaultValue: 'Require Normal User Auth' }),
      to: 'RequireNormalUSERAuth',
      items: [
        {
          component: 'Item',
          name: i18n.t('nav.myProfile', { ns: 'RequireNormalUSERAuth', defaultValue: 'My Profile' }),
          to: '/RequireNormalUSERAuth/MyProfile',
        },
        {
          component: 'Item',
          name: i18n.t('nav.myBooking', { ns: 'RequireNormalUSERAuth', defaultValue: 'My Booking' }),
          to: '/RequireNormalUSERAuth/MyBooking',
        },
        {
          component: 'Item',
          name: i18n.t('nav.support', { ns: 'RequireNormalUSERAuth', defaultValue: 'Support' }),
          to: '/RequireNormalUSERAuth/MySupport',
        },
      ],
    },
    {
      component: 'Group',
      name: i18n.t('nav.NFDSocialMedia', { ns: 'RequireNormalUSERAuth', defaultValue: 'NFD Social Media' }),
      to: 'NFD Social Media',
      items: [
        {
          component: 'Item',
          name: i18n.t('nav.blog', { ns: 'RequireNormalUSERAuth', defaultValue: 'Blog' }),
          to: '/RequireNormalUSERAuth/Blog',
        },
        {
          component: 'Item',
          name: i18n.t('nav.friends', { ns: 'RequireNormalUSERAuth', defaultValue: 'Friends' }),
          to: '/RequireNormalUSERAuth/Friends',
        },
        {
          component: 'Item',
          name: i18n.t('nav.live', { ns: 'RequireNormalUSERAuth', defaultValue: 'Live' }),
          to: '/RequireNormalUSERAuth/Live',
        },
      ],
    },
  ];
}

export const navigationStatic = navigation();

