# Functionware

Middleware for functions.

I've had previous attempts at creating middleware or chain of command implementations in the past. The defining characteristic of this one is that no special function signature is required: it composes functions that look like the entry point to the middleware looks. Whereas, for example, Second Class Function passes a **continuation** that *holds* the original arguments, Functionware preverses the method signature and instead passes in continuation data, Functionware first [invokes a specific context acceptor](https://github.com/rektide/functionware/blob/4cd2003a18c12d0cc86f8b8357f3c3ee1f724071/functionware.js#L59) before [calling](https://github.com/rektide/functionware/blob/4cd2003a18c12d0cc86f8b8357f3c3ee1f724071/functionware.js#L63).
