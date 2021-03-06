import NextI18Next from 'next-i18next';
import * as path from 'path';

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANG || 'en',
  localePath: path.resolve('./public/static/locales'),
  otherLanguages: [],
});

export const { appWithTranslation, useTranslation, withTranslation } = NextI18NextInstance;

export default NextI18NextInstance;
