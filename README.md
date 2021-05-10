<p align="center">
  <img src="https://i.ibb.co/2dXkNWw/starter-pack.png"/>
</p>

<strong><a href="https://webpack.js.org/" target="_blank">webpack</a> powered boilerplate aiming to get you up and running with core web technologies in no time.
</strong>

---
 
**Why Starter Pack?**

✔️ **I want a simple local server to process my HTML, CSS and JavaScript files and not have to worry about IDE/code editor plugin configuration.**

_Just type `npm start` into your console once you've installed all the dependencies and all the changes in your code will update automatically in the browser._

✔️ **I want <a href="https://sass-lang.com/" target="_blank">`Sass`</a> and <a href="https://tailwindcss.com/" target="_blank">`tailwindcss`</a> support out of the box.**

_Industry standard and a new kid on the block. Mix and match, either/or or don't use them at all._

✔️ **I want to generate production-ready assets once I'm done with the changes.**

_Type `npm run build` into your console once you've installed all the dependencies and you're ready to host your web app!_

✔️ **I want to be able to edit project config files and get help if I'm stuck.**

_Even though <a href="https://webpack.js.org/" target="_blank">`webpack`</a> has somewhat steeper learning curve than comparable technologies, there are more than plenty of resources online to help you out if you hit a roadblock._

**Ideal for:**

👍️ Creating small web apps: one-pagers, portfolios, blogs, doc pages etc.

👍️ Learning and experimenting.

👍️ Starting small:

If the words __*BEM, 7.1, partials and modules*__ don't ring a bell, start with one **1 HTML**, **1 CSS** and **1 JS** file and slowly modularize your project as it grows bigger.

---

**Features**
- Development server with parallel <a href="https://tailwindcss.com/" target="_blank"><img src="https://camo.githubusercontent.com/5abbe842086f633099e0ed4bf00bd840fbc5d149/68747470733a2f2f63646e2e737667706f726e2e636f6d2f6c6f676f732f7461696c77696e646373732e737667" height="18"></a> and <a href="https://sass-lang.com/" target="_blank"><img src="https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" height="25"></a> compilation, prefixing, minification and optimization
- Unused CSS classes removal with <a href="https://www.purgecss.com/" target="_blank">`PurgeCSS`</a>
- JavaScript transpiling, polyfilling, bundling, optimization and minification
- Asset optimization
- Cache busting
- PostCSS plugin support

---

**Getting Started**

1. Clone the repository

```bash
git clone https://github.com/igor-26/starter-pack.git
 ```
 
2. Navigate to project root

```bash
cd starter-pack
 ```
3. Reinitialize `git` repository (skip if you want to create a pull request)
   
```git
rm -rf .git && git init
 ```

4. Install dependencies from `package.json`

```bash
npm install
 ```
 
**That's it!** &#x1F64C; 

---

**Up and Running**

You are now ready to spin up a local development server and generate production assets.


**1.** Run the development server &#x2699;

```bash
npm start
 ```
 
**2.** Generate production-ready files &#x1F680;

```bash
npm run build
 ```


## Development server `webpack.dev.js`

**Features**
- Automatic recompilation and page reloading on file changes
- Source maps

- <a href="https://tailwindcss.com/" target="_blank"><img src="https://camo.githubusercontent.com/5abbe842086f633099e0ed4bf00bd840fbc5d149/68747470733a2f2f63646e2e737667706f726e2e636f6d2f6c6f676f732f7461696c77696e646373732e737667" height="15"></a> / **CSS** processing
  
    **Entry point:** `main.css`

  At build time, Tailwind will generate classes based on supplied `@tailwind` directives in `main.css` file located at the project 	root. It will also search for `tailwind.config.js` where you can define your customizations.
    
    To learn more about customizing Tailwind, refer to the <a href="https://tailwindcss.com/docs/configuration/" target="_blank">official documentation</a>.
    
    If you want to add some custom CSS quickly, simply put it after all Tailwind directives in the `main.css` file.
   
    ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
    
    .custom-css {
      border: 1px solid red;
    }
   ```
  
    > **Note**: If you choose not to use any of the Tailwind's classes, no further action is needed. All unused CSS classes will be removed in the production build.
    
  
- <a href="https://tailwindcss.com/" target="_blank"><img src="https://sass-lang.com/assets/img/styleguide/color-1c4aab2b.png" height="25"></a>  processing
  
    **Entry point:** `main.scss`
  
    Where this approach especially excels is when working with transitions, animations, CSS grid and other CSS features that can be configured in a more intuitive way in Sass. 

  You can treat them as two independent entities or mix and match depending on your personal preference or project setup.

  **Example:**

  _Extract Tailwind classes into BEM-like components for reusability and easier maintenance_

  ``` css
  .card {
    @apply rounded-lg bg-backgroundColor-100 shadow-elevate overflow-hidden;

    &__title {
      @apply block text-3xl pb-6 font-display font-bold text-fontColor-300;
    }

    &__description {
      @apply pb-8 text-left text-fontColor-100;
    }
  }
  ```

## Build process tasks `webpack.prod.js`

**HTML**

**Output:**`dist/`
- Remove comments and collapse whitespace
- Copy all `*.html` files from `src/` to `dist/`

---

**Stylesheets (CSS/SCSS/SASS)**

**Output:**`dist/main-[contentHash].css`

_After being processed, all stylesheets are merged into a single CSS file._

- Generate Tailwind classes based on `main.css` and `tailwind.config.js`.
- Compile Sass into CSS
- Analyze HTML files against stylesheets with <a href="https://www.purgecss.com/" target="_blank">`PurgeCSS`</a> and remove unused classes
- Add vendor prefixes
- Optimize and minimize
- Extract to main-[contentHash].css
- Link the stylesheet to all `*.html`files

**PostCSS plugin chain**
    
   ```javascript
  plugins: [
    require('tailwindcss'),
    purgecss({
      content: ['./src/*.html'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            //exclude all classes that are being added dynamically with JavaScript
            whitelist: ['tab-underline', 'rotate-180', 'text-gray-900']
    }),
        require('autoprefixer'),
        require('cssnano')({
      preset: 'default'
    })
  ]
```
---

**JavaScript**

**Output:**`dist/bundle-[contentHash].js`

_After being processed, all scripts are bundled into a single JS file._

- Transpile and polyfill through [**`Babel`**](https://babeljs.io/)
- Optimize and minimize
- Bundle into bundle-[contentHash].js
- Link the script to all `*.html` files

---

**Assets**

**Output:**`dist/assets/`

All assets are processed with <a href="https://github.com/tcoopman/image-webpack-loader" target="_blank">`image-webpack-loader`</a> which comes bundled with optimizers for JPEG, PNG, SVG and GIF images.

**Settings(default):**
```js
loader: 'image-webpack-loader',
options: {
  mozjpeg: {
    progressive: true,
    quality: 65
  },
  // optipng.enabled: false will disable optipng
  optipng: {
    enabled: false,
  },
  pngquant: {
    quality: '65-90',
    speed: 4
  },
  gifsicle: {
    interlaced: false,
  },
  // the webp option will enable WEBP
  webp: {
    quality: 75
  }
}
```
## To-dos

- [x] Incorporate <a href="https://www.purgecss.com/" target="_blank">`PurgeCSS`</a> into the workflow
- [ ] Review both `dev` and `prod` configuration
- [ ] Improve documentation
