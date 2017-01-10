module.exports = function configureLibsass(grunt) {
  grunt.config.merge({
    sass: {
      options: {
        includePaths: ['scss'],
        precision: 6,
        sourceComments: false,
        sourceMap: true,
        outputStyle: 'expanded'
      },
      core: {
        files: {
          // 'dist/css/<%= pkg.name %>.css': 'scss/<%= pkg.name %>.scss'
        }
      },
      extras: {
        files: {
          'dist/css/<%= pkg.name %>-grid.css': 'scss/<%= pkg.name %>-grid.scss',
          'dist/css/<%= pkg.name %>-reboot.css': 'scss/<%= pkg.name %>-reboot.scss',
          'dist/css/<%= pkg.name %>-flex.css': 'scss/<%= pkg.name %>-flex.scss'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
};
