import React from 'react'

// pass on the props as you get them using the spread operator

// const withClass2 = (WrappedComponent, className) => {
// 	return (props) => (
// 		<div className={className}>
// 			<WrappedComponent {...props}/>
// 		</div>
// 	)
// }

// if you need access to lifecycle hooks, then use a stateful component


// const withClass2 = (WrappedComponent, className) => {
// 	// returns nameless class
// 	return class extends React.Component {
// 		// can use props with this.props
// 		render () {
// 			return (
// 				<div className={className}>
// 					<WrappedComponent {...this.props}/>
// 				</div>
// 			)
// 		}
// 	}
// }

const withClass2 = (WrappedComponent, className) => {
	// returns nameless class
	const WithClass2 = class extends React.Component {
		// can use props with this.props
		render () {
			return (
				<div className={className}>
					<WrappedComponent ref={this.props.forwardedRef} {...this.props}/>
				</div>
			)
		}
	}

	return React.forwardRef((props, ref) => {
		return <WithClass2 {...props} forwardedRef={ref} />
	})
}

export default withClass2