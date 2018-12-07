const gulp = require('gulp'),
     nodmon = require('gulp-nodemon');

    //  gulp.task('default',function(){
         
    //     nodmon({
    //         script:'app.js',
    //         ext:'js',
    //         env:{

    //             PORT:8000
    //         },
    //         ignore:['./node_modules/**']

    //     })
    //     .on('restart',function(){
    //             console.log('restarting');
    //     });
    //  });

     gulp.task('default',function(){
         
        nodmon({
            script:'thid.js',
            ext:'js',
            env:{

                PORT:5000
            },
            ignore:['./node_modules/**']

        })
        .on('restart',function(){
                console.log('restarting');
        });
     });