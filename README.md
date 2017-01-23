# Getting started

I was tired of installing underscore_s and modifying it heck out of it, so this I created a quick boilerplate theme with things set up the way I like it. If you dig it, fork away and customize it to your heart's content. 

***I am using gulp to do the following:***
- Complile Sass
- Minify & rename CSS
- Lint JS files
- Compress JS 

The theme itself isn't doing anything fancy. It has all the files that I need and use regularly. 


## Install
After installing WordPress, using terminal, navigate to your themes directory. 

Clone this git repo by using the following command:

```
$ git clone https://github.com/coreybrown89/wp-theme-boilerplate-gulp.git
```

This will download the latest version of wp-theme-boilerplate. 

*You can also download this repo by clicking on the link above. Unzip this folder and add it to your themes directory in WordPress.* 

In the terminal run:
```
$ npm install
``` 

## Setup

***gulpfile.js***

Now that you are all set up, with dependencies installed, open up `gulpfile.js` and locate: 

``` javascript
const themeName = 'theme-name';
```

Change `theme-name` out with the slug of your new theme folder. 


***functions.php***

Head over to `functions.php`. Once there, you will want to find and replace all instances of `custom_theme`.

***style.css***

Next up, go to `style.css` in the root of the theme. In the comment at the top, reaname the `Theme Name`, `Author` and `Author URI` with your theme information. 

***screenshot.png***

To add a custom screenshot to your theme, replace the file screenshot.png with an image of your own. You must keep the filename the same for WordPress to recognize the image. Also, keep the image size `880x660` pixels.


## CSS, SASS, JS & Fonts

All of the css, sass, js and fonts are located in the `/public` folder in the root of the theme.

When editing your theme, use the `gulp` command to compile & minify sass and lint and uglify javascript.

```
$ gulp
```

***When running gulp***

- All .scss files inside of the `/scss` will be compiled to css and minified and added to the /css folder on save.

- The app.js file will be linted and compressed on save. Check the terminal for errors. A warning sound will play if your js does not pass. 


Have fun and happy coding!