# Dauwuti - Worköholics utils package

Dawuti is a package with different utils implemented by Worköholics development team. Here you can find individual utilities to resolve common funcionalities for different languages or technologies (Sass, JS, TS...).

[[_TOC_]]

## Installation

Dawuti is a NPM package hosted on the NPM public registry (https://www.npmjs.com/). You can install de package executing the following command:

```shell
npm install -D dawuti
```

## Sass

### Configuration and Usage

To configure Sass utils within Dawuti you can create a `dawuti.scss` or `dawuti.config.scss` file into your project. 

If you don't need to override the default variables skip this step and use directly the package from node_modules.

```scss
@use 'dawuti/index.scss' as dawuti;
```

If you need to change the default value of variables include override declarations in the `dawuti.scss` or `dawuti.config.scss` file of your project and then use it as the entrypoint.

```scss
// Override variables in dawuti.scss or dawuti.config.scss
@forward 'dawuti' with (
  $s: 8px,
  $breakpoint-xs: 470px
);
```

```scss
// Use dawuti from dawuti.scss or dawuti.config.scss in your scss main file. (For example styles.scss)
@use 'dawuti' as dawuti;
```

You can override the following sass variables:

```scssorig
$breakpoint-xs: 576px !default;
$breakpoint-sm: 768px !default;
$breakpoint-md: 992px !default;
$breakpoint-lg: 1200px !default;
$breakpoint-xl: 1600px !default;
$breakpoint-xxl: 2400px !default;

$s: 5px !default;
$gutter: 15px !default;
$cols: 12 !default;

$wrapper-centered-xs: 540px !default;
$wrapper-centered-sm: 720px !default;
$wrapper-centered-md: 960px !default;
$wrapper-centered-lg: 1140px !default;
$wrapper-centered-xl: 1540px !default;
$wrapper-centered-xxl: 2340px !default;
```

You can also override the variables changing the value of his correspondent CSS variable on the `:root` of your project.

For example, if you want to override the column quantity of the grid (`$cols`) to 6, you can do:

```scss
:root {
  --cols: 6
}
```

### Utilities

Sass utils are implemented using mixins or funtions. Mixins can be used individually to optimize the compiled css bundle of the project, so **only include the mixins you need within the project**.

#### Accessibility

Utilities to resolve accessibility features.

##### Accessibility all

Mixin to include all accessibility features of Dawuti.

**Usage**

```scss
@include dawuti.accessibility-all();
```

##### Accessibility all

Mixin that include the utility class `.sr-only`. This class hide elements of the DOM but mantains the visibility for the screen reader.

**Usage**

```scss
@include dawuti.sr-only();
```

#### Animations

**Usage**

In order to use an animation in your project. 

1. Declare the animation in a global/animations stylesheet:

    ```_animations.scss```
    ```scss
    @include dawuti.animate-use-opacity();
    ```

2. Animate a specific element:

    ```_component1.scss```
    ```scss
    .component1{
      @include dawuti.animate-opacity(1s 3s ease-in forwards, 0.2, 0.5);
    }
    ```

* Note that we don't pass the "animation-name" as it will be added later by the mixin.

**Exceptions**

The following mixins **don't need to be declared** before usage:

```dawuti.animate-transforms```

Just use it, passing a different ref each time. This will create a different keyframe for each ref. Example:

```scss
      .el1{
        @include dawuti.animate-transforms("1", "0", "100px", "0deg", "360deg", "0", 1 );
      }
```

Here we pass ```1``` as ref, which will generate a keyframe called ```transforms1```. Once this is done you can reuse the generated animation in any other element: Example:


```scss
      .el2{ //reuse the animation used by .el
        animation: transforms1 1s 3s ease-in forwards;
      }
```

```dawuti.animate-scale-elastic```

  ```scss
      .el1{
        @include dawuti.animate-scale-elastic("1", 1s 3s ease-in backwards, 1, 1.25, 1, 0%, 80%, 100%);
      }
  ```   

```dawuti.animate-delays```

  ```scss
   .delays {
      > div {
        @include dawuti.animate-opacity(1s 3s ease-in forwards, 0, 1); //use any animation
        @include dawuti.animate-delays(1, 6, 0.2s); //specify delay between elements 
      }
    }
  ```


Here the list of available animations:

```scss
//animation declaration
@include dawuti.animate-use-opacity(); 
@include dawuti.animate-use-scale(); 
@include dawuti.animate-use-translate();
@include dawuti.animate-use-rotate();
@include dawuti.animate-use-skew();
@include dawuti.animate-use-transforms();
@include dawuti.animate-use-dash(); //add (pathLength="1") to your <path> element
@include dawuti.animate-use-filter();
//animation usage
@include dawuti.animate-opacity(<animation>, $start, $end); //numbers
@include dawuti.animate-scale(<animation>, $start, $end); //numbers
@include dawuti.animate-translate(<animation>, $start-x, $start-y, $end-x, $end-y); //px, vw, vh...
@include dawuti.animate-rotate(<animation>, $start, $end);
@include dawuti.animate-skew(<animation>, $start-x, $start-y, $end-x, $end-y); //deg
@include dawuti.animate-dash();
@include dawuti.filter(<animation>, $start, $end); //numbers
@include dawuti.animate-transforms($ref: "1", $translate-start-x:0, $translate-end-x: 0, $rotate-start: 0, $rotate-end: 0, $scale-start:0, $scale-end:0 );
@include dawuti.animate-scale-elastic($ref: "1", <animation>, $start, $middle, $end, $p1: 0%, $p2: 80%, $p3: 100%)
@include dawuti.animate-delays(1, 6, 0.2s);
```

You can check and try the animations at ```animations.html```

#### Breakpoints

This mixin include css variables for the different breakpoints of a project. Remember that these variables can be overriden as is explained in 'Configuration and Usage' section.

```scss
@include dawuti.breakpoints();
```

#### Helpers

##### Display helpers

Use this mixin to create helpers to manage the visibility of elements between breakpoints.

```scss
@include dawuti.display-helpers();
```

Including the mixin, you can use the folowing classes to show or hide DOM elements:
- `.hidden-xs` : Hide element 0 < vw < SM
- `.hidden-sm` : Hide element SM < vw < MD
- `.hidden-md` : Hide element MD < vw < LG
- `.hidden-lg` : Hide element LG < vw < XL
- `.hidden-xl` : Hide element XL < vw < XXL
- `.hidden-xxl` : Hide element XXL < vw
- `.hidden-sm-up` : Hide element vw > SM 
- `.hidden-md-up` : Hide element vw > MD
- `.hidden-lg-up` : Hide element vw > LG
- `.hidden-xl-up` : Hide element vw > XL
- `.hidden-xxl-up` : Hide element vw > XXL

#### Media queries

##### MQ XS

Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than XS breakpoint:

```scss
@include dawuti.mq-xs($down /* true or false */) {
  // Your scss rules
}
```

##### MQ SM

Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than SM breakpoint:

```scss
@include dawuti.mq-sm($down /* true or false */){
  // Your scss rules
}
```

##### MQ MD 

Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than MD breakpoint:


```scss
@include dawuti.mq-md($down /* true or false */){
  // Your scss rules
}
```

##### MQ LG

Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than LG breakpoint:

```scss
@include dawuti.mq-lg($down /* true or false */){
  // Your scss rules
}
```

##### MQ XL 

Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than XL breakpoint:

```scss
@include dawuti.mq-xl($down /* true or false */){
  // Your scss rules
}
```

##### MQ XXL


Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than XXL breakpoint:

```scss
@include dawuti.mq-xxl($down /* true or false */){
  // Your scss rules
}
```

##### MQ XXL


Create a media query for include rules to viewports wider or narrower (depending on the boolean parameter `$down`) than the width passed by the parameter `$width`:

```scss
@include dawuti.mq-xxl($width, /*Width of the viewport*/ $down /* true or false */){
  // Your scss rules
}
```

#### Reset

Mixins to manage rules to reset the defalt styles of the different browsers.

##### Reset all

This util includes all mixins related with the reset of the browser default styles.

```scss
@include dawuti.reset-all();
```

##### Reset height

Adds 100% of height to `body` and `html` elements.

```scss
@include dawuti.reset-height();
```

##### Reset line height

Adds default line height to all elements of the site with the * selector.

```scss
@include dawuti.reset-line-height();
```

##### Reset form controls

Enables the inheritance of the font-family of form controls within a `form`.

```scss
@include dawuti.reset-form-controls();
```
#### Reset box sizing

Enables `border-box` box sizing strategy to all elements of the site.

```scss
@include dawuti.reset-box-sizing();
```

#### Reset margin

Removes al margings by default to all elements of the site.

```scss
@include dawuti.reset-margin();
```

#### Reset media

Adds rules by default to media elements.

```scss
@include dawuti.reset-media();
```

#### Reset font smoothing

Adds rules to avoid the blur of the tipography in some browsers.

```scss
@include dawuti.reset-font-smoothing();
```

#### Reset Nav List

Removes the bullets and the padding of a list inside a nav.

```scss
@include dawuti.reset-nav-list();
```

### Space

Mixins to manage the spacing of the elements.

#### Space vars

Adds space css variables to the `:root` of your site. Remember that these variables can be overriden as is explained in 'Configuration and Usage' section.

```scss
@include dawuti.space-vars();
```

These are the available css variables:
- `--s`
- `--gutter`
- `--safe-area`
- `--cols`

#### Size by cols

Function to calculate the size by given size and total in columns.

```scss
// $cols: Width in cols
// $total: Total of columns, optional parameter (by default 12)

.selector{
  width: dawuti.size-by-cols($cols, $total);
}
```

### Wrappers

Utils to manage the main wrappers of the site. Remember that breakpoint and wrapper variables can be overriden as is explained in 'Configuration and Usage' section.

#### Wrappers all

Enables `.wrapper-centered` and `.wrapper-fluid`. This usage is extrange but Maybe you need both wrappers in the same site. Normaly you only need one of them.

```scss
@include wrappers-all();
```

#### Wrapper fluid

Enables `.wrapper-fluid` in your site to align the content properly depending on the size of the viewport, the breakpoints and the safe area.

```scss
@include wrappers-fluid();
```

#### Wrapper centered

Enables `.wrapper-centered` in your site to center and align the content properly depending on the size of the viewport and the breakpoints.

```scss
@include wrappers-centered();
```























