# nodejs use commonjs, every file is a module
 - to export: module.export
 - to import: require
##### JavaScript is single-threaded,  modern kernels are multi-threaded (https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

##### Node.js also provides setImmediate(), which is equivalent to using setTimeout(() => {}, 0), mostly used to work with the Node.js Event Loop.

#### Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick.