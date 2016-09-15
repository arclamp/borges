# borges
Experiment in distributing webpack loaders with a library

## The Problem

Webpack is very useful as a way to bundle files for single-page web
applications, while providing node-style `require()` and `import` statements
with specialized semantics via Webpack loaders. Along with code-splitting
capabilities, this allows a client to download and execute slices of the final
bundle as needed, providing a nice balance between download times for the client
and lessened burden of code-structuring for the developer.

However, Webpack is not as good at bundling libraries for use in a different
project. The problem comes mainly because Webpack creates a large bundle, which
is not a problem for a single-page application, but may be for a library that
will in turn be *included* in a single-page application.

# The Easy Solution (Which Doesn't Work)

The solution of simply distributing the library source files for selective
inclusion via Webpack in the client project doesn't quite work because the
library developer may want to use Webpack to provide different semantics for
`require()` and `import` statements (taking advantages of one of Webpack's major
value-add features).

# The Harder Solution (Which Might Work)

The **experimental solution** in this repository is to include a file,
[`webpack-module.js`](https://github.com/ronichoudhury-work/borges/blob/master/webpack-module.js),
in the distribution which takes a Webpack configuration object and returns a new
one with added loaders (and possibly other configs) to selectively apply the
library writer's desired semantics to just the distribution files as they reside
in the client project's *node_modules* directory.

The loader declarations look almost identical to what would appear in an
ordinary Webpack configuration, but the `test` property references the
*node_modules* directory specifically, to avoid "leaking" the loader rules onto
other files in a client project. In other words, `webpack-module.js` provides a
sort of encapsulation of the library files that can now move with the library.

## How It Works

This repository provides a dummy library with one function written in ES6, and
an HTML template function written in Jade. Any client project would need to use
Babel to translate the function to ES5, and Jade to compile the template to a
function. These capabilities are in fact crucial for such a library to function
as intended.

Webpack loaders for Babel and Jade are listed as production dependencies of the
project, meaning that any client project that install *this* project as a
dependency will gain those loaders as well.

Finally, the `webpack-module.js` file provides, essentially, instructions to the
client project on how to invoke those loaders on the appropriate files (meaning,
the files of the appropriate type *inside the node_modules/borges directory*).
The result is that the client project can import individual files from the
library and its own Webpack process will correctly interpret the files as
intended.

# Questions and Possible Pitfalls

1. *What happens if the client project already uses the same loaders as the
   library?*

   This is generally speaking not a problem. If the client project lists a
   loader as a dependency, and the library does too, NPM is smart enough to
   download the dependency once and make use of it everywhere as needed.

2. *What if a loader is the same between client and library, except for its
   version number?*

   This is a harder question, but also more general, in the sense that it is
   already a problem for any dependency that lists its own production dependencies.
   Solutions to the problem are unsavory at best, along the lines of updating one
   or the other project so that it can use the same version of the disputed
   dependency.

   But whatever a (or the) general solution is to this problem will also solve it
   for purposes of this question.

3. *What if the client project doesn't use Webpack at all?*

   The library project can include a Webpack configuration of its own that
   builds a bundled library (i.e., following the same steps a single-page
   application project would, outputting a single bundle file containing all the
   library code) which can then be distributed along with the source files. Since
   Webpack conveniently gives the option of producing a UMD module, any client
   project that doesn't take advantage of Webpack and the library's loader
   distribution file can simply use the UMD module instead.

# Try It Out!

This experiment has a sister repository,
[Horace](https://github.com/ronichoudhury-work/horace), which models a Node
project making use of this library. Hop over there to learn how to download,
install, and test it.

If you have questions, suggestions, or bug fixes, please open an issue or pull
request!

# Why "Borges"?

Jorge Luis Borges wrote about [The Library of
Babel](https://en.wikipedia.org/wiki/The_Library_of_Babel), an unimaginably
large complex of hexagonal rooms consisting of every possible 410-page book
using a particular set of characters.

You might have some trouble using Webpack to bundle up this whole library for
use in a client project.

(There is a [digital version](https://libraryofbabel.info/) of the Library that
you can explore.)
