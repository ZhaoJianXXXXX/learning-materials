import React from 'react';
import { withContext } from './context';
import { runEffects, cleanupEffects } from './hooks/effect';

const withHooks = (renderFunc) => (
	class extends React.component{
		constructor(props){
			super(props);
			this.__hooks__ = {
				setters: {},
				effects: {},
				layoutEffects: {},
				memos: {}
			}
			this.render = withContext(this, () => renderFunc(this.props))
		}

		componentWillMount(){
			runEffects(this.__hooks__.layoutEffects);
		}

		componentDidMount(){
			runEffects(this.__hooks__.effects);
		}

		componentWillUpdate(){
			runEffects(this.__hooks__.layoutEffects);
		}

		componentDidUpdate(){
			runEffects(this.__hooks__.effects);
		}

		componentWillUnmount(){
			cleanupEffects(this.__hooks__.layoutEffects)
			cleanupEffects(this.__hooks__.effects)
		}
	}
)

export { withHooks }
