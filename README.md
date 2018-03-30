## redux尝试

简单用了一下antd, redux, react-router4 做了一个todolist

## 一些注意点

Provider容器组件包裹App，store注入

store利用createStore生成，利用中间件applyMiddleware引入redux-thunk使得能够使用为函数的action处理异步操作

store依据reducer生成，reducer可按模块划分，最后用combineReducer组合

组件里，用connect方法连接store, 有两个重要的参数, mapStateToProps, mapDispatchToProps。前者引入需要的state, 后者引入需要的action

action是一个函数，表示一个动作，它返回一个包含type的对象，用了thunk后，可以返回一个函数

reducer也是一个函数，表示一个计算，它依据当前触发的action的type来决定如何计算state，最后返回一个新的state

大致流程: 组件connect到action和state => 触发action => 触发reducer => 更新state => 视图改变

## 一个问题

redux怎么依据action的type来决定调用哪个reducer  （答案就是遍历。。）

## vuex对比

vuex大致流程: 组件通过mapState,mapActions引入state和action => 触发action => 触发mutations => 更新state => 视图改变

感觉差不多，不过vuex毕竟是官方的，和vue结合的比较好，异步操作放到action里就行

## 关于如何减少Reducer模板代码

最初始的代码

```javascript
const initState = {
  todos: [],
  filter: 'SHOW_ALL'
}

function reducer(state = initState, action) {
  switch(action.type) {
    case 'ADD_TODO': {
      return {
        ...state,
        todos: state.todos.slice().push({ text: action.text })
      }
    },
    case 'SET_VISIBLE': {
      return {
        ...state,
        filter: action.filter
      }
    },
    default: return state
  }
}
```

首先，我们可以把每个case的handler封装成不同的函数

```javascript
...
const addTodo(state, action) {
  return {
    ...state,
    todos: state.todos.slice().push({ text: action.text })
  }
}

const setFilter(state, action) {
  return {
    ...state,
    filter: action.filter
  }
}

function reducer(state, action) {
  switch(action.type) {
    case 'ADD_TODO': return addTodo(state, action),
    case 'SET_FILTER': return setFilter(state, action),
    default: return state
  }
}
```

接下来，我们可以按功能拆分case，思路是什么呢？就是让不同的reducer处理各自的state，然后在不同的reducer里判断各自的case，其实就是把外面的判断拆到各个模块里了

```javascript
  const addTodo(state, action) {
    return {
      ...state,
      todos: state.todos.slice().push({ text: action.text })
    }
  }

  const setFilter(state, action) {
    return {
      ...state,
      filter: action.filter
    }
  }

  function todosReducer(state, action) {
    switch (action.type) {
      case 'ADD_TODO': return addTodo(state, action);
      default: return state
    }
  }

  function filterReducer(state, action) {
    switch (action.type) {
      case 'SET_FILTER': return setFilter(state, action);
      default: return state
    }
  }

  function reducer(state, action) {
    return {
      todos: todosReducer(state.todos, action),
      filter: filterReducer(state, filter, action),
    }
  }
```

接下来，如何去掉switch case呢？我们可以写一个函数createReducer，这个函数有什么用？本质上，它也是返回一个reducer函数，这个函数会根据传入的type来调用相应的计算函数。其实就是把switch case变为用对象的key来选择对应计算函数

```javascript
  const addTodo(state, action) {
    return {
      ...state,
      todos: state.todos.slice().push({ text: action.text })
    }
  }

  const setFilter(state, action) {
    return {
      ...state,
      filter: action.filter
    }
  }

  function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        else return state
      }
    }
  }

  const todosReducer = createReducer([], {
    'ADD_TODO': addTodo
  })

  const filterReducer = createReducer('SHOW_ALL', {
    'SET_VISIBLE': setFilter
  })

  function reducer(state, action) {
    return {
      todos: todosReducer(state.todos, action),
      filter: filterReducer(state.filter, action)
    }
  }
```

现在利用combineReducer

```javascript
...
import { combineReducer } from 'redux'

const reducer = combineReducer({
  todos: todosReducer,
  filter: filterReducer,
})
```

想象一下，combineReducer可能干了什么？它最后应该返回一个Reducer函数, 这个函数应该返回一个大的State对象，对象的每个value应该计算后的值。

来个简易版的，注意reducer会有两个默认参数state, action，这个应该是createStore的时候传的

```
/*
 * @params reducers [Object]
 */
function combineReducer (reducers) {
  return function (state, action) {
    const nextState = {}

    for (let key in reducers) {
      nextState[key] = reducers[key](state[key], action)
    }

    // 返回一个新state
    return nextState;
  }
}
```

注意，reducer本质上就是一个计算state的函数，最后返回state。前面用switch case的意义就在于能根据不同的type来进行计算。而此时去掉switch case之后，就必须每个reducer都调用一次，因为框架不知道一个action会有多少state会改动。最后返回一个大的state。这也是combineReducers干的事。所以从性能上说，可能会略差，但是可维护性大大提升

最近看一些react项目的时候，很多都是函数包函数，比如redux里，为了减少样板代码，写了很多生成函数。看的我头疼，首先不知道这个函数目的是什么，二是不知道它最后会变成什么东西。所以从头梳理一下来龙去脉可能会清晰一点

总之，记住两点

1. reducer本质上就是一个计算函数，最后返回state，(state, action) => state
2. 代码怎么组织，比如如何根据type触发对应函数，用switch还是key-value，都可以，看个人而定
