import React, { createContext } from 'react'

export const userContext = createContext(localStorage.getItem('academy-user'))