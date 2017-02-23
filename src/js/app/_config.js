module.exports = function (grunt, dest, name) {
    return {
        umd: {
            amdModuleId: 'app',
            deps: {
                'default': [{'jquery': '$'}],
                global: ['jQuery']
            }
        }
    };
};
