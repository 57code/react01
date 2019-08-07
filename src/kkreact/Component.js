import * as _ from './util'
import {
	renderComponent,
	clearPending,
	compareTwoVnodes,
	getChildContext,
	syncCache
} from './virtual-dom'

// 更新队列
export let updateQueue = {
	updaters: [],
	isPending: false,
	add(updater) {
		this.updaters.push(updater)
	},
	batchUpdate() {
		if (this.isPending) {
			return
		}
		this.isPending = true
		let { updaters } = this
		let updater
		while (updater = updaters.pop()) {
			updater.updateComponent()
		}
		this.isPending = false
	}
}


class Updater{
	constructor(instance){
		this.instance = instance
		this.pendingStates = [] // 待处理状态数组
		this.pendingCallbacks = []
		this.isPending = false
		this.nextProps = this.nextContext = null
		this.clearCallbacks = this.clearCallbacks.bind(this)
	}

	emitUpdate(nextProps, nextContext) {
		this.nextProps = nextProps
		this.nextContext = nextContext
		// receive nextProps!! should update immediately
		nextProps || !updateQueue.isPending
		? this.updateComponent()
		: updateQueue.add(this)
	}
	updateComponent() {
		let { instance, pendingStates, nextProps, nextContext } = this
		if (nextProps || pendingStates.length > 0) {
			nextProps = nextProps || instance.props
			nextContext = nextContext || instance.context
			this.nextProps = this.nextContext = null
			// getState 合并所有的state的数据，一次更新
			shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks)
		}
	}
	addState(nextState) {
		if (nextState) {
			// 存入pendingStates，为了待会批量处理
			this.pendingStates.push(nextState)
			if (!this.isPending) { // 如果没有在工作
				this.emitUpdate()
			}
		}
	}

	getState() {
		// 实例， 待更新状态
		let { instance, pendingStates } = this
		// 从组件实例中拿出现有state和props
		let { state, props } = instance
		if (pendingStates.length) {
			state = {...state}
			// setState({foo:'bla', bar:'lala'})
			// setState({foo:'dfdf', bar:'dfdfdf'})
			// setState((ns)=>({foo:ns.foo+'dfdf', bar:'dfdfdf'}))
			pendingStates.forEach(nextState => {
				// 如果是数组则做替换
				let isReplace = _.isArr(nextState)
				if (isReplace) {
					nextState = nextState[0]
				}
				// 如果传递的是函数
				if (_.isFn(nextState)) {
					nextState = nextState.call(instance, state, props)
				}
				// replace state
				if (isReplace) {
					state = {...nextState}
				} else {
					state = {...state, ...nextState}
				}
			})
			pendingStates.length = 0
		}
		return state
	}
	clearCallbacks() {
		let { pendingCallbacks, instance } = this
		if (pendingCallbacks.length > 0) {
			this.pendingCallbacks = []
			pendingCallbacks.forEach(callback => callback.call(instance))
		}
	}
	addCallback(callback) {
		if (_.isFn(callback)) {
			this.pendingCallbacks.push(callback)
		}
	}
}


export default class Component{
	static isReactComponent = {}

	constructor(props, context){
		// 创建一个更新器实例
		this.$updater = new Updater(this)
		this.$cache = { isMounted: false }
		this.props = props
		this.state = {}
		this.refs = {}
		this.context = context
	}
	forceUpdate(callback) {
		// 实际更新组件的函数
		let { $updater, $cache, props, state, context } = this
		if (!$cache.isMounted) {
			return
		}
		if ($updater.isPending) {
            $updater.addState(state)
			return;
		}
		let nextProps = $cache.props || props
		let nextState = $cache.state || state
		let nextContext = $cache.context || context
		let parentContext = $cache.parentContext
		let node = $cache.node // 上次执行dom
		let vnode = $cache.vnode // 上次执行vdom
		// 缓存
		$cache.props = $cache.state = $cache.context = null
		// 开始工作
		$updater.isPending = true
		if (this.componentWillUpdate) {
			this.componentWillUpdate(nextProps, nextState, nextContext)
		}
		this.state = nextState
		this.props = nextProps
		this.context = nextContext

		// 下面才是重点  对比vnode
		let newVnode = renderComponent(this) // 执行render函数获取新vdom
		// diff和patch发生在这里
		let newNode = compareTwoVnodes(vnode, newVnode, node, getChildContext(this, parentContext))
		// 比较新旧dom
		if (newNode !== node) {
			newNode.cache = newNode.cache || {}
			syncCache(newNode.cache, node.cache, newNode)
		}
		$cache.vnode = newVnode
		$cache.node = newNode
		// 清除pending 执行didmount生命周期
		clearPending()
		if (this.componentDidUpdate) {
			this.componentDidUpdate(props, state, context)
		}
		// setState里面指定的回调函数
		if (callback) {
			callback.call(this)
		}
		// 重置标识符
		$updater.isPending = false
		// 稳妥起见会在提交一次更新
		$updater.emitUpdate()
		// 更新
	}
	setState(nextState, callback) {
		// 添加异步队列  不是每次都更新
		this.$updater.addCallback(callback)
		this.$updater.addState(nextState)
	}


}


function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
	// 是否应该更新 判断shouldComponentUpdate生命周期
	let shouldComponentUpdate = true
	// 首先判断组件是否存在shouldComponentUpdate
	if (component.shouldComponentUpdate) {
		shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext)
	}
	if (shouldComponentUpdate === false) {
		component.props = nextProps
		component.state = nextState
		component.context = nextContext || {}
		return
	}
	let cache = component.$cache
	cache.props = nextProps
	cache.state = nextState
	cache.context = nextContext || {}
	component.forceUpdate(callback)
}
