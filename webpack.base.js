module.exports = {
      //tell webpack to run every file it runs through
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                //tell webpack not to run babel on certain directories
                exclude : /node_modules/,
                //options that we pass along to the babel loadder
                //rules followed by babel to transpile the code
                options: {
                    presets: [
                        //take all jsx and convert it to normal js function calls
                        'react',
                        // used to handle async code
                        'stage-0',
                        // run all diff transform rules needed for last 2 versions
                        ['env', {targets: {browsers : ['last 2 versions']}}]

                    ]
                }
            }
        ]
    }

};