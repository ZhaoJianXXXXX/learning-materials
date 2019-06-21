import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import reducers from './reducers'

// 创建store
const store = createStore(todoApp, reducers)

// 传递store作为props给Provider组件；
// Provider将使用context方式向下传递store
// App组件是我们的应用顶层组件
render(
	<Provider store={store}>
		<App/>
	</Provider>, document.getElementById('app-node')
)
