import React from 'react'
import { Route, HashRouter, Routes } from 'react-router-dom'

import Cards from './components/Cards';
import Library from './components/Library';
import Navigation from './components/Navigation';
import Player from './components/Player'
import Settings from './components/Settings'

import { Box } from '@chakra-ui/react';

const Router = () => {
  return (
    <HashRouter>
      <Box
        w="100%"
        maxW="1200px"
        mx="auto"
        mb="64px"
        px={{ base: 4, md: 6 }}
      >
        <Routes>
          <Route
            index
            element={<Player/>}
            exact
          />
          <Route
            path="library/*"
            element={<Library/>}
          />
          <Route
            path="cards/*"
            element={<Cards/>}
          />
          <Route
            path="settings/*"
            element={<Settings/>}
            exact
          />
        </Routes>
      </Box>
      <Navigation />
    </HashRouter>
  );
}

export default Router;
