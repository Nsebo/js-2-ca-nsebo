const {resolve} = require('path');

export default {
    build: {
        rollupOptions:{
            input:{
                home: resolve(__dirname, 'index.html'),
                signUp: resolve(__dirname, 'signup.html'),
                logIn: resolve(__dirname, 'login.html'),
                postPage: resolve(__dirname, 'post-page.html'),
                welcomePage: resolve(__dirname, 'welcome-page.html'),
                singlePost: resolve(__dirname, 'single-post.html'),
            },
        },
    },
};