import React from 'react';

// the values we pass dont really matter as they get overridden in app.js
const authContext = React.createContext({ status: false, login: () => { } });

export default authContext;