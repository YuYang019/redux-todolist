## redux踩坑

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

redux怎么依据action的type来决定调用哪个reducer

## vuex对比

vuex大致流程: 组件通过mapState,mapActions引入state和action => 触发action => 触发mutations => 更新state => 视图改变

感觉差不多，不过vuex毕竟是官方的，和vue结合的比较好，异步操作放到action里就行
