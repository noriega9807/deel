# PART 2

1. What is the difference between Component and PureComponent? give an example where it might break my app.

    The component updates the component automatically. 
    Don't know where exactly it might break, but there might be side effects using useMemo
2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

    I think it might cause some memory leaks.
3. Describe 3 ways to pass information from a component to its PARENT.

    1. Through a function (e.g. parent component sends it's function to the child and the child calls the function with the data as a parameter)
    2. Through a hook (e.g. pass the setData hook to the child and the child sets it with the data needed)
    3. With a state management library like redux, recoiljs 
4. Give 2 ways to prevent components from re-rendering.

    1. with the use of useMemo
    2. with the use of useCallback
    3. using useRef 
5. What is a fragment and why do we need it? Give an example where it might break my app.

    it lets you group components instead of wrapping them in a div and create extra nodes.
    I think my app is safe in this case scenario, I use a fragment, but if we remove it it won't break since there is also the container. but if we remove the fragment and add a div below the container, it would break
6. Give 3 examples of the HOC pattern.

    1. When we use react router 
    2. To setup a lyout for our site
    3. In general, to have common data between our site 
7. what's the difference in handling exceptions in promises, callbacks and async...await.
    
    with promises we have a catch method where we can handle the exception, in async await we wrap it in a try catch to handle the error and in a callback we receive the error if there's any.
8. How many arguments does setState take and why is it async.

    2, one where we can just send the new state and another one where we have a callback and we receive the current state
9. List the steps needed to migrate a Class to Function Component.

    1. removing the class and changing it to an export const {name of component}
    2. changing the state to hooks and update bindings
    3. use useEffect where needed.
    4. return the dom
10. List a few ways styles can be used with components.

    we can use jss, sass, plain css, css modules. In some of these we can pass parameters to customize a component.
11. How to render an HTML string coming from the server.

    dangerouslySetInnerHTML
