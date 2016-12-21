module.exports=function(grunt){

	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				opation:{
					livereload:true
				}
			},
				
			js:{
				files:['public.js/**','models/**/*.js','schemas/**/*.js'],
				tasks:['jshint'],
				options:{
					livereload:true
				}
			}	
		},
        
        // jshint:{
        // 	options:{
        // 		jshintrc:'.jshintrc',
        // 		ignores:['public/libs/**/*.js']
        // 	},
        // 	all:['public/js/*.js','test/**/*.js','app/**/*.js']
        // }, 

        // uglify:{
        // 	development:{
        // 		files:{
        // 			'public/build/admin.min.js':'public/js/admin.js',
        // 			'public/build/detail.min.js':['public/js/detail.js']
        // 		}

        // 	}
        // },

		// nodemon: {
		//     dev: {
		//         script: 'server.js',
		//         options: {
		//             file: 'server.js',
		//             args: [],
		//             ignoredFiles: ['public/**'],
		//             watchedExtensions: ['js'],
		//             nodeArgs: ['--debug'],
		//             delayTime: 1,
		//             env: {
		//                 PORT: 3000
		//             },
		//             cwd: __dirname
		//         }
		//     }
		// }
		//  nodemon: {
  //           dev: {
  //               options: {
  //                   file: 'server.js',
  //                   args: [],
  //                   ignoredFiles: ['public/**'],
  //                   watchedExtensions: ['js'],
  //                   nodeArgs: ['--debug'],
  //                   delayTime: 1,
  //                   env: {
  //                       PORT: 3000
  //                   },
  //                   cwd: __dirname
  //               }
  //           }
  //       },

		nodemon:{
			dev:{
				script:'app.js',
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000,
					},
					cwd:__dirname
				},

			},
		},

		mochaTest:{
			options:{
				reporter:'spec'
			},
			src:['test/**/*.js']
		},

		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		},

	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.option('force',true);

	grunt.registerTask('default',['concurrent']);
	grunt.registerTask('test',['mochaTest']);







}