import React, { Suspense } from 'react';

import { Flex } from '@chakra-ui/react';

import AppSettingsProvider from './context/appsettings';
import PubSubProvider from './context/pubsub';
import PlayerProvider from './context/player';
import Router from './router';

function App() {
  return (
    <PubSubProvider>
      <PlayerProvider>
        <AppSettingsProvider>
          <Flex
            align="center"
            direction="row"
            id="routes"
            justify="center"
            w="100%"
          >
            <Router />
          </Flex>
        </AppSettingsProvider>
      </PlayerProvider>
    </PubSubProvider>
  );
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp() {
  return (
    <Suspense fallback="Loading ...">
      <App />
    </Suspense>
  );
}
